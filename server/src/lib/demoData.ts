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
  "exported_at": "2026-03-28T17:41:48.008Z",
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
          "transitioned_at": "2025-08-05T01:00:18.023Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-09T14:02:08.605Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-3",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-07-07T08:10:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T10:22:25.522Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-14T08:10:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-26T08:10:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-30T08:10:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-4",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-07-04T13:12:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-04T16:17:06.629Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-07T13:12:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T01:12:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-25T13:12:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-5",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-07-16T14:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-16T18:43:11.064Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-18T14:55:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-30T14:55:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-03T14:55:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-6",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-07-10T16:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-10T19:50:19.333Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-16T16:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T22:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-31T16:04:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-7",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-07-10T16:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-10T18:06:45.722Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-15T16:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-02T16:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-08T16:26:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-8",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-07-20T16:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-20T17:57:08.711Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-25T16:25:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-04T06:49:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-04T18:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T09:15:07.562Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-28T12:00:36.518Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-9",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-07-18T09:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-18T12:56:58.813Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-21T09:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-05T09:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-10T09:58:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-10",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-07-10T15:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-10T17:11:31.116Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-16T15:19:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-23T20:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-24T08:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-06T07:59:30.225Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-11T21:39:08.893Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-11",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-07-03T13:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-03T14:08:58.173Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T13:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-26T19:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-02T13:29:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-12",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-07-23T13:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-23T15:04:52.509Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-25T13:59:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-04T07:59:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-07T13:59:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-13",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-07-05T16:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-05T18:57:16.959Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-09T16:19:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-24T16:19:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-29T16:19:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-14",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-07-03T09:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-03T10:37:13.893Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T09:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-19T21:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-24T09:41:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-15",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-07-21T15:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-21T18:58:12.142Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-23T15:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-08T09:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-13T15:26:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-16",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-08-16T09:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-16T13:19:44.587Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-21T09:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-31T21:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-04T09:23:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-17",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-07-30T12:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-30T16:38:12.353Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-05T12:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-14T12:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-17T12:40:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-18",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-08-08T15:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-08T19:26:52.900Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T15:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-26T03:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-30T15:40:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-19",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-07-27T13:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-27T17:17:41.255Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-03T13:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-11T01:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-13T13:43:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-20",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-08-06T13:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-06T16:56:48.366Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T13:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-19T07:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-21T13:42:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-21",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-08-04T10:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-04T11:34:09.238Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-09T10:08:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-20T16:08:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-24T10:08:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-22",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-08-20T08:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-20T11:07:31.071Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-24T08:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-27T13:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-28T01:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-02T13:54:59.168Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-04T22:35:41.669Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-23",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-07-29T16:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-29T20:02:14.431Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-03T16:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-15T16:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-19T16:45:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-24",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-08-02T14:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-02T18:35:05.742Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-07T14:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-10T19:28:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-11T07:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T02:35:03.057Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-18T03:55:12.939Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-25",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-08-17T10:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-17T14:17:25.367Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-24T10:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-06T04:31:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-10T10:31:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-26",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-08-11T12:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-11T16:28:42.369Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-18T12:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-01T00:32:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-05T12:32:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-27",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-08-18T10:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-18T12:33:19.554Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-22T10:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-05T16:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-10T10:52:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-28",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-08-20T12:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-20T15:27:57.247Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-25T12:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-05T00:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-08T12:16:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-29",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-08-05T08:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-05T11:20:48.194Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T08:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-28T02:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-02T08:29:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-30",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-08-01T08:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-01T11:30:55.029Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-05T08:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T14:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-20T08:07:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-31",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-08-15T13:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-15T15:36:28.001Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-22T13:54:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-28T04:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-28T16:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-07T00:18:59.536Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-11T00:19:25.051Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-32",
      "title": "Integrate webhook notifications",
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
      "external_id": "ALPHA-33",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-08-21T13:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-21T16:36:19.195Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-25T13:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-29T23:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-30T11:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-06T23:36:20.450Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-10T04:49:20.643Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-34",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-08-27T14:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-27T17:41:20.724Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-03T14:25:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-12T14:25:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-15T14:25:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-35",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-09-15T10:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-15T12:44:35.128Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T10:08:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-29T10:08:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-02T10:08:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-36",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-09-12T10:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-12T13:01:30.589Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-15T10:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-25T04:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-28T10:02:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-37",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-09-11T09:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-11T10:49:37.979Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-13T09:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-21T15:51:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-24T09:51:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-38",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-08-31T16:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-31T18:02:01.429Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-04T16:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-14T10:49:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-17T16:49:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-39",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-09-19T11:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T13:40:49.973Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T11:25:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-25T16:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-26T04:13:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-01T10:11:01.887Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-03T16:10:11.267Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-40",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-09-10T12:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T14:37:49.866Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-15T12:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-24T12:28:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-27T12:28:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-41",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-08-29T11:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-29T13:11:35.592Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-05T11:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-13T17:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-16T11:43:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-42",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-09-10T12:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T15:45:07.095Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-12T12:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-20T00:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-22T12:45:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-43",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-08-27T12:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-27T14:55:34.984Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-02T12:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-10T18:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-13T12:29:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-44",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-09-19T16:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T17:36:44.518Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-21T16:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-06T16:48:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-11T16:48:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-45",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-09-02T15:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-02T18:14:42.150Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-09T15:27:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-21T15:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-25T15:27:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-46",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-09-09T11:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-09T13:34:00.297Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-16T11:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-20T23:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-22T11:38:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-47",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-09-16T12:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-16T15:04:32.797Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-23T12:22:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-03T06:22:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-06T12:22:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-48",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-09-12T15:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-12T18:51:18.586Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-17T15:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-23T15:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-25T15:26:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-49",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-09-08T12:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-08T15:49:01.817Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-15T12:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-20T07:49:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T19:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-27T08:20:58.895Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-30T03:26:06.993Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-50",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-09-15T13:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-15T16:23:27.558Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-19T13:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-24T19:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T13:00:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-51",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-09-11T15:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-11T18:07:30.789Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-15T15:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-23T21:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T15:34:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-52",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-09-19T16:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T18:06:01.629Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-24T16:25:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-04T10:25:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-07T16:25:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-53",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-09-20T10:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-20T14:05:21.539Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-23T10:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-03T04:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-06T10:09:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-54",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-08-31T16:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-31T17:47:18.956Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-07T16:13:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T16:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-23T16:13:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-55",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-09-04T12:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-04T13:28:00.616Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-08T12:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T00:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-22T12:21:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-56",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-10-07T13:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-07T16:15:39.737Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-12T13:27:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-20T19:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-23T13:27:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-57",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-10-04T08:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-04T09:36:02.168Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-09T08:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-11T17:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-12T05:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-15T19:51:07.689Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-17T08:46:02.414Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-58",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-10-05T11:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-05T14:57:20.594Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-09T11:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-11T21:12:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-12T09:12:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-15T15:28:12.203Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-17T01:00:51.718Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-59",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-10-10T13:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-10T15:40:06.332Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-17T13:45:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-23T13:45:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-25T13:45:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-60",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-10-17T08:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-17T11:07:36.042Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-22T08:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-26T02:32:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-27T08:32:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-61",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-09-30T16:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-30T18:45:35.983Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-06T16:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-13T10:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-15T16:23:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-62",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-10-19T10:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-19T12:53:30.515Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-23T10:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-30T04:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-01T10:35:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-63",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-09-30T08:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-30T11:17:48.065Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-04T08:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T02:07:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-09T08:07:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-64",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-10-16T10:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-16T11:28:41.070Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-19T10:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-25T10:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-27T10:35:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-65",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-09-29T13:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-29T17:18:58.512Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-02T13:52:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-07T19:52:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-09T13:52:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-66",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-10-08T12:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-08T16:16:05.179Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-10T12:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-13T12:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-14T12:24:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-67",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-10-16T15:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-16T17:30:53.863Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-22T15:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-31T15:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-03T15:14:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-68",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-09-28T08:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-28T11:39:55.647Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-04T08:57:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T08:57:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-08T20:57:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-15T10:56:50.162Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T06:39:37.374Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-69",
      "title": "Resolve deep link 404 error",
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
      "external_id": "ALPHA-70",
      "title": "Implement user authentication flow",
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
      "external_id": "ALPHA-71",
      "title": "Implement role-based permissions",
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
      "external_id": "ALPHA-72",
      "title": "Implement full-text search",
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
      "external_id": "ALPHA-73",
      "title": "Build activity feed component",
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
          "transitioned_at": "2025-10-25T04:55:19.257Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-27T00:34:53.224Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-74",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-10-20T16:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-20T19:36:45.891Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-24T16:05:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-01T22:05:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-04T16:05:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-75",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-09-28T16:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-28T18:16:19.078Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-02T16:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-10T04:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-12T16:44:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-76",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-09-28T10:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-28T10:50:48.107Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-04T10:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T22:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-10T10:02:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-77",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-10-15T15:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-15T17:55:06.386Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T15:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-26T15:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-28T15:44:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-78",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-10-12T11:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-12T14:27:03.722Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-17T11:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-21T23:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-23T11:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-79",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-10-08T15:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-08T17:52:15.773Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-10T15:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-14T15:15:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-15T03:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-20T15:47:13.505Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-23T00:35:19.293Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-80",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-11-18T12:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-18T16:03:13.528Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T12:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-28T12:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-29T12:43:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-81",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-11-16T16:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-16T19:08:25.369Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-19T16:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-23T10:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-24T16:29:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-82",
      "title": "Implement data retention policy",
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
          "transitioned_at": "2025-11-21T20:10:48.230Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-23T22:08:34.615Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-83",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-11-11T15:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-11T17:46:17.760Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-15T15:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-18T01:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-18T13:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-21T21:56:34.221Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-23T08:37:57.458Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-84",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-10-31T15:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-31T19:16:14.263Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-03T15:17:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-07T09:17:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-08T15:17:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-85",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-11-19T13:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-19T14:29:46.917Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T13:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-30T01:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-01T13:23:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-86",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-11-11T09:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-11T12:20:47.473Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-17T09:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-19T19:17:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-20T07:17:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-23T17:31:10.009Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-25T04:45:48.584Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-87",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-11-05T08:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-05T11:45:18.302Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-07T08:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-11T20:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-13T08:29:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-88",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-10-30T08:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-30T11:08:54.512Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-05T08:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-08T13:37:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-09T01:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-13T15:42:36.927Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-15T14:53:35.610Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-89",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-11-09T14:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-09T16:57:39.801Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-16T14:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-19T14:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-20T14:44:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-90",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-11-06T13:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T17:09:26.210Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-13T13:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-16T13:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-17T13:16:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-91",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-11-07T13:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-07T17:06:08.574Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-13T13:59:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-17T07:59:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-18T13:59:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-92",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-11-06T13:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T14:14:01.583Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-10T13:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-16T13:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-18T13:02:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-93",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-10-25T09:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-25T13:04:36.559Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-01T09:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-05T03:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-06T09:11:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-94",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-11-09T16:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-09T20:07:54.679Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-15T16:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-18T16:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-19T16:42:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-95",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-11-18T09:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-18T11:13:46.772Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-24T09:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-27T09:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-28T09:33:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-96",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-11-21T11:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-21T12:27:24.925Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-23T11:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-26T11:49:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-27T11:49:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-97",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-10-30T08:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-30T11:58:05.070Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-02T08:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-07T14:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-09T08:11:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-98",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-11-11T12:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-11T14:50:25.045Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-18T12:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-20T12:28:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-21T00:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T09:48:59.791Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-25T20:40:51.130Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-99",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-11-05T10:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-05T12:07:43.809Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-09T10:13:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-13T22:13:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-15T10:13:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-100",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-11-01T08:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-01T10:17:07.321Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-04T08:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-08T02:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-09T08:16:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-101",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-10-31T14:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-31T17:27:43.015Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-05T14:49:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-10T20:49:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-12T14:49:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-102",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-11-06T12:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T13:48:49.286Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-10T12:08:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-14T06:08:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-15T12:08:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-103",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-11-07T15:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-07T16:27:31.402Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-11T15:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-15T09:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-16T15:39:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-104",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-11-14T13:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-14T16:09:36.398Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-20T13:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T07:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-25T13:29:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-105",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-11-15T09:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-15T12:52:28.739Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-17T09:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T03:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-26T09:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-106",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-12-01T11:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-01T15:03:04.093Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-08T11:59:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-10T02:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T14:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-12T22:22:30.854Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-13T22:22:18.363Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "ALPHA-107",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-12-19T15:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-19T19:22:08.557Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-21T15:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-23T21:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-24T15:36:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-108",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-12-04T09:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-04T10:21:06.198Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-08T09:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-12T03:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-13T09:06:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-109",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-11-28T08:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-28T08:44:15.915Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-04T08:01:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-05T22:25:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-06T10:25:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-08T09:20:02.715Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-09T05:26:29.593Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-110",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-12-21T12:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-21T13:15:55.729Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T12:28:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T12:28:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-29T12:28:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-111",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-12-16T14:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-16T16:17:05.763Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-19T14:22:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-21T02:22:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-21T14:22:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-112",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-11-26T16:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-26T18:41:05.343Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-03T16:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-06T16:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-07T16:34:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "ALPHA-113",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-12-21T13:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-21T16:21:49.679Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-24T13:25:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-27T13:25:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T13:25:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-114",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-12-19T11:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-19T13:09:11.090Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T11:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-26T11:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-27T11:23:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-115",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-12-01T15:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-01T18:40:25.557Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-03T15:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-05T21:30:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-06T15:30:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-116",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-11-30T15:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-30T19:18:24.733Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-05T15:25:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-09T09:25:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-10T15:25:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-117",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-12-21T13:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-21T15:03:32.195Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-24T13:57:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-27T13:57:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T13:57:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-118",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-12-22T16:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-22T18:39:49.238Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T16:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-27T22:32:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T16:32:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-119",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-12-01T12:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-01T15:48:34.935Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-04T12:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-07T12:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-08T12:04:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-120",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-12-10T08:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T12:00:37.208Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-12T08:17:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-15T08:17:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-16T08:17:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-121",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-12-12T09:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-12T10:35:46.354Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-19T09:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-22T09:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-23T09:56:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-122",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-12-21T14:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-21T15:48:28.573Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-24T14:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-26T20:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-27T14:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-123",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-11-28T09:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-28T10:38:27.827Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-05T09:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-07T15:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-08T09:14:00.000Z"
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
      "created_at": "2025-12-17T12:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T14:56:09.326Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T12:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-25T02:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-25T14:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-27T13:37:45.895Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T09:48:22.707Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-125",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-12-05T09:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-05T11:23:53.337Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-08T09:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-11T09:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-12T09:50:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-126",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-12-15T14:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-15T16:11:28.294Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-18T14:01:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-21T14:01:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-22T14:01:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-127",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-12-18T09:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-18T09:53:44.103Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-24T09:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T03:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-29T09:00:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-128",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-12-02T08:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-02T09:58:26.463Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-06T08:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-09T08:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-10T08:56:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-129",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-11-28T15:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-28T18:28:59.516Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-01T15:20:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-05T09:20:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-06T15:20:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-130",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-12-01T15:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-01T18:19:54.149Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-06T15:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-10T09:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-11T15:53:00.000Z"
        }
      ]
    },
    {
      "external_id": "ALPHA-131",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-12-14T12:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-14T15:28:39.724Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-16T12:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-19T12:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-20T12:40:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "ALPHA-132",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-12-04T15:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-04T15:42:54.504Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-09T15:07:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-10T19:55:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-11T07:55:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-13T05:51:26.528Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-14T01:32:46.469Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "ALPHA-133",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-12-08T16:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-08T18:30:33.096Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-14T16:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-16T22:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-17T16:40:00.000Z"
        }
      ]
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
