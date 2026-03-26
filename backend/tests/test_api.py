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


def test_list_configs(client, sample_config):
    resp = client.get("/api/v1/configs")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert len(data) == 1
    assert data[0]["name"] == "Test Team"


def test_get_single_config(client, sample_config):
    resp = client.get(f"/api/v1/configs/{sample_config.id}")
    assert resp.status_code == 200
    assert resp.json()["data"]["name"] == "Test Team"


def test_get_config_not_found(client):
    resp = client.get("/api/v1/configs/nonexistent-id")
    assert resp.status_code == 404


def test_update_config(client, sample_config):
    resp = client.put(f"/api/v1/configs/{sample_config.id}", json={
        "name": "Updated Team",
        "source_type": "jira",
        "status_order": ["Backlog", "Done"],
        "cycle_time_start_status": "Backlog",
        "cycle_time_end_status": "Done",
    })
    assert resp.status_code == 200
    assert resp.json()["data"]["name"] == "Updated Team"


def test_delete_import(client, sample_config, sample_import_data):
    import_id = _do_import(client, sample_config, sample_import_data)
    resp = client.delete(f"/api/v1/imports/{import_id}")
    assert resp.status_code == 204


def test_delete_config_blocked_with_imports(client, sample_config, sample_import_data):
    _do_import(client, sample_config, sample_import_data)
    resp = client.delete(f"/api/v1/configs/{sample_config.id}")
    assert resp.status_code == 409


def test_get_import_statuses(client, sample_config, sample_import_data):
    import_id = _do_import(client, sample_config, sample_import_data)
    resp = client.get(f"/api/v1/imports/{import_id}/statuses")
    assert resp.status_code == 200
    statuses = resp.json()["data"]
    assert isinstance(statuses, list)
    assert len(statuses) > 0


def test_get_import_statuses_no_transitions(client, sample_config):
    data = {
        "source_type": "jira",
        "project_key": "TEST",
        "exported_at": "2026-01-01T00:00:00Z",
        "tickets": [{
            "external_id": "TEST-1",
            "title": "No transitions",
            "ticket_type": "story",
            "created_at": "2026-01-01T00:00:00Z",
            "transitions": [],
            "external_link": None,
            "metadata": {},
        }],
    }
    file_bytes = json.dumps(data).encode()
    resp = client.post(
        "/api/v1/imports",
        data={"config_id": sample_config.id},
        files={"file": ("test.json", io.BytesIO(file_bytes), "application/json")},
    )
    import_id = resp.json()["data"]["id"]
    resp = client.get(f"/api/v1/imports/{import_id}/statuses")
    assert resp.status_code == 200
    assert resp.json()["data"] == []


def test_get_cycle_times(client, sample_config, sample_import_data):
    import_id = _do_import(client, sample_config, sample_import_data)
    resp = client.get(f"/api/v1/metrics/{import_id}/cycle-times")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "tickets" in data
    assert all("cycle_time_days" in t for t in data["tickets"])


def test_get_lead_times(client, sample_config, sample_import_data):
    import_id = _do_import(client, sample_config, sample_import_data)
    resp = client.get(f"/api/v1/metrics/{import_id}/lead-times")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "values" in data
    assert isinstance(data["values"], list)
    assert all(isinstance(v, float) for v in data["values"])


def test_llm_status_always_returns_200(client):
    resp = client.get("/api/v1/llm/status")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "available" in data
    assert isinstance(data["available"], bool)
