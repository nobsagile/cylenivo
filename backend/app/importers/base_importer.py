from abc import ABC, abstractmethod

from app.schemas.import_session import ImportFileSchema


class BaseImporter(ABC):
    @abstractmethod
    def parse(self, data: ImportFileSchema, import_session_id: str) -> tuple:
        """
        Parse ImportFileSchema into (list[Ticket], list[TicketTransition]).
        """
