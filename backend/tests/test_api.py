import io
import json
import pathlib

import pytest


def test_create_config_success(client):
    resp = client.post("/api/v1/configs", json={
        "name": "My Team",
        "source_type": "jira",
        "base_url": "https://test.atlassian.net",
        "status_order": ["Backlog", "Development", "Done"],
        "cycle_time_start_status": "Development",
        "cycle_time_end_status": "Done",
    })
    assert resp.status_code == 201
    data = resp.json()["data"]
    assert "id" in data
    assert data["name"] == "My Team"


def test_create_config_missing_required_field(client):
    resp = client.post("/api/v1/configs", json={
        "name": "My Team",
        "source_type": "jira",
        "status_order": ["Backlog", "Done"],
        "cycle_time_start_status": "Backlog",
        # missing cycle_time_end_status
    })
    assert resp.status_code == 422


def test_import_file_success(client, sample_config, sample_import_data):
    file_bytes = json.dumps(sample_import_data).encode()
    resp = client.post(
        "/api/v1/imports",
        data={"config_id": sample_config.id},
        files={"file": ("test.json", io.BytesIO(file_bytes), "application/json")},
    )
    assert resp.status_code == 201
    data = resp.json()["data"]
    assert data["ticket_count"] == 15


def test_import_file_invalid_config_id(client, sample_import_data):
    file_bytes = json.dumps(sample_import_data).encode()
    resp = client.post(
        "/api/v1/imports",
        data={"config_id": "nonexistent-id"},
        files={"file": ("test.json", io.BytesIO(file_bytes), "application/json")},
    )
    assert resp.status_code == 404


def test_import_file_invalid_json(client, sample_config):
    resp = client.post(
        "/api/v1/imports",
        data={"config_id": sample_config.id},
        files={"file": ("test.json", io.BytesIO(b"not json at all"), "application/json")},
    )
    assert resp.status_code == 400


def _do_import(client, sample_config, sample_import_data) -> str:
    file_bytes = json.dumps(sample_import_data).encode()
    resp = client.post(
        "/api/v1/imports",
        data={"config_id": sample_config.id},
        files={"file": ("test.json", io.BytesIO(file_bytes), "application/json")},
    )
    assert resp.status_code == 201
    return resp.json()["data"]["id"]


def test_get_metrics_summary_returns_all_fields(client, sample_config, sample_import_data):
    import_id = _do_import(client, sample_config, sample_import_data)
    resp = client.get(f"/api/v1/metrics/{import_id}/summary")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "cycle_time" in data
    assert "lead_time" in data
    assert "time_in_status" in data
    assert "throughput_per_week" in data


def test_get_metrics_summary_returns_warning_for_small_sample(client, sample_config, sample_import_data):
    small_data = dict(sample_import_data)
    small_data["tickets"] = small_data["tickets"][:5]
    import_id = _do_import(client, sample_config, small_data)
    resp = client.get(f"/api/v1/metrics/{import_id}/summary")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert data["cycle_time"]["warning"] is not None


def test_get_tickets_paginated(client, sample_config, sample_import_data):
    import_id = _do_import(client, sample_config, sample_import_data)
    resp = client.get(f"/api/v1/tickets?import_id={import_id}&page=1&limit=10")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert len(data["tickets"]) == 10
    assert data["total"] == 15


def test_get_tickets_filter_by_type(client, sample_config, sample_import_data):
    import_id = _do_import(client, sample_config, sample_import_data)
    resp = client.get(f"/api/v1/tickets?import_id={import_id}&type=story")
    assert resp.status_code == 200
    data = resp.json()["data"]
    for ticket in data["tickets"]:
        assert ticket["ticket_type"] == "story"


def test_llm_status_always_returns_200(client):
    resp = client.get("/api/v1/llm/status")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "available" in data
    assert isinstance(data["available"], bool)
