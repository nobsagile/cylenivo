// AUTO-GENERATED — do not edit. Run: npx tsx server/scripts/generate-demo-fixtures.ts

export interface DemoTransition {
  from_status: string | null
  to_status: string
  transitioned_at: string
}

export interface DemoTicket {
  external_id: string
  title: string
  ticket_type: string
  created_at: string
  transitions: DemoTransition[]
  metadata?: { story_points: number }
}

export interface DemoFixture {
  source_type: string
  project_key: string
  exported_at: string
  tickets: DemoTicket[]
}

export const DEMO_IMPROVING: DemoFixture = {
  "source_type": "jira",
  "project_key": "ALPHA",
  "exported_at": "2026-03-28T11:28:31.989Z",
  "tickets": [
    {
      "external_id": "ALPHA-1",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-07-07T10:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T12:46:11.194Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-14T10:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-30T22:37:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-05T10:37:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-2",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-07-14T13:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-14T16:25:50.451Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-18T13:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-24T22:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-25T10:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-30T05:48:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-03T13:00:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-3",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-07-17T12:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-17T15:27:57.870Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-20T12:01:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-29T12:01:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-01T12:01:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-4",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-07-09T13:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-09T14:27:59.832Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-14T13:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-23T13:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-26T13:14:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-5",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-07-02T08:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-02T11:34:32.910Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-08T08:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-20T08:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-24T08:39:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-6",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-06-29T08:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-29T10:59:30.217Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-03T08:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-18T08:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-23T08:21:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-7",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-07-07T15:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T17:35:11.282Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-14T15:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T09:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-31T15:07:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-8",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-07-12T10:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-12T13:21:57.821Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-19T10:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-01T22:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-06T10:26:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-9",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-07-06T15:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-06T18:03:49.936Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-08T15:54:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T09:54:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-25T15:54:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-10",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-07-07T09:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T10:52:27.621Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-11T09:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T03:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-01T09:39:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-11",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-07-16T11:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-16T13:43:24.324Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-22T11:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-05T17:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-10T11:00:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-12",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-06-29T14:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-29T16:09:51.107Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-02T14:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-16T02:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-20T14:42:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-13",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-07-02T09:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-02T11:25:52.669Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-05T09:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-26T09:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-02T09:33:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-14",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-07-08T13:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-08T14:51:26.128Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-13T13:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-28T13:32:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-02T13:32:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-15",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-07-15T10:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-15T10:45:54.430Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-18T10:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-30T10:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-03T10:07:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-16",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-08-06T09:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-06T13:18:28.729Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-11T09:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-27T21:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-02T09:52:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-17",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-08-07T16:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-07T19:56:04.229Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T16:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-25T22:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-29T16:29:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-18",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-08-18T15:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-18T19:06:07.343Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-25T15:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-08T21:37:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-13T15:37:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-19",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-08-14T10:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-14T12:36:48.450Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-16T10:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-24T01:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-24T13:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-30T06:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-04T10:50:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-20",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-08-16T09:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-16T09:56:00.714Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-18T09:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-03T03:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-08T09:16:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-21",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-08-01T13:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-01T15:39:29.751Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-05T13:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T07:31:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-26T13:31:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-22",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-08-10T12:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-10T13:36:18.799Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T12:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-19T07:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-19T19:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-23T10:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-26T12:38:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-23",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-07-30T15:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-30T16:21:14.342Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-03T15:03:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-17T03:03:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-21T15:03:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-24",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-08-15T12:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-15T13:55:08.088Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-20T12:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-29T08:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-29T20:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-05T10:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-11T12:48:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-25",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-08-11T16:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-11T17:41:56.748Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-15T16:01:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-28T10:01:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-01T16:01:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-26",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-08-07T15:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-07T18:25:23.554Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-13T15:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-28T15:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-02T15:56:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-27",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-08-08T16:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-08T18:33:49.856Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T16:59:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-28T04:59:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-01T16:59:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-28",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-08-04T11:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-04T14:10:45.062Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-11T11:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-26T11:31:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-31T11:31:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-29",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-08-01T13:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-01T16:46:06.854Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-07T13:46:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T01:46:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-25T13:46:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-30",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-08-09T16:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-09T18:42:59.061Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-13T16:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-23T10:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-26T16:40:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-31",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-07-28T11:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-28T14:42:30.208Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-04T11:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-07T16:37:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-08T04:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-10T14:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-12T11:49:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-32",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-08-12T16:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-12T17:43:57.275Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-16T16:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-30T04:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-03T16:53:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-33",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-08-07T13:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-07T16:00:42.547Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-13T13:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-25T13:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-29T13:06:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-34",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-09-21T13:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-21T16:36:19.195Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-25T13:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-28T18:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-29T06:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-01T16:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-03T13:50:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-35",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-08-31T08:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-31T12:18:46.669Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-04T08:46:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-13T08:46:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-16T08:46:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-36",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-09-14T09:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-14T10:44:20.989Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-17T09:46:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-24T03:46:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T09:46:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-37",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-08-30T16:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-30T17:13:53.034Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-02T16:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-14T16:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-18T16:34:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-38",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-09-02T13:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-02T16:59:01.490Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-05T13:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-10T08:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-10T20:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-14T11:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-17T13:30:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-39",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-09-14T12:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-14T16:35:35.913Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-16T12:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-24T00:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T12:40:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-40",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-08-31T12:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-31T13:48:21.375Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-07T12:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-17T06:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-20T12:02:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-41",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-09-18T13:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-18T16:21:12.083Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T13:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-30T07:48:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-03T13:48:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-42",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-09-15T08:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-15T10:28:29.395Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-18T08:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-25T20:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-28T08:41:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-43",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-09-11T12:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-11T15:34:17.968Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-15T12:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-20T07:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T19:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-24T10:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-27T12:26:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-44",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-09-19T08:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T11:23:11.829Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-23T08:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-01T14:30:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-04T08:30:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-45",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-09-19T15:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T17:00:27.335Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-25T15:57:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-02T20:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-03T08:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T18:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-13T15:57:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-46",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-09-16T10:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-16T14:33:51.050Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T10:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-01T16:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-05T10:50:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-47",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-08-31T10:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-31T13:20:26.377Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-04T10:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-11T22:37:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-14T10:37:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-48",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-09-03T13:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-03T15:43:04.832Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-07T13:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-16T13:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-19T13:53:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-49",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-08-31T13:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-31T16:21:02.832Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-05T13:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-16T19:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-20T13:04:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-50",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-09-19T09:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T12:09:01.218Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-25T09:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-02T21:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-05T09:40:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-51",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-09-01T16:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-01T18:20:01.674Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-03T16:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-06T20:48:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-07T08:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-09T18:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-11T16:00:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-52",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-09-04T09:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-04T10:24:28.924Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-09T09:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-17T15:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-20T09:44:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-53",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-09-09T13:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-09T16:09:31.989Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-11T13:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-20T13:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-23T13:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-54",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-09-02T13:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-02T16:53:33.989Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-09T13:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-20T19:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-24T13:58:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-55",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-09-23T12:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-23T15:44:52.603Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-25T12:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-01T12:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-03T12:58:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-56",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-10-10T11:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-10T15:01:17.999Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-13T11:13:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-19T11:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-21T11:13:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-57",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-10-16T13:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-16T16:05:20.216Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-23T13:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-28T19:32:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-30T13:32:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-58",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-10-05T09:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-05T10:50:14.890Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-11T09:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-18T03:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-20T09:00:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-59",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-10-06T14:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-06T15:23:11.387Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-12T14:08:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-17T02:08:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T14:08:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-60",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-09-26T09:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-26T12:50:17.030Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-03T09:20:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-10T21:20:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-13T09:20:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-61",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-10-04T11:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-04T13:39:23.846Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-11T11:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-19T17:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-22T11:09:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-62",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-10-20T12:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-20T16:19:09.984Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-25T12:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-01T06:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-03T12:40:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-63",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-10-10T11:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-10T12:59:34.062Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-14T11:19:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-21T23:19:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-24T11:19:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-64",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-10-12T13:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-12T14:40:33.281Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-19T13:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-25T13:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-27T13:24:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-65",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-10-16T12:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-16T16:26:22.707Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T12:27:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-23T12:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-24T12:27:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-66",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-10-01T15:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-01T19:11:08.512Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-03T15:22:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-06T10:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-06T22:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-09T00:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-10T15:22:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-67",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-10-18T09:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-18T11:55:40.084Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-22T09:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-26T00:22:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-26T12:22:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-29T05:10:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-31T09:58:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-68",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-09-28T16:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-28T17:41:08.394Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-01T16:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-06T22:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-08T16:45:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-69",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-10-15T12:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-15T13:19:20.790Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-18T12:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-26T00:49:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-28T12:49:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-70",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-10-22T14:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-22T17:20:19.316Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-24T14:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-26T20:37:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-27T14:37:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-71",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-10-03T08:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-03T12:14:17.608Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-10T08:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-16T08:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T08:16:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-72",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-10-03T16:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-03T17:56:56.927Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-09T16:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-16T10:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T16:56:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-73",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-10-09T08:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-09T11:33:01.826Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-15T08:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-22T02:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-24T08:52:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-74",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-10-01T13:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-01T15:35:35.204Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-06T13:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-11T19:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-13T13:36:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-75",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-10-13T15:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-13T19:04:24.908Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-17T15:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-20T11:03:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T23:03:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-23T01:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-24T15:51:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-76",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-10-09T16:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-09T19:08:17.099Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-11T16:54:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-19T04:54:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-21T16:54:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-77",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-10-02T16:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-02T19:08:34.307Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-09T16:03:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-16T10:03:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T16:03:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-78",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-10-16T09:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-16T12:32:28.611Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-18T09:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-19T23:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T11:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-21T16:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-22T09:15:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-79",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-10-02T15:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-02T18:41:52.395Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-08T15:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-14T15:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-16T15:52:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-80",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-11-05T14:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-05T17:06:21.043Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T14:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-12T08:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-13T14:21:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-81",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-11-10T11:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T12:33:42.112Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-13T11:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-19T11:51:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-21T11:51:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-82",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-11-01T11:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-01T14:58:31.752Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-05T11:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-09T05:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-10T11:58:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-83",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-11-15T14:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-15T16:16:01.801Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-19T14:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-22T14:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-23T14:53:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-84",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-11-06T16:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T19:46:01.154Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-13T16:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-16T11:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-16T23:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-19T02:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-20T16:24:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-85",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-11-06T13:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T15:38:01.876Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-10T13:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-14T07:51:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-15T13:51:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-86",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-11-07T09:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-07T10:35:05.426Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-14T09:05:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-21T03:05:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-23T09:05:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-87",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-11-19T16:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-19T19:46:18.955Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-23T16:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-26T16:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-27T16:38:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-88",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-11-09T12:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-09T15:32:35.915Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-12T12:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-17T00:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-18T12:39:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-89",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-10-31T12:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-31T13:21:08.415Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-03T12:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-08T00:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-09T12:45:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-90",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-11-08T12:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T13:55:50.066Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-15T12:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-17T22:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-18T10:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-20T05:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-21T12:50:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-91",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-11-18T12:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-18T14:47:51.566Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-21T12:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T12:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-25T12:07:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-92",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-11-15T15:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-15T16:03:31.997Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-18T15:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T15:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-26T15:21:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-93",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-11-23T10:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-23T12:20:00.463Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T10:47:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-02T04:47:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-04T10:47:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-94",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-11-20T15:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-20T19:31:01.782Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T15:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-01T15:51:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-03T15:51:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-95",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-10-31T14:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-31T15:45:28.898Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-06T14:13:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-08T14:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-09T02:13:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-10T14:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-11T14:13:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-96",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-11-06T16:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T18:23:42.999Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-09T16:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-15T16:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-17T16:44:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-97",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-11-14T10:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-14T11:32:39.751Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-18T10:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T10:15:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-26T10:15:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-98",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-11-21T14:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-21T16:27:41.313Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-24T14:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-30T14:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-02T14:11:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-99",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-11-01T13:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-01T14:38:03.258Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-04T13:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-06T13:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-07T01:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-08T13:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-09T13:52:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-100",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-11-10T10:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T11:55:09.929Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-13T10:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-19T10:30:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-21T10:30:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-101",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-11-11T13:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-11T15:32:27.519Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-13T13:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-18T01:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-19T13:07:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-102",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-11-10T12:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T15:10:01.420Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-14T12:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-16T12:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-17T00:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-18T12:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-19T12:04:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-103",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-11-13T11:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-13T15:20:34.874Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-16T11:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-22T11:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-24T11:38:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-104",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-11-12T10:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-12T12:16:58.671Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-15T10:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-19T22:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-21T10:29:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-105",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-11-06T10:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T12:46:40.306Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T10:46:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-12T04:46:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-13T10:46:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-106",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-12-17T10:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T13:44:30.774Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-21T10:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-23T16:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-24T10:33:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-107",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-12-18T16:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-18T19:30:45.651Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-24T16:46:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-27T16:46:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T16:46:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-108",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-12-07T10:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-07T12:12:04.721Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-14T10:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-18T04:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-19T10:36:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-109",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-12-02T08:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-02T09:31:56.764Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-06T08:03:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-09T08:03:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-10T08:03:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-110",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-12-10T10:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T13:31:38.897Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-16T10:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-19T10:28:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-20T10:28:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-111",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-12-13T12:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-13T15:19:02.650Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-20T12:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-22T18:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-23T12:36:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-112",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-11-28T08:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-28T10:21:44.648Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-02T08:17:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-03T13:05:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-04T01:05:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-04T22:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-05T08:17:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-113",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-12-23T13:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-23T13:51:42.690Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T13:05:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-26T17:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-27T05:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T03:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T13:05:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-114",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-12-09T14:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-09T16:09:09.293Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-11T14:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-14T14:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-15T14:06:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-115",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-12-10T11:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T14:41:20.582Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-12T11:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-16T05:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-17T11:24:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-116",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-12-13T09:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-13T12:55:39.986Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-18T09:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-21T09:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-22T09:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-117",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-12-03T11:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-03T14:40:26.172Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T11:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-13T11:30:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-14T11:30:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-118",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-11-25T14:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-25T16:52:34.752Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-01T14:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-04T14:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-05T14:44:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-119",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-12-22T15:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-22T17:37:44.476Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T15:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T15:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-29T15:33:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-120",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-12-03T14:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-03T15:36:07.355Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-05T14:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-08T14:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-09T14:33:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-121",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-12-09T12:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-09T13:47:02.005Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-12T12:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-14T02:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-14T14:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-15T19:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-16T12:15:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-122",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-12-04T12:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-04T14:34:14.238Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-11T12:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-14T12:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-15T12:39:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-123",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-12-17T14:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T16:04:11.143Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-20T14:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-23T14:30:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-24T14:30:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-124",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-12-20T12:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-20T15:33:15.534Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-22T12:13:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-25T12:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-26T12:13:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-125",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-12-23T08:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-23T09:30:23.136Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T08:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-27T14:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T08:21:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-126",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-12-21T12:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-21T16:18:13.382Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T12:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-26T12:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-27T12:41:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-127",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-11-29T16:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-29T19:48:12.911Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-03T16:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-05T22:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-06T16:41:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-128",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-12-07T11:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-07T13:43:28.678Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-12T11:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-15T11:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-16T11:07:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-129",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-12-17T13:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T16:09:13.291Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-22T13:46:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-25T13:46:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-26T13:46:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-130",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-12-06T08:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-06T10:05:40.280Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-13T08:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-15T08:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-15T20:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-17T08:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-18T08:53:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-131",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-12-03T16:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-03T20:27:59.176Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-05T16:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-08T16:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-09T16:53:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-132",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-12-18T16:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-18T20:03:26.459Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-21T16:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-24T16:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-25T16:43:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-133",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-12-20T08:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-20T11:02:07.827Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T08:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T08:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-29T08:44:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    }
  ]
}

export const DEMO_DECLINING: DemoFixture = {
  "source_type": "jira",
  "project_key": "BETA",
  "exported_at": "2026-03-28T11:28:31.989Z",
  "tickets": [
    {
      "external_id": "BETA-1",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-07-02T12:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-02T13:27:39.043Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T12:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-08T18:28:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-09T12:28:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-2",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-07-05T11:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-05T12:40:54.872Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-11T11:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-14T11:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-15T11:14:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-3",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-07-18T14:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-18T17:34:47.803Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-25T14:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T20:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-28T14:09:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-4",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-07-19T11:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-19T14:56:38.979Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-24T11:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-26T17:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-27T11:34:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-5",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-07-16T08:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-16T08:55:47.787Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-18T08:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-19T22:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-20T10:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T15:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-22T08:15:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-6",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-07-09T15:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-09T17:45:52.134Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-12T15:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-14T05:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-14T17:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-15T22:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-16T15:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-7",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-07-21T09:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-21T09:46:03.626Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-24T09:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T09:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-28T09:09:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-8",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-07-16T08:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-16T11:27:05.419Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-18T08:55:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-19T23:19:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-20T11:19:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T16:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-22T08:55:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-9",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-06-30T12:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-30T16:15:17.873Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-04T12:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-06T18:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-07T12:39:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-10",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-07-09T09:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-09T12:55:00.753Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-15T09:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-19T03:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-20T09:50:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-11",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-07-14T16:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-14T17:11:56.156Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-16T16:01:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-19T16:01:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-20T16:01:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-12",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-07-13T12:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-13T15:40:22.721Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-15T12:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-17T18:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-18T12:21:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-13",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-07-04T09:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-04T11:02:22.643Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-07T09:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-09T15:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-10T09:24:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-14",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-07-07T16:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T20:19:57.898Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-14T16:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-17T16:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-18T16:45:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-15",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-07-04T12:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-04T14:21:20.403Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-07T12:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-11T06:49:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-12T12:49:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-16",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-07-22T16:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-22T19:44:58.720Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-25T16:05:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-28T16:05:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-29T16:05:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-17",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-06-29T09:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-29T11:32:18.478Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-01T09:01:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-04T09:01:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-05T09:01:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-18",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-07-11T09:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-11T13:06:52.514Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-17T09:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-19T15:48:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-20T09:48:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-19",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-07-07T16:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T20:27:06.813Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-13T16:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-15T07:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-15T19:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-16T23:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-17T16:38:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-20",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-07-11T10:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-11T13:40:42.130Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-16T10:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-18T16:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-19T10:38:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-21",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-06-30T15:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-30T16:31:17.454Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T15:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-09T15:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-10T15:23:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-22",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-06-28T15:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-28T18:18:01.392Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-05T15:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-08T15:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-09T15:06:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-23",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-07-09T15:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-09T17:57:43.006Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-12T15:46:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-15T15:46:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-16T15:46:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-24",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-07-06T14:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-06T18:03:35.285Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-12T14:27:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-15T14:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-16T14:27:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-25",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-07-01T10:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-01T13:07:31.504Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-04T10:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-05T15:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T03:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T00:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-07T10:14:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-26",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-07-20T14:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-20T15:29:04.505Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-22T14:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-24T20:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-25T14:02:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-27",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-07-02T08:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-02T10:51:51.043Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-09T08:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-11T08:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-11T20:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-13T08:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-14T08:04:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-28",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-07-22T11:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-22T13:26:55.844Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-24T11:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-26T17:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-27T11:56:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-29",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-08-01T10:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-01T13:27:01.733Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-04T10:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-06T10:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-06T22:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-08T10:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-09T10:42:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-30",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-08-06T12:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-06T14:11:40.534Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-11T12:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-15T06:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-16T12:36:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-31",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-08-12T16:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-12T17:36:26.880Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T16:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-19T04:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-20T16:34:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-32",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-08-18T16:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-18T20:15:51.548Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-21T16:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-27T16:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-29T16:39:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-33",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-08-10T11:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-10T15:16:32.489Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T11:17:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-18T23:17:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-20T11:17:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-34",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-07-28T08:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-28T11:55:56.585Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-04T08:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-07T08:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-08T08:00:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-35",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-08-03T15:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-03T17:39:49.698Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-09T15:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-14T03:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-15T15:21:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-36",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-08-03T13:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-03T17:11:56.466Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-09T13:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-11T13:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T01:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-13T13:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-14T13:16:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-37",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-08-07T12:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-07T14:46:00.596Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T12:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T06:51:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-17T12:51:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-38",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-08-10T15:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-10T16:25:14.159Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T15:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-19T03:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-20T15:07:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-39",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-08-05T15:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-05T19:40:29.978Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-08T15:47:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-12T09:47:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-13T15:47:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-40",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-08-15T09:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-15T12:48:09.569Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-18T09:55:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-23T15:55:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-25T09:55:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-41",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-08-10T11:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-10T12:27:14.666Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T11:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T02:12:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-16T14:12:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-17T19:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-18T11:48:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-42",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-08-13T08:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-13T11:39:09.784Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-17T08:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T20:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-23T08:38:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-43",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-08-09T15:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-09T16:34:56.942Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T15:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-19T21:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-21T15:04:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-44",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-08-15T15:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-15T16:54:37.494Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-22T15:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-27T21:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-29T15:36:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-45",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-08-08T09:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-08T10:26:53.486Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T09:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-15T09:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-16T09:18:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-46",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-08-09T08:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-09T10:05:16.762Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T08:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-15T22:55:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-16T10:55:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-17T15:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-18T08:31:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-47",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-08-10T15:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-10T16:58:58.370Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-16T15:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T21:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-23T15:36:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-48",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-07-28T10:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-28T13:32:43.738Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-03T10:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-06T05:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-06T17:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-08T20:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-10T10:26:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-49",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-08-20T16:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-20T19:15:28.541Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-24T16:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-27T02:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-27T14:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-29T09:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-30T16:28:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-50",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-08-07T09:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-07T11:13:42.299Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-09T09:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-14T15:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-16T09:40:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-51",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-08-13T10:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-13T14:19:13.332Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-19T10:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T20:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-22T08:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-24T03:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-25T10:33:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-52",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-08-11T11:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-11T14:05:07.594Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-18T11:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-22T23:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-24T11:41:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-53",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-08-16T08:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-16T10:38:10.682Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-19T08:08:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-23T20:08:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-25T08:08:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-54",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-08-09T14:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-09T17:22:47.884Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T14:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-15T00:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-15T12:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-17T07:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-18T14:30:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-55",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-09-14T09:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-14T12:49:11.419Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T09:20:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-26T09:20:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-28T09:20:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-56",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-09-10T12:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T13:34:23.368Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-16T12:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-22T12:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-24T12:23:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-57",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-09-19T16:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T17:56:37.531Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-24T16:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-27T11:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-27T23:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-30T02:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-01T16:30:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-58",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-09-08T12:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-08T12:46:34.303Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-10T12:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-11T16:54:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-12T04:54:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-13T02:30:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-13T12:06:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-59",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-09-05T16:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-05T18:10:41.057Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-07T16:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-13T16:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-15T16:45:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-60",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-09-07T10:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-07T12:42:40.782Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-13T10:01:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T10:01:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-21T10:01:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-61",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-09-09T15:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-09T18:23:46.264Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-12T15:27:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T09:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-21T15:27:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-62",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-08-28T12:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-28T15:43:28.730Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-03T12:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-11T00:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-13T12:40:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-63",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-09-03T11:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-03T15:27:20.620Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-08T11:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-14T11:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-16T11:42:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-64",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-09-04T08:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-04T11:47:15.468Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-09T08:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-16T02:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-18T08:35:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-65",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-09-15T15:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-15T18:25:53.380Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-19T15:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-21T15:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T03:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-23T15:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-24T15:34:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-66",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-09-03T16:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-03T18:44:51.941Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-10T16:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-17T10:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-19T16:02:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-67",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-09-19T16:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T17:34:18.719Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-21T16:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-25T10:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T16:58:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-68",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-09-07T16:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-07T19:36:12.656Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-14T16:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-18T10:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-19T16:39:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-69",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-09-08T08:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-08T11:41:02.512Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-13T08:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T08:31:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-21T08:31:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-70",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-09-19T09:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T13:04:41.856Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-21T09:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-25T03:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T09:09:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-71",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-09-18T10:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-18T13:10:07.825Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T10:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-30T16:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-03T10:33:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-72",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-08-28T09:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-28T11:12:26.971Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-04T09:46:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-11T21:46:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-14T09:46:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-73",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-09-08T12:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-08T15:24:53.271Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-13T12:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-17T06:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-18T12:11:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-74",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-08-27T15:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-27T17:36:19.773Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-02T15:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-07T21:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-09T15:52:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-75",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-08-31T12:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-31T15:33:06.784Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-04T12:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-09T18:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-11T12:50:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-76",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-09-16T15:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-16T17:16:03.878Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T15:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-30T03:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-02T15:23:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-77",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-09-12T13:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-12T15:28:17.519Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-14T13:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T08:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-19T20:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-23T10:57:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T13:21:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-78",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-09-06T13:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-06T14:22:41.343Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-12T13:13:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-18T13:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-20T13:13:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-79",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-10-18T11:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-18T15:04:47.777Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-23T11:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-03T17:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-07T11:14:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-80",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-10-08T11:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-08T13:32:43.693Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-11T11:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-22T17:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-26T11:40:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-81",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-10-03T14:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-03T18:00:22.418Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-08T14:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-15T08:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-17T14:42:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-82",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-09-29T08:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-29T10:10:10.698Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-01T08:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-11T02:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-14T08:53:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-83",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-10-14T13:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-14T15:40:55.940Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-21T13:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-31T07:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-03T13:06:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-84",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-10-12T08:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-12T10:09:30.226Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-18T08:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-28T20:37:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-01T08:37:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-85",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-09-27T15:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-27T19:08:57.342Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-01T15:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-09T21:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-12T15:41:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-86",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-10-15T16:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-15T20:21:10.609Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T16:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-30T10:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-02T16:41:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-87",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-09-28T14:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-28T16:16:41.719Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-04T14:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-14T08:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-17T14:18:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-88",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-09-27T12:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-27T13:54:48.031Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-04T12:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-12T18:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-15T12:24:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-89",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-10-04T15:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-04T16:27:36.695Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-11T15:17:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-20T15:17:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-23T15:17:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-90",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-09-29T13:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-29T15:43:56.311Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-04T13:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-11T07:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-13T13:36:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-91",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-10-14T14:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-14T16:07:26.670Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T14:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-28T02:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-30T14:00:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-92",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-10-09T13:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-09T14:17:47.236Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-11T13:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-24T07:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-28T13:36:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-93",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-10-19T16:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-19T17:32:36.601Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-24T16:03:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-01T04:03:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-03T16:03:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-94",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-10-04T14:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-04T18:03:44.466Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-06T14:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-16T08:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-19T14:09:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-95",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-10-10T12:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-10T14:51:59.603Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-14T12:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-26T12:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-30T12:43:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-96",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-10-02T16:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-02T19:27:20.378Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-04T16:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-12T22:31:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-15T16:31:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-97",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-10-05T08:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-05T11:20:44.369Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-09T08:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-17T14:32:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-20T08:32:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-98",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-10-04T08:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-04T10:08:56.225Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-07T08:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-12T23:12:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-13T11:12:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-17T16:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-21T08:48:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-99",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-09-25T15:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-25T18:56:49.933Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-02T15:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-09T09:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-11T15:00:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-100",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-10-05T08:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-05T12:16:22.680Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-10T08:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-21T14:30:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-25T08:30:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-101",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-11-06T13:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T17:10:36.494Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-11T13:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-20T13:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-23T13:56:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-102",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-11-15T09:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-15T13:22:53.298Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-22T09:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-02T21:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-06T09:38:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-103",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-11-21T12:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-21T14:42:22.543Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-24T12:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-09T12:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-14T12:23:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-104",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-11-22T12:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-22T13:32:00.222Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T12:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-05T06:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-08T12:35:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-105",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-11-08T10:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T14:08:02.210Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-15T10:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-28T22:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-03T10:56:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-106",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-11-22T14:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-22T16:18:59.957Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T14:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-03T14:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-04T02:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-10T02:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-15T14:45:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-107",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-11-12T09:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-12T11:32:50.586Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-18T09:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-02T15:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-07T09:45:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-108",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-11-18T13:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-18T16:19:12.791Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-22T13:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-04T13:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-08T13:39:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-109",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-11-10T13:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T14:26:18.160Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-17T13:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-30T07:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-04T13:42:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-110",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-10-30T12:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-30T15:07:41.822Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-04T12:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-15T00:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-18T12:39:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-111",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-11-21T09:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-21T12:31:30.180Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T09:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-08T03:49:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-12T09:49:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-112",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-10-28T10:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-28T13:28:51.950Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-01T10:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-11T04:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-14T10:02:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-113",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-11-21T13:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-21T17:37:12.531Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-24T13:57:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-05T19:57:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-09T13:57:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-114",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-11-10T16:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T19:57:58.222Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-14T16:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-25T04:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-28T16:52:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-115",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-11-12T13:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-12T16:05:18.353Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-19T13:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-30T19:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-04T13:39:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-116",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-11-15T15:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-15T18:45:06.874Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-19T15:59:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-26T01:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-26T13:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-01T08:47:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-05T15:59:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-117",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-11-18T10:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-18T12:47:01.232Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-21T10:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-05T16:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-10T10:41:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-118",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-10-28T15:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-28T17:32:52.379Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-01T15:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-11T09:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-14T15:34:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-119",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-12-17T16:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T19:59:39.232Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T16:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-06T22:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-11T16:39:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-120",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-11-28T09:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-28T13:05:57.041Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-02T09:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-20T09:28:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-26T09:28:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-121",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-12-03T15:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-03T19:04:22.028Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-06T15:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-20T21:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-25T15:52:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-122",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-12-20T12:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-20T13:04:26.410Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T12:22:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-07T06:22:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-11T12:22:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-123",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-12-18T12:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-18T14:44:37.390Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T12:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-09T18:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-15T12:52:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-124",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-12-15T15:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-15T16:06:47.103Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-21T15:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-01T21:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-05T15:35:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-125",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-12-14T09:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-14T11:32:48.645Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-21T09:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-06T21:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-12T09:35:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-126",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-11-29T15:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-29T16:38:05.817Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-04T15:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-21T21:15:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-27T15:15:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-127",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-12-01T11:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-01T13:44:51.249Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-05T11:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-14T16:20:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-15T04:20:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-22T01:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T11:32:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-128",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-12-15T11:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-15T13:02:20.714Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-17T11:19:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-06T17:19:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-13T11:19:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-129",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-12-12T13:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-12T14:23:38.940Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-14T13:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-22T22:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T10:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-29T17:48:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-04T13:00:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-130",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-12-19T12:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-19T14:04:45.496Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T12:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-11T00:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-16T12:39:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-131",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-12-04T16:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-04T19:29:25.961Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T16:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-31T16:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-07T16:58:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-132",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-12-17T13:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T15:35:21.671Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-20T13:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-26T04:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-26T16:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-30T21:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-03T13:52:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-133",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-12-17T16:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T17:54:06.391Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-21T16:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-29T16:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-30T04:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-05T04:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-10T16:18:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    }
  ]
}
