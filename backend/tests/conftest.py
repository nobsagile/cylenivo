import json
import pathlib

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db
from app.models.project_config import ProjectConfig


@pytest.fixture(scope="function")
def db_session():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    yield session
    session.close()
    Base.metadata.drop_all(engine)


@pytest.fixture(scope="function")
def client(db_session):
    app.dependency_overrides[get_db] = lambda: db_session
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture
def sample_import_data():
    path = pathlib.Path(__file__).parent / "fixtures" / "sample_jira_export.json"
    return json.loads(path.read_text())


@pytest.fixture
def sample_config(db_session):
    config = ProjectConfig(
        name="Test Team",
        source_type="jira",
        base_url="https://test.atlassian.net",
        status_order=[
            "Backlog",
            "Up Next",
            "Ready for Development",
            "Development",
            "Customer Feedback",
        ],
        cycle_time_start_status="Ready for Development",
        cycle_time_end_status="Customer Feedback",
        lead_time_start_status=None,
    )
    db_session.add(config)
    db_session.commit()
    return config
