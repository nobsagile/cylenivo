from uuid import uuid4

from app.importers.base_importer import BaseImporter
from app.models.ticket import Ticket
from app.models.ticket_transition import TicketTransition
from app.schemas.import_session import ImportFileSchema, TicketImportSchema


class JiraImporter(BaseImporter):
    def parse(self, data: ImportFileSchema, import_session_id: str) -> tuple[list[Ticket], list[TicketTransition]]:
        tickets = []
        transitions = []

        for ticket_data in data.tickets:
            self._validate_ticket(ticket_data)
            ticket_id = str(uuid4())
            ticket = Ticket(
                id=ticket_id,
                import_id=import_session_id,
                external_id=ticket_data.external_id,
                title=ticket_data.title,
                ticket_type=ticket_data.ticket_type,
                created_at=ticket_data.created_at,
                external_link=ticket_data.external_link,
                extra_metadata=ticket_data.metadata,
            )
            tickets.append(ticket)

            sorted_transitions = sorted(
                ticket_data.transitions, key=lambda t: t.transitioned_at
            )
            for t in sorted_transitions:
                transitions.append(
                    TicketTransition(
                        ticket_id=ticket_id,
                        from_status=t.from_status,
                        to_status=t.to_status,
                        transitioned_at=t.transitioned_at,
                    )
                )

        return tickets, transitions

    def _validate_ticket(self, ticket: TicketImportSchema) -> None:
        if not ticket.external_id:
            raise ValueError("Ticket is missing required field: external_id")
