from app.importers.jira_importer import JiraImporter

IMPORTER_REGISTRY: dict[str, type] = {
    "jira": JiraImporter,
}

__all__ = ["IMPORTER_REGISTRY", "JiraImporter"]
