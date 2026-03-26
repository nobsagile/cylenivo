import pytest

from app.importers.jira_importer import JiraImporter
from app.schemas.import_session import ImportFileSchema, TicketImportSchema, TransitionSchema


def load_fixture(sample_import_data) -> ImportFileSchema:
    return ImportFileSchema.model_validate(sample_import_data)


def test_jira_importer_creates_correct_ticket_count(sample_import_data):
    importer = JiraImporter()
    data = load_fixture(sample_import_data)
    tickets, transitions = importer.parse(data, "test-session-id")
    assert len(tickets) == 15


def test_jira_importer_parses_transitions_in_order(sample_import_data):
    importer = JiraImporter()
    data = load_fixture(sample_import_data)
    tickets, transitions = importer.parse(data, "test-session-id")
    first_ticket_transitions = [t for t in transitions if t.ticket_id == tickets[0].id]
    dates = [t.transitioned_at for t in first_ticket_transitions]
    assert dates == sorted(dates)


def test_jira_importer_handles_ticket_with_no_transitions(sample_import_data):
    importer = JiraImporter()
    sample_import_data["tickets"] = [
        {
            "external_id": "ROAD-99",
            "title": "Empty ticket",
            "ticket_type": "task",
            "created_at": "2026-01-01T09:00:00Z",
            "transitions": [],
        }
    ]
    data = ImportFileSchema.model_validate(sample_import_data)
    tickets, transitions = importer.parse(data, "test-session-id")
    assert len(tickets) == 1
    assert len(transitions) == 0


def test_jira_importer_rejects_missing_required_fields():
    importer = JiraImporter()
    bad_ticket = TicketImportSchema(
        external_id="",
        title="Bad ticket",
        ticket_type="task",
        created_at="2026-01-01T09:00:00Z",
        transitions=[],
    )
    data = ImportFileSchema(
        source_type="jira",
        project_key="TEST",
        exported_at="2026-01-01T09:00:00Z",
        tickets=[bad_ticket],
    )
    with pytest.raises(ValueError, match="external_id"):
        importer.parse(data, "test-session-id")


def test_jira_importer_sets_external_link(sample_import_data):
    importer = JiraImporter()
    data = load_fixture(sample_import_data)
    tickets, _ = importer.parse(data, "test-session-id")
    assert tickets[0].external_link == "https://test.atlassian.net/browse/ROAD-1"
