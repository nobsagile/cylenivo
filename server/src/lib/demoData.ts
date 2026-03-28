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
  "exported_at": "2026-03-28T11:56:30.667Z",
  "tickets": [
    {
      "external_id": "BETA-001",
      "title": "Ticket 001",
      "ticket_type": "task",
      "created_at": "2026-01-23T20:24:14.704Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-25T09:42:26.132Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-01-28T12:45:03.935Z"
        },
        {
          "from_status": "OBSOLET",
          "to_status": "Up Next",
          "transitioned_at": "2026-03-03T12:12:36.979Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-12T07:16:45.536Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-03-12T09:29:44.640Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-03-18T05:17:59.757Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-03-18T07:56:43.411Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-03-26T13:43:45.514Z"
        }
      ]
    },
    {
      "external_id": "BETA-002",
      "title": "Ticket 002",
      "ticket_type": "task",
      "created_at": "2025-05-22T06:58:11.086Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-22T06:58:11.695Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:22.369Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-02-08T08:57:17.993Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-05T10:39:10.363Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-03-06T05:37:50.486Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-03-06T05:37:54.585Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-03-10T13:32:13.925Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-03-12T05:54:16.460Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-03-26T13:43:44.183Z"
        }
      ]
    },
    {
      "external_id": "BETA-003",
      "title": "Ticket 003",
      "ticket_type": "task",
      "created_at": "2026-03-12T11:23:09.759Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-03-12T11:23:10.534Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-12T14:35:06.986Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-03-12T14:42:45.343Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-03-13T09:27:20.098Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-03-17T11:37:16.067Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-03-19T05:49:32.599Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-03-26T13:43:42.512Z"
        }
      ]
    },
    {
      "external_id": "BETA-004",
      "title": "Ticket 004",
      "ticket_type": "bug",
      "created_at": "2026-03-17T16:35:00.394Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-03-18T06:47:44.773Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-23T12:03:33.183Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-03-26T08:33:07.769Z"
        }
      ]
    },
    {
      "external_id": "BETA-005",
      "title": "Ticket 005",
      "ticket_type": "task",
      "created_at": "2026-01-07T20:06:25.400Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-02-23T09:44:43.690Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-24T08:59:43.324Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-24T09:02:59.523Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-03-18T18:30:03.156Z"
        }
      ]
    },
    {
      "external_id": "BETA-006",
      "title": "Ticket 006",
      "ticket_type": "task",
      "created_at": "2026-01-26T15:42:46.048Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-27T08:52:21.308Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-05T18:54:21.339Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-03-10T10:23:22.040Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-03-10T11:46:04.461Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-03-11T12:46:18.417Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-03-12T13:08:30.087Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-03-18T16:06:17.320Z"
        }
      ]
    },
    {
      "external_id": "BETA-007",
      "title": "Ticket 007",
      "ticket_type": "task",
      "created_at": "2026-01-30T12:25:41.992Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-30T13:02:20.995Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-16T10:13:01.432Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-02-20T14:56:41.923Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-23T10:22:39.499Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-03-02T12:05:23.996Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-03-11T15:27:33.754Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-03-12T08:40:19.862Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-03-18T16:06:07.535Z"
        }
      ]
    },
    {
      "external_id": "BETA-008",
      "title": "Ticket 008",
      "ticket_type": "story",
      "created_at": "2026-02-12T08:33:21.283Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Development",
          "transitioned_at": "2026-02-12T08:33:21.951Z"
        },
        {
          "from_status": "Development",
          "to_status": "Done",
          "transitioned_at": "2026-03-16T10:18:06.113Z"
        }
      ]
    },
    {
      "external_id": "BETA-009",
      "title": "Ticket 009",
      "ticket_type": "task",
      "created_at": "2025-04-29T06:56:56.972Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-29T06:56:57.878Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:23.305Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-03-08T08:58:01.495Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Done",
          "transitioned_at": "2026-03-13T08:19:02.907Z"
        }
      ]
    },
    {
      "external_id": "BETA-010",
      "title": "Ticket 010",
      "ticket_type": "task",
      "created_at": "2025-05-22T06:55:02.845Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-22T06:55:03.724Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:21.068Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-18T10:30:02.194Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-04T09:22:35.424Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-03-04T10:41:38.961Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-03-05T08:49:13.499Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-03-09T06:48:00.194Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-03-11T12:11:13.924Z"
        }
      ]
    },
    {
      "external_id": "BETA-011",
      "title": "Ticket 011",
      "ticket_type": "task",
      "created_at": "2026-01-23T20:30:36.112Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-25T09:44:59.671Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-23T10:06:46.472Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-23T10:29:04.736Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-25T15:32:58.515Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-25T15:33:23.490Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-03-03T07:33:15.556Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-03-04T06:59:24.038Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-03-09T06:50:45.757Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-03-11T12:11:12.678Z"
        }
      ]
    },
    {
      "external_id": "BETA-012",
      "title": "Ticket 012",
      "ticket_type": "task",
      "created_at": "2026-01-23T20:19:33.540Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-02-11T12:01:45.479Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-05T12:34:06.239Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-03-06T09:19:44.591Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-03-06T09:36:40.144Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Done",
          "transitioned_at": "2026-03-09T06:51:31.252Z"
        }
      ]
    },
    {
      "external_id": "BETA-013",
      "title": "Ticket 013",
      "ticket_type": "bug",
      "created_at": "2026-01-22T11:04:21.766Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-22T13:59:50.166Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-05T08:49:36.519Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-03-05T09:20:17.917Z"
        }
      ]
    },
    {
      "external_id": "BETA-014",
      "title": "Ticket 014",
      "ticket_type": "task",
      "created_at": "2025-05-06T07:58:25.486Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-06T07:58:26.307Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:20.821Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-18T10:28:06.258Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-03-04T09:12:16.572Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-03-05T07:05:36.035Z"
        }
      ]
    },
    {
      "external_id": "BETA-015",
      "title": "Ticket 015",
      "ticket_type": "task",
      "created_at": "2026-02-06T15:51:58.091Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-02-08T08:55:07.556Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-23T10:30:35.457Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-23T10:36:47.175Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-24T14:58:07.208Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-25T15:12:43.013Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-26T06:47:48.734Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-03-04T14:06:39.178Z"
        }
      ]
    },
    {
      "external_id": "BETA-016",
      "title": "Ticket 016",
      "ticket_type": "task",
      "created_at": "2026-01-21T08:06:03.826Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-21T08:06:05.624Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-23T10:30:36.709Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-26T09:54:09.507Z"
        }
      ]
    },
    {
      "external_id": "BETA-017",
      "title": "Ticket 017",
      "ticket_type": "task",
      "created_at": "2026-01-23T17:23:45.985Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-25T09:22:30.807Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-02T10:01:00.869Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-05T11:17:53.771Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-05T15:18:05.881Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-06T16:25:01.913Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-11T15:44:31.417Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-13T08:41:43.186Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Backlog",
          "transitioned_at": "2026-02-18T07:59:22.140Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-26T09:34:34.872Z"
        }
      ]
    },
    {
      "external_id": "BETA-018",
      "title": "Ticket 018",
      "ticket_type": "task",
      "created_at": "2026-02-24T12:21:00.847Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-02-24T12:21:02.350Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-25T08:18:43.941Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-25T09:30:47.033Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-25T10:31:04.972Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-25T11:43:46.645Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Done",
          "transitioned_at": "2026-02-26T06:28:16.638Z"
        },
        {
          "from_status": "Done",
          "to_status": "Development",
          "transitioned_at": "2026-02-27T08:05:03.845Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-27T08:27:53.178Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Done",
          "transitioned_at": "2026-03-09T13:07:51.258Z"
        }
      ]
    },
    {
      "external_id": "BETA-019",
      "title": "Ticket 019",
      "ticket_type": "task",
      "created_at": "2024-12-18T08:14:48.407Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2024-12-18T08:14:49.011Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Concept",
          "transitioned_at": "2024-12-18T09:34:27.895Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Up Next",
          "transitioned_at": "2025-01-08T14:19:34.194Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Concept",
          "transitioned_at": "2025-01-28T15:59:05.568Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Up Next",
          "transitioned_at": "2025-01-28T16:14:28.037Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Concept",
          "transitioned_at": "2025-02-12T11:59:18.892Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Up Next",
          "transitioned_at": "2025-02-12T14:53:36.845Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Concept",
          "transitioned_at": "2025-02-12T15:30:58.100Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-02-12T16:13:36.104Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "PM QA",
          "transitioned_at": "2025-02-12T17:12:07.943Z"
        },
        {
          "from_status": "PM QA",
          "to_status": "Up Next",
          "transitioned_at": "2025-02-13T06:50:59.128Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:17.522Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Backlog Onhold",
          "transitioned_at": "2025-10-15T07:57:08.190Z"
        },
        {
          "from_status": "Backlog Onhold",
          "to_status": "Backlog",
          "transitioned_at": "2025-10-22T15:22:01.044Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-11-17T14:28:35.576Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-11-19T15:28:03.684Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-11-24T15:01:20.739Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-01T08:48:35.666Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-04T10:56:07.642Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-04T10:56:15.055Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-04T10:56:49.086Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-04T10:57:06.089Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-05T08:58:23.576Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-08T12:20:48.012Z"
        },
        {
          "from_status": "Development",
          "to_status": "Backlog",
          "transitioned_at": "2026-01-08T09:34:53.139Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-20T08:36:41.426Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-27T11:08:02.707Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-28T09:26:23.627Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-23T14:50:19.735Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-25T12:46:55.354Z"
        }
      ]
    },
    {
      "external_id": "BETA-020",
      "title": "Ticket 020",
      "ticket_type": "task",
      "created_at": "2025-09-16T06:02:58.671Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-16T06:05:08.851Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-09-22T09:03:49.512Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-10-02T14:04:06.806Z"
        },
        {
          "from_status": "Development",
          "to_status": "Concept",
          "transitioned_at": "2025-10-06T08:18:03.698Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-10-06T09:21:16.604Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-10-07T08:19:08.255Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2025-10-14T12:29:57.203Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Development",
          "transitioned_at": "2025-10-15T09:43:05.046Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-10-15T09:43:48.308Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-10-15T09:45:11.130Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2025-10-24T11:56:28.945Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Development",
          "transitioned_at": "2025-10-30T12:55:04.519Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-10-30T13:01:50.190Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-13T10:31:40.545Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-02-03T09:07:10.541Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-09T10:13:54.960Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-09T10:14:58.177Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-09T11:08:03.379Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-12T15:47:39.716Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-18T09:41:32.693Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-18T11:44:21.027Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-18T12:22:22.584Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-20T07:17:27.260Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-25T12:46:44.984Z"
        }
      ]
    },
    {
      "external_id": "BETA-021",
      "title": "Ticket 021",
      "ticket_type": "task",
      "created_at": "2025-12-11T13:10:38.390Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-04T09:32:36.088Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-06T12:52:27.304Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Backlog",
          "transitioned_at": "2026-01-18T11:27:46.054Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-28T11:56:02.509Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-02T09:56:11.502Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-05T15:15:41.114Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Up Next",
          "transitioned_at": "2026-02-08T08:49:02.495Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-09T08:38:08.568Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-09T08:38:14.494Z"
        },
        {
          "from_status": "Development",
          "to_status": "Done",
          "transitioned_at": "2026-02-16T12:20:57.238Z"
        },
        {
          "from_status": "Done",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-16T12:22:07.322Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-16T15:02:06.907Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-17T10:43:41.731Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-18T09:41:58.750Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-18T11:48:14.740Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-18T12:32:00.460Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-19T08:54:34.389Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-25T12:46:34.377Z"
        }
      ]
    },
    {
      "external_id": "BETA-022",
      "title": "Ticket 022",
      "ticket_type": "task",
      "created_at": "2026-01-23T20:10:53.241Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-25T09:25:09.078Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-09T10:14:35.037Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-12T05:13:02.226Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-12T08:04:00.997Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-17T06:49:51.213Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-20T06:21:47.992Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-25T12:46:25.117Z"
        }
      ]
    },
    {
      "external_id": "BETA-023",
      "title": "Ticket 023",
      "ticket_type": "task",
      "created_at": "2026-01-22T08:00:41.024Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-22T08:00:41.849Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-16T10:16:47.764Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-16T11:02:02.703Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-02-16T12:46:00.765Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-19T10:17:37.847Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-23T14:50:46.502Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-25T12:46:15.692Z"
        }
      ]
    },
    {
      "external_id": "BETA-024",
      "title": "Ticket 024",
      "ticket_type": "story",
      "created_at": "2025-12-01T14:37:33.053Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-02T07:28:32.998Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-08T10:38:06.759Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-11T16:59:54.537Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-11T17:24:12.741Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-12T09:22:06.463Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2025-12-16T10:27:26.679Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Development",
          "transitioned_at": "2026-01-12T11:57:56.165Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-12T12:38:53.783Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-23T14:50:45.697Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-25T12:46:09.076Z"
        }
      ]
    },
    {
      "external_id": "BETA-025",
      "title": "Ticket 025",
      "ticket_type": "task",
      "created_at": "2026-01-08T10:27:52.087Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-08T10:27:52.661Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-08T11:11:13.999Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-01-08T14:36:39.353Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-14T14:29:53.903Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-15T17:11:37.380Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-20T08:37:49.166Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-23T14:50:46.265Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-25T12:43:32.694Z"
        }
      ]
    },
    {
      "external_id": "BETA-026",
      "title": "Ticket 026",
      "ticket_type": "story",
      "created_at": "2025-12-01T14:46:29.169Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-02T07:28:33.257Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-08T10:41:22.634Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2025-12-15T15:09:54.100Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-12T13:04:42.685Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-23T14:50:46.023Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-25T12:43:26.274Z"
        }
      ]
    },
    {
      "external_id": "BETA-027",
      "title": "Ticket 027",
      "ticket_type": "task",
      "created_at": "2025-09-11T08:08:39.476Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Development",
          "transitioned_at": "2025-10-02T13:51:04.596Z"
        },
        {
          "from_status": "Development",
          "to_status": "Backlog Onhold",
          "transitioned_at": "2025-10-20T13:03:11.219Z"
        },
        {
          "from_status": "Backlog Onhold",
          "to_status": "Backlog",
          "transitioned_at": "2025-10-22T15:20:46.313Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Done",
          "transitioned_at": "2026-02-24T08:38:12.188Z"
        }
      ]
    },
    {
      "external_id": "BETA-028",
      "title": "Ticket 028",
      "ticket_type": "task",
      "created_at": "2025-09-11T14:30:26.116Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Development",
          "transitioned_at": "2025-09-18T09:42:20.485Z"
        },
        {
          "from_status": "Development",
          "to_status": "Development Onhold",
          "transitioned_at": "2025-10-02T13:50:34.457Z"
        },
        {
          "from_status": "Development Onhold",
          "to_status": "Ready for Release",
          "transitioned_at": "2025-10-07T09:20:02.671Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Development Onhold",
          "transitioned_at": "2025-10-08T11:29:32.836Z"
        },
        {
          "from_status": "Development Onhold",
          "to_status": "Backlog Onhold",
          "transitioned_at": "2025-10-08T13:29:15.585Z"
        },
        {
          "from_status": "Backlog Onhold",
          "to_status": "Development",
          "transitioned_at": "2025-10-20T12:45:12.694Z"
        },
        {
          "from_status": "Development",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-14T08:44:53.582Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Done",
          "transitioned_at": "2026-02-24T08:36:45.078Z"
        }
      ]
    },
    {
      "external_id": "BETA-029",
      "title": "Ticket 029",
      "ticket_type": "task",
      "created_at": "2025-09-10T06:52:59.650Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Concept",
          "transitioned_at": "2025-09-10T06:53:00.193Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Concept Onhold",
          "transitioned_at": "2025-09-29T09:01:40.966Z"
        },
        {
          "from_status": "Concept Onhold",
          "to_status": "ONHOLD",
          "transitioned_at": "2025-10-13T11:18:41.810Z"
        },
        {
          "from_status": "ONHOLD",
          "to_status": "Preparation",
          "transitioned_at": "2025-10-22T09:04:11.387Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Backlog",
          "transitioned_at": "2025-10-23T08:42:02.416Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-11-02T09:39:13.079Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-02T09:39:31.090Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-24T08:26:14.507Z"
        }
      ]
    },
    {
      "external_id": "BETA-030",
      "title": "Ticket 030",
      "ticket_type": "task",
      "created_at": "2025-09-10T07:22:04.175Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Concept",
          "transitioned_at": "2025-09-10T07:22:04.928Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Concept Onhold",
          "transitioned_at": "2025-09-29T09:01:48.431Z"
        },
        {
          "from_status": "Concept Onhold",
          "to_status": "Concept",
          "transitioned_at": "2025-10-08T13:34:43.387Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Backlog Onhold",
          "transitioned_at": "2025-10-20T08:57:22.893Z"
        },
        {
          "from_status": "Backlog Onhold",
          "to_status": "Backlog",
          "transitioned_at": "2025-10-22T15:20:38.203Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-24T08:25:09.061Z"
        }
      ]
    },
    {
      "external_id": "BETA-031",
      "title": "Ticket 031",
      "ticket_type": "task",
      "created_at": "2025-11-20T12:36:17.474Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-11-20T12:36:18.080Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-11-24T08:23:43.082Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Backlog",
          "transitioned_at": "2025-12-15T10:36:38.125Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-23T10:11:24.769Z"
        }
      ]
    },
    {
      "external_id": "BETA-032",
      "title": "Ticket 032",
      "ticket_type": "task",
      "created_at": "2025-11-20T12:40:43.227Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-23T09:43:43.171Z"
        }
      ]
    },
    {
      "external_id": "BETA-033",
      "title": "Ticket 033",
      "ticket_type": "task",
      "created_at": "2025-11-20T12:39:42.508Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-11-20T12:39:43.155Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-01T10:22:03.591Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Backlog",
          "transitioned_at": "2025-12-15T10:36:44.294Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-07T09:38:35.315Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-14T16:00:32.624Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-14T16:25:10.849Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-15T09:27:30.816Z"
        },
        {
          "from_status": "Development",
          "to_status": "Done",
          "transitioned_at": "2026-02-18T14:28:33.170Z"
        }
      ]
    },
    {
      "external_id": "BETA-034",
      "title": "Ticket 034",
      "ticket_type": "task",
      "created_at": "2026-01-29T08:17:49.105Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-29T08:17:49.848Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-02-02T10:00:41.586Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-02-02T12:55:29.865Z"
        },
        {
          "from_status": "Development",
          "to_status": "Backlog",
          "transitioned_at": "2026-02-11T12:03:35.584Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Done",
          "transitioned_at": "2026-02-17T07:02:16.827Z"
        }
      ]
    },
    {
      "external_id": "BETA-035",
      "title": "Ticket 035",
      "ticket_type": "task",
      "created_at": "2026-01-25T08:59:38.678Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-25T08:59:39.418Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-16T10:13:10.040Z"
        }
      ]
    },
    {
      "external_id": "BETA-036",
      "title": "Ticket 036",
      "ticket_type": "task",
      "created_at": "2026-01-13T08:07:27.233Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-13T08:07:28.079Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-19T11:23:52.546Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-28T14:13:42.949Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-29T14:17:22.369Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-29T14:47:02.366Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-29T15:24:16.536Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-02-06T14:37:58.571Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-06T14:38:04.504Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-09T12:03:20.000Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-11T09:44:53.501Z"
        }
      ]
    },
    {
      "external_id": "BETA-037",
      "title": "Ticket 037",
      "ticket_type": "bug",
      "created_at": "2026-01-30T12:47:20.564Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Development",
          "transitioned_at": "2026-01-30T12:49:23.140Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-30T13:38:54.948Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-03T06:40:34.126Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-10T11:59:23.794Z"
        }
      ]
    },
    {
      "external_id": "BETA-038",
      "title": "Ticket 038",
      "ticket_type": "task",
      "created_at": "2026-01-18T10:19:57.756Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-18T10:19:59.137Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-19T16:18:04.366Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-26T16:54:24.123Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-29T14:30:18.735Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-02T08:12:22.930Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-10T11:59:22.182Z"
        }
      ]
    },
    {
      "external_id": "BETA-039",
      "title": "Ticket 039",
      "ticket_type": "bug",
      "created_at": "2026-01-02T10:22:16.017Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-04T09:42:31.586Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-05T12:03:15.590Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-01-08T14:45:04.832Z"
        },
        {
          "from_status": "Development",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-08T14:46:05.173Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-09T11:13:58.035Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-09T15:52:21.803Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-15T11:12:29.229Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-21T10:20:43.769Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-21T10:21:23.451Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-02-03T06:40:18.367Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-02-10T11:59:20.308Z"
        },
        {
          "from_status": "Done",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-02-16T12:21:19.301Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Done",
          "transitioned_at": "2026-02-16T12:21:45.051Z"
        }
      ]
    },
    {
      "external_id": "BETA-040",
      "title": "Ticket 040",
      "ticket_type": "task",
      "created_at": "2025-02-06T10:16:03.890Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-02-06T10:28:37.868Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:18.127Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-19T12:25:09.104Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-09T12:49:43.471Z"
        }
      ]
    },
    {
      "external_id": "BETA-041",
      "title": "Ticket 041",
      "ticket_type": "story",
      "created_at": "2025-04-11T08:05:22.744Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-04-15T08:45:58.011Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-08T08:54:48.179Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:20.539Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-06T16:48:57.999Z"
        }
      ]
    },
    {
      "external_id": "BETA-042",
      "title": "Ticket 042",
      "ticket_type": "task",
      "created_at": "2025-11-03T10:35:08.126Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-11-03T10:35:09.288Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Development",
          "transitioned_at": "2025-11-03T10:37:57.294Z"
        },
        {
          "from_status": "Development",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T09:25:24.427Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-06T16:20:06.147Z"
        }
      ]
    },
    {
      "external_id": "BETA-043",
      "title": "Ticket 043",
      "ticket_type": "task",
      "created_at": "2024-11-14T09:20:30.028Z",
      "transitions": [
        {
          "from_status": "To Do",
          "to_status": "ONHOLD",
          "transitioned_at": "2024-11-14T09:20:39.740Z"
        },
        {
          "from_status": "ONHOLD",
          "to_status": "PM QA",
          "transitioned_at": "2024-11-27T08:41:20.286Z"
        },
        {
          "from_status": "PM QA",
          "to_status": "Backlog Onhold",
          "transitioned_at": "2024-11-27T11:05:10.976Z"
        },
        {
          "from_status": "Backlog Onhold",
          "to_status": "Backlog",
          "transitioned_at": "2025-10-22T15:21:53.732Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-06T16:19:08.696Z"
        }
      ]
    },
    {
      "external_id": "BETA-044",
      "title": "Ticket 044",
      "ticket_type": "task",
      "created_at": "2025-10-27T10:24:29.730Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Development",
          "transitioned_at": "2025-10-27T10:24:45.910Z"
        },
        {
          "from_status": "Development",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T09:56:11.710Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Done",
          "transitioned_at": "2026-02-06T07:36:04.820Z"
        }
      ]
    },
    {
      "external_id": "BETA-045",
      "title": "Ticket 045",
      "ticket_type": "task",
      "created_at": "2025-10-16T09:46:01.886Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-06T07:31:25.044Z"
        }
      ]
    },
    {
      "external_id": "BETA-046",
      "title": "Ticket 046",
      "ticket_type": "task",
      "created_at": "2025-08-19T11:44:58.182Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-19T11:44:58.727Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Concept",
          "transitioned_at": "2025-09-01T08:58:31.903Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Development",
          "transitioned_at": "2025-09-09T09:03:49.299Z"
        },
        {
          "from_status": "Development",
          "to_status": "Concept",
          "transitioned_at": "2025-09-11T08:12:57.825Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Concept Onhold",
          "transitioned_at": "2025-09-29T09:01:15.724Z"
        },
        {
          "from_status": "Concept Onhold",
          "to_status": "Up Next",
          "transitioned_at": "2025-10-13T08:52:46.879Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-10-14T07:17:59.926Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Backlog Onhold",
          "transitioned_at": "2025-10-14T08:58:12.287Z"
        },
        {
          "from_status": "Backlog Onhold",
          "to_status": "Backlog",
          "transitioned_at": "2025-10-22T15:20:25.633Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Done",
          "transitioned_at": "2026-02-06T07:30:04.197Z"
        }
      ]
    },
    {
      "external_id": "BETA-047",
      "title": "Ticket 047",
      "ticket_type": "task",
      "created_at": "2025-10-28T16:04:27.861Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Backlog Onhold",
          "transitioned_at": "2025-10-28T16:04:35.674Z"
        },
        {
          "from_status": "Backlog Onhold",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T12:10:22.740Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-06T07:28:44.182Z"
        }
      ]
    },
    {
      "external_id": "BETA-048",
      "title": "Ticket 048",
      "ticket_type": "task",
      "created_at": "2025-07-07T10:36:47.515Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-05T08:21:59.259Z"
        }
      ]
    },
    {
      "external_id": "BETA-049",
      "title": "Ticket 049",
      "ticket_type": "task",
      "created_at": "2026-02-03T12:02:41.176Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-02-03T12:02:42.669Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-03T13:38:28.787Z"
        }
      ]
    },
    {
      "external_id": "BETA-050",
      "title": "Ticket 050",
      "ticket_type": "task",
      "created_at": "2025-12-11T10:53:01.495Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-11T11:07:40.657Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-02T11:51:34.510Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-20T11:55:23.555Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-22T08:41:37.851Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-22T09:40:35.642Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-27T11:53:56.907Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-29T15:23:34.774Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-02-02T11:00:11.730Z"
        }
      ]
    },
    {
      "external_id": "BETA-051",
      "title": "Ticket 051",
      "ticket_type": "task",
      "created_at": "2026-01-21T19:04:32.002Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-22T07:43:09.111Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-26T09:39:33.219Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-26T10:17:31.353Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-26T15:45:22.584Z"
        },
        {
          "from_status": "Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-26T15:49:44.285Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-26T16:27:00.449Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-27T09:21:46.999Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-30T11:26:28.302Z"
        }
      ]
    },
    {
      "external_id": "BETA-052",
      "title": "Ticket 052",
      "ticket_type": "task",
      "created_at": "2026-01-21T07:40:00.869Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-21T07:40:01.880Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-21T09:42:26.878Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-21T12:53:31.800Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-22T09:40:57.312Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-26T16:27:07.030Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-28T16:11:01.164Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-30T11:26:23.335Z"
        }
      ]
    },
    {
      "external_id": "BETA-053",
      "title": "Ticket 053",
      "ticket_type": "task",
      "created_at": "2025-12-07T10:00:11.964Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-07T10:00:14.281Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-08T10:05:23.075Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-08T10:10:33.448Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-08T11:33:20.974Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-12T10:06:16.194Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-01-15T11:34:17.385Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-19T08:00:15.869Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-20T09:29:37.510Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-20T09:29:39.948Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-26T15:44:06.905Z"
        }
      ]
    },
    {
      "external_id": "BETA-054",
      "title": "Ticket 054",
      "ticket_type": "task",
      "created_at": "2025-05-22T06:56:49.031Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-22T06:56:49.793Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:21.563Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-12T11:35:08.737Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-12-15T10:37:19.691Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-15T11:42:54.470Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-16T08:11:23.472Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2025-12-16T10:20:30.325Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-08T09:25:31.405Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-21T09:56:14.531Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-26T15:42:44.417Z"
        }
      ]
    },
    {
      "external_id": "BETA-055",
      "title": "Ticket 055",
      "ticket_type": "task",
      "created_at": "2025-12-16T17:56:30.200Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-17T06:08:25.085Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-18T10:25:51.138Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2025-12-18T12:39:50.501Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-06T17:02:20.067Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-08T14:01:11.497Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-01-08T14:46:26.514Z"
        },
        {
          "from_status": "Development",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-08T15:17:19.083Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-08T17:11:21.135Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-13T09:28:11.697Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-26T15:37:15.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-056",
      "title": "Ticket 056",
      "ticket_type": "task",
      "created_at": "2026-01-16T20:46:40.893Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-18T10:32:16.883Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Development",
          "transitioned_at": "2026-01-19T08:22:12.860Z"
        },
        {
          "from_status": "Development",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-19T08:36:04.767Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2026-01-19T08:58:18.254Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-19T08:58:23.138Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-20T11:04:26.995Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-21T10:20:39.156Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-26T15:37:05.906Z"
        }
      ]
    },
    {
      "external_id": "BETA-057",
      "title": "Ticket 057",
      "ticket_type": "task",
      "created_at": "2025-10-19T10:07:27.741Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-10-19T10:08:22.744Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-13T10:59:38.955Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-11-13T10:59:44.917Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-11-14T11:47:41.136Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-11-14T12:17:53.025Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-11-18T08:21:32.006Z"
        },
        {
          "from_status": "Development",
          "to_status": "Preparation",
          "transitioned_at": "2025-11-18T08:57:15.985Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-05T09:48:11.177Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-05T11:44:09.856Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-07T20:35:24.809Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-08T11:43:59.954Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2025-12-10T11:51:39.850Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-21T10:21:43.423Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-26T15:37:04.776Z"
        }
      ]
    },
    {
      "external_id": "BETA-058",
      "title": "Ticket 058",
      "ticket_type": "task",
      "created_at": "2026-01-13T11:20:41.521Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-13T11:20:42.110Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Development",
          "transitioned_at": "2026-01-16T09:21:09.908Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-19T08:09:03.072Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Done",
          "transitioned_at": "2026-01-26T09:26:15.050Z"
        }
      ]
    },
    {
      "external_id": "BETA-059",
      "title": "Ticket 059",
      "ticket_type": "story",
      "created_at": "2026-01-02T14:35:00.812Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-02T14:35:01.430Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-05T11:23:55.529Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Backlog",
          "transitioned_at": "2026-01-05T11:31:22.712Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-01-21T10:47:15.609Z"
        }
      ]
    },
    {
      "external_id": "BETA-060",
      "title": "Ticket 060",
      "ticket_type": "task",
      "created_at": "2025-06-29T08:45:57.422Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-29T08:45:58.302Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:22.081Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-12T11:36:22.921Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-16T13:24:46.740Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-16T15:26:26.373Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-16T15:41:39.853Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2025-12-19T09:40:04.998Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2025-12-22T08:20:05.522Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Development",
          "transitioned_at": "2026-01-08T15:17:11.758Z"
        },
        {
          "from_status": "Development",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-08T17:09:34.813Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-21T10:19:38.829Z"
        }
      ]
    },
    {
      "external_id": "BETA-061",
      "title": "Ticket 061",
      "ticket_type": "task",
      "created_at": "2026-01-08T07:19:57.794Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-08T07:20:00.160Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-08T14:44:40.267Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-01-08T15:05:08.694Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-08T17:25:48.751Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-09T08:52:44.464Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-21T10:19:29.180Z"
        }
      ]
    },
    {
      "external_id": "BETA-062",
      "title": "Ticket 062",
      "ticket_type": "task",
      "created_at": "2026-01-08T09:23:46.081Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-08T09:23:46.910Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-08T09:26:17.547Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-01-08T10:20:24.382Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-08T15:00:21.791Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-09T08:52:20.742Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-21T10:18:42.079Z"
        }
      ]
    },
    {
      "external_id": "BETA-063",
      "title": "Ticket 063",
      "ticket_type": "task",
      "created_at": "2025-12-11T10:42:44.973Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-15T12:20:52.381Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-18T11:03:51.757Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-18T12:43:15.957Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-29T11:07:13.491Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-08T10:31:01.981Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-12T15:13:42.069Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-20T17:01:11.890Z"
        }
      ]
    },
    {
      "external_id": "BETA-064",
      "title": "Ticket 064",
      "ticket_type": "task",
      "created_at": "2026-01-13T11:07:14.354Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-13T11:07:15.233Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Development",
          "transitioned_at": "2026-01-19T14:59:40.311Z"
        },
        {
          "from_status": "Development",
          "to_status": "Done",
          "transitioned_at": "2026-01-20T10:34:56.840Z"
        }
      ]
    },
    {
      "external_id": "BETA-065",
      "title": "Ticket 065",
      "ticket_type": "task",
      "created_at": "2025-05-21T12:04:23.678Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-21T12:04:24.486Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Concept",
          "transitioned_at": "2025-09-04T14:07:06.967Z"
        },
        {
          "from_status": "Concept",
          "to_status": "Development",
          "transitioned_at": "2025-09-04T14:23:43.706Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2025-09-09T09:12:06.992Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Up Next",
          "transitioned_at": "2025-10-21T10:45:25.797Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-13T10:38:18.868Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-18T10:26:10.892Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-19T10:53:55.046Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-01-19T11:09:47.486Z"
        }
      ]
    },
    {
      "external_id": "BETA-066",
      "title": "Ticket 066",
      "ticket_type": "task",
      "created_at": "2025-12-01T08:00:45.523Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-02T07:42:08.738Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-08T10:47:32.376Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-08T10:51:29.032Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-09T06:34:03.071Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2025-12-11T07:06:22.419Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2025-12-23T06:40:58.837Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-15T13:45:09.914Z"
        }
      ]
    },
    {
      "external_id": "BETA-067",
      "title": "Ticket 067",
      "ticket_type": "story",
      "created_at": "2026-01-02T14:33:49.880Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-02T14:33:50.687Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Development",
          "transitioned_at": "2026-01-05T06:34:53.175Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-05T15:17:11.764Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2026-01-07T10:02:14.972Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-15T10:50:56.173Z"
        }
      ]
    },
    {
      "external_id": "BETA-068",
      "title": "Ticket 068",
      "ticket_type": "task",
      "created_at": "2025-10-19T09:03:11.325Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Backlog Onhold",
          "transitioned_at": "2025-10-19T09:13:30.452Z"
        },
        {
          "from_status": "Backlog Onhold",
          "to_status": "Up Next",
          "transitioned_at": "2025-10-20T10:32:42.468Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-11-13T10:37:12.784Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-01T12:24:29.437Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-02T09:57:13.508Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Ready For Development",
          "transitioned_at": "2025-12-05T14:08:46.344Z"
        },
        {
          "from_status": "Ready For Development",
          "to_status": "Development",
          "transitioned_at": "2025-12-05T14:08:51.505Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2025-12-17T10:41:31.752Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Ready for Release",
          "transitioned_at": "2025-12-19T14:23:26.112Z"
        },
        {
          "from_status": "Ready for Release",
          "to_status": "Done",
          "transitioned_at": "2026-01-15T10:50:47.087Z"
        }
      ]
    },
    {
      "external_id": "BETA-069",
      "title": "Ticket 069",
      "ticket_type": "task",
      "created_at": "2026-01-12T08:36:58.376Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-12T08:36:59.226Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-12T09:20:32.725Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Done",
          "transitioned_at": "2026-01-15T09:52:17.448Z"
        }
      ]
    },
    {
      "external_id": "BETA-070",
      "title": "Ticket 070",
      "ticket_type": "task",
      "created_at": "2025-11-20T12:39:01.415Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-11-20T12:39:02.046Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-11-25T12:46:05.838Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2025-11-26T12:19:34.164Z"
        },
        {
          "from_status": "Development",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-02T10:07:31.260Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-01-08T10:37:08.883Z"
        },
        {
          "from_status": "Development",
          "to_status": "Done",
          "transitioned_at": "2026-01-13T12:54:57.556Z"
        }
      ]
    },
    {
      "external_id": "BETA-071",
      "title": "Ticket 071",
      "ticket_type": "task",
      "created_at": "2026-01-08T08:07:00.646Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-08T08:07:01.338Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-08T08:58:43.603Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Development",
          "transitioned_at": "2026-01-08T09:10:37.058Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-08T10:29:52.617Z"
        },
        {
          "from_status": "Customer Feedback",
          "to_status": "Done",
          "transitioned_at": "2026-01-08T10:32:45.175Z"
        }
      ]
    },
    {
      "external_id": "BETA-072",
      "title": "Ticket 072",
      "ticket_type": "task",
      "created_at": "2025-12-15T11:26:34.562Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-15T11:26:35.118Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2025-12-17T14:22:16.611Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "Done",
          "transitioned_at": "2026-01-07T20:08:14.805Z"
        }
      ]
    },
    {
      "external_id": "BETA-073",
      "title": "Ticket 073",
      "ticket_type": "task",
      "created_at": "2025-07-21T11:04:10.061Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-01-07T14:20:28.482Z"
        }
      ]
    },
    {
      "external_id": "BETA-074",
      "title": "Ticket 074",
      "ticket_type": "task",
      "created_at": "2025-07-24T06:13:37.454Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-24T06:13:39.707Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:25.208Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-12T11:38:02.460Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-02T12:22:30.320Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-01-07T09:52:23.393Z"
        }
      ]
    },
    {
      "external_id": "BETA-075",
      "title": "Ticket 075",
      "ticket_type": "task",
      "created_at": "2025-05-21T12:06:22.761Z",
      "transitions": [
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-21T12:06:23.589Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T11:38:19.383Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-12-12T11:32:19.142Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Preparation",
          "transitioned_at": "2026-01-02T12:20:25.254Z"
        },
        {
          "from_status": "Preparation",
          "to_status": "OBSOLET",
          "transitioned_at": "2026-01-02T13:01:37.623Z"
        }
      ]
    }
  ]
}
