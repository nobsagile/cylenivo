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
  "exported_at": "2026-03-30T10:51:21.757Z",
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
  "exported_at": "2026-03-30T10:51:21.757Z",
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
          "transitioned_at": "2025-07-22T15:22:05.561Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-23T13:57:42.231Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-6",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-07-16T09:10:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-16T09:54:18.931Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-21T09:10:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-23T15:10:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-24T09:10:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-7",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-07-01T10:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-01T13:35:03.154Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-04T10:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T10:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-08T10:02:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-8",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-07-22T09:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-22T11:58:35.785Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-24T09:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T09:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-28T09:34:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-9",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-07-12T11:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-12T14:27:37.825Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-17T11:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-18T16:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-19T04:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-20T14:28:43.295Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-21T04:57:44.707Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-10",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-07-19T14:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-19T17:14:16.192Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-21T14:23:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-24T14:23:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-25T14:23:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-11",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-06-26T09:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-26T11:37:11.312Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-01T09:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-05T03:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-06T09:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-12",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-07-04T08:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-04T11:30:48.224Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-10T08:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-13T08:48:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-14T08:48:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-13",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-07-02T10:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-02T11:24:17.465Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T10:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-08T16:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-09T10:41:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-14",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-07-21T09:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-21T13:27:34.441Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-23T09:48:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T21:48:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-29T09:48:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-15",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-07-04T10:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-04T11:18:02.378Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T10:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-09T10:31:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-10T10:31:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-16",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-06-29T10:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-29T14:42:16.838Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-03T10:54:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T22:54:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-09T10:54:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-17",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-06-25T08:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-25T12:29:05.262Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-01T08:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-03T14:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-04T08:34:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-18",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-06-28T15:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-28T18:20:23.883Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-04T15:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T15:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-08T15:44:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-19",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-07-15T15:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-15T18:54:53.900Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-17T15:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T09:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-22T15:56:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-20",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-07-07T14:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T17:14:39.058Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-14T14:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-16T05:15:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-16T17:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-19T07:38:26.487Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-20T10:22:46.410Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-21",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-07-05T11:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-05T12:01:58.475Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-10T11:03:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-13T11:03:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-14T11:03:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-22",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-07-03T15:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-03T18:50:17.234Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T15:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-10T09:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-11T15:58:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-23",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-07-21T13:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-21T16:45:11.375Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-24T13:59:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T13:59:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-28T13:59:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-24",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-07-08T13:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-08T15:09:35.956Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-10T13:20:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-12T13:20:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-13T01:20:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-15T20:27:07.804Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-17T01:13:02.577Z"
        }
      ]
    },
    {
      "external_id": "BETA-25",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-07-19T13:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-19T14:14:23.142Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-23T13:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-25T19:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-26T13:24:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-26",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-06-26T09:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-26T11:40:06.884Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-03T09:57:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-05T09:57:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-05T21:57:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-08T10:39:09.557Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-09T12:40:05.082Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-27",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-06-28T09:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-28T13:45:10.398Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-02T09:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-04T00:20:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-04T12:20:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-06T15:32:33.666Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-07T13:29:22.380Z"
        }
      ]
    },
    {
      "external_id": "BETA-28",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-06-27T09:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-27T10:48:55.788Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-03T09:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-06T09:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-07T09:14:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-29",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-07-30T12:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-30T15:01:46.118Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-04T12:25:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-09T00:25:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-10T12:25:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-30",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-07-31T16:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-31T19:02:28.186Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-07T16:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-10T02:08:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-10T14:08:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-13T19:02:45.044Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-15T04:00:30.063Z"
        }
      ]
    },
    {
      "external_id": "BETA-31",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-08-20T15:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-20T17:12:05.217Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-25T15:57:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-29T09:57:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-30T15:57:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-32",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-08-09T09:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-09T11:02:18.565Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-13T09:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-20T03:31:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-22T09:31:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-33",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-08-02T12:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-02T12:38:33.445Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-04T12:08:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-08T06:08:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-09T12:08:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-34",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-08-21T14:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-21T17:13:20.690Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-25T14:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-30T02:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-31T14:00:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-35",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-07-29T09:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-29T11:12:34.442Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-02T09:35:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-08T09:35:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-10T09:35:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-36",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-07-30T12:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-30T14:28:38.282Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-02T12:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-07T18:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-09T12:18:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-37",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-08-13T13:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-13T16:42:49.108Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-18T13:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-20T13:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-21T01:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-23T22:58:20.250Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-25T04:52:54.642Z"
        }
      ]
    },
    {
      "external_id": "BETA-38",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-08-14T08:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-14T11:51:45.570Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-17T08:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-20T08:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-21T08:18:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-39",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-08-15T14:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-15T15:31:17.842Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-21T14:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-25T08:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-26T14:21:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-40",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-08-14T12:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-14T14:40:14.845Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-16T12:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T00:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-22T12:14:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-41",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-07-29T14:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-29T15:18:16.424Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-03T14:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-08T02:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-09T14:38:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-42",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-08-06T11:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-06T12:18:06.908Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T11:32:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T23:32:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-18T11:32:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-43",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-08-13T12:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-13T16:00:34.344Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-20T12:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-26T12:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-28T12:39:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-44",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-08-13T08:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-13T09:10:58.289Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-17T08:05:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T20:05:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-23T08:05:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-45",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-08-07T08:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-07T08:58:30.714Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T08:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T20:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-18T08:16:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-46",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-08-19T09:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-19T13:11:26.449Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-24T09:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-29T15:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-31T09:50:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-47",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-08-16T15:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-16T17:08:46.812Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-19T15:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-25T15:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-27T15:06:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-48",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-08-01T16:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-01T18:40:48.087Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-05T16:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-10T04:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-11T16:56:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-49",
      "title": "Migrate to structured logging",
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
      "external_id": "BETA-50",
      "title": "Add SSO provider support",
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
          "transitioned_at": "2025-08-25T16:04:35.772Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-27T02:19:51.103Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-51",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-08-05T14:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-05T16:35:04.704Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-10T14:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-15T02:51:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-16T14:51:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-52",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-07-28T09:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-28T12:46:59.077Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-02T09:19:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-07T15:19:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-09T09:19:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-53",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-08-14T12:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-14T13:07:17.164Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-20T12:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-23T12:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-24T12:14:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-54",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-07-28T11:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-28T13:14:08.532Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-04T11:44:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-09T17:44:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-11T11:44:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-55",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-09-06T15:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-06T16:07:03.376Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-10T15:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-17T09:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-19T15:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-56",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-09-21T12:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-21T13:24:51.923Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-24T12:39:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-30T12:39:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-02T12:39:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-57",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-09-10T08:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T08:44:11.973Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-12T08:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-15T08:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-16T08:09:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-58",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-09-14T09:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-14T10:19:08.707Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-19T09:15:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-26T03:15:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-28T09:15:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-59",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-09-18T13:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-18T16:21:32.672Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T13:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-24T07:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-25T13:34:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-60",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-09-05T10:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-05T12:27:36.302Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-12T10:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-20T16:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-23T10:41:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-61",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-09-10T14:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T17:43:01.666Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-17T14:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-23T14:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-25T14:43:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-62",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-09-04T14:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-04T17:54:36.748Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-11T14:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-14T19:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-15T07:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T17:02:50.312Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-21T14:19:29.018Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-63",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-09-10T14:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T14:47:10.561Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-13T14:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-18T02:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-19T14:16:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-64",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-09-13T11:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-13T14:56:09.945Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-15T11:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-22T23:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-25T11:40:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-65",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-08-28T16:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-28T19:37:38.204Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-02T16:37:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-10T22:37:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-13T16:37:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-66",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-08-29T08:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-29T11:23:22.832Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-04T08:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-14T02:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-17T08:38:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-67",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-09-16T10:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-16T13:30:13.743Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-18T10:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-27T10:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-30T10:50:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-68",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-09-18T14:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-18T15:21:11.985Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T14:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-26T04:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-26T16:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-02T21:38:58.814Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-05T13:35:58.307Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-69",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-09-11T12:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-11T16:28:04.892Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-18T12:55:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-26T18:55:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-29T12:55:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-70",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-09-14T11:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-14T12:35:14.612Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-21T11:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-25T02:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-25T14:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-01T17:33:40.011Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-04T08:46:22.872Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-71",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-08-31T09:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-31T10:39:35.309Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-04T09:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-10T09:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-12T09:29:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-72",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-09-12T11:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-12T14:35:25.981Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-19T11:03:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-23T23:03:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-25T11:03:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-73",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-09-03T11:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-03T14:37:09.144Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-07T11:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-14T05:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-16T11:09:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-74",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-09-15T10:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-15T12:41:51.084Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T10:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-28T10:51:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-30T10:51:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-75",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-09-17T16:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-17T19:22:54.338Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T16:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-27T04:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-28T16:40:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-76",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-09-15T10:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-15T11:43:31.161Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T10:27:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-25T16:27:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-27T10:27:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-77",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-09-21T08:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-21T10:13:34.748Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-25T08:54:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-30T14:54:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-02T08:54:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-78",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-09-21T12:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-21T14:27:15.395Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-25T12:31:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-30T18:31:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-02T12:31:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-79",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-10-04T09:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-04T12:30:11.664Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-07T09:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-15T15:29:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T09:29:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-80",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-10-19T14:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-19T17:37:55.282Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-21T14:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-27T14:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-29T14:02:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-81",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-10-05T10:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-05T13:27:14.047Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-11T10:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-15T10:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-15T22:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-22T23:20:46.904Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-25T23:30:32.720Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-82",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-10-23T15:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-23T18:21:25.158Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-25T15:41:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-02T03:41:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-04T15:41:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-83",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-10-16T09:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-16T11:55:25.401Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-22T09:00:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-01T03:00:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-04T09:00:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-84",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-10-12T15:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-12T18:27:22.305Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-18T15:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-26T21:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-29T15:58:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-85",
      "title": "Add real-time collaboration",
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
      "external_id": "BETA-86",
      "title": "Implement role-based permissions",
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
      "external_id": "BETA-87",
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
      "external_id": "BETA-88",
      "title": "Add weekly email digest",
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
      "external_id": "BETA-89",
      "title": "Add SSO provider support",
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
      "external_id": "BETA-90",
      "title": "Resolve save race condition",
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
      "external_id": "BETA-91",
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
      "external_id": "BETA-92",
      "title": "Integrate webhook notifications",
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
      "external_id": "BETA-93",
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
      "external_id": "BETA-94",
      "title": "Add custom field support",
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
      "external_id": "BETA-95",
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
      "external_id": "BETA-96",
      "title": "Implement user authentication flow",
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
          "transitioned_at": "2025-10-23T14:11:48.820Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-27T22:20:18.315Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-97",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-10-14T08:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-14T10:01:48.626Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-21T08:58:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-27T08:58:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-29T08:58:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-98",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-09-25T12:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-25T15:31:17.772Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-02T12:38:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-12T06:38:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-15T12:38:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-99",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-10-11T16:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-11T19:45:42.406Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-17T16:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-21T16:34:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-22T04:34:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-28T23:15:50.062Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-31T20:59:28.660Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-100",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-10-23T16:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-23T18:43:06.195Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-25T16:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-04T10:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-07T16:36:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-101",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-11-02T12:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-02T13:19:13.771Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T12:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-15T17:30:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-16T05:30:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-26T01:03:39.061Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-30T06:00:55.802Z"
        }
      ]
    },
    {
      "external_id": "BETA-102",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-11-05T09:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-05T12:02:07.857Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-09T09:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T09:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-29T09:43:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-103",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-11-16T14:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-16T15:12:37.076Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-22T14:22:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-29T19:10:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-30T07:10:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-11T13:52:48.607Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-16T09:54:00.867Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-104",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-11-02T09:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-02T12:36:58.280Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T09:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-21T03:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-25T09:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-105",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-11-17T11:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-17T12:53:10.430Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-20T11:43:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-03T05:43:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-07T11:43:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-106",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-11-11T16:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-11T20:49:44.387Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-16T16:56:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-29T10:56:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-03T16:56:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-107",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-11-19T08:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-19T09:35:28.700Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-22T08:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-29T22:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-30T10:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-13T12:34:49.924Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-19T03:06:02.749Z"
        }
      ]
    },
    {
      "external_id": "BETA-108",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-11-08T15:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T17:32:52.270Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-15T15:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-29T03:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-03T15:26:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-109",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-11-14T15:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-14T17:35:28.662Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-16T15:55:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-22T15:55:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-23T03:55:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-03T05:52:55.819Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-07T13:34:54.028Z"
        }
      ],
      "metadata": {
        "story_points": 1
      }
    },
    {
      "external_id": "BETA-110",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-11-10T10:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T12:45:58.544Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-12T10:51:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-25T22:51:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-30T10:51:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-111",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-11-10T13:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T15:32:22.956Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-12T13:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-29T19:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-05T13:36:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-112",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-10-30T14:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-30T16:40:11.776Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-06T14:29:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-14T04:53:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-14T16:53:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-27T20:55:38.352Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-03T12:22:29.075Z"
        }
      ]
    },
    {
      "external_id": "BETA-113",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-11-07T12:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-07T15:21:36.187Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-12T12:06:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-28T06:06:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-03T12:06:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-114",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-11-07T11:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-07T14:54:06.358Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-14T11:50:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T05:50:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-27T11:50:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-115",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-11-20T14:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-20T15:01:32.681Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-22T14:09:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-03T20:09:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-07T14:09:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-116",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-11-08T11:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T11:54:01.129Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-11T11:14:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T23:14:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-29T11:14:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-117",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-11-17T14:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-17T17:53:45.456Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-21T14:24:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-08T02:24:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-13T14:24:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-118",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-11-16T13:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-16T16:39:02.561Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-23T13:47:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-03T07:47:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-06T13:47:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-119",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-12-13T14:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-13T15:44:32.555Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-20T14:04:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-07T14:04:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-13T14:04:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-120",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-11-30T16:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-30T18:49:30.838Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-02T16:40:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-17T16:40:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-22T16:40:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-121",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-12-05T13:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-05T15:38:20.282Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T13:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-27T19:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-02T13:36:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-122",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-12-13T08:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-13T11:32:58.433Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-19T08:33:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-07T20:33:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-14T08:33:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-123",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-12-07T15:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-07T17:16:12.850Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-11T15:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T03:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-02T15:11:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-124",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-12-21T16:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-21T19:46:26.664Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T16:22:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-05T10:22:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-09T16:22:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 2
      }
    },
    {
      "external_id": "BETA-125",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-11-30T09:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-30T12:54:22.834Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-02T09:16:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-16T15:16:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-21T09:16:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 8
      }
    },
    {
      "external_id": "BETA-126",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-12-04T09:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-04T10:05:54.554Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-11T09:02:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-21T21:02:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-25T09:02:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-127",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-12-01T09:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-01T12:03:06.479Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-07T09:36:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-17T21:36:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-21T09:36:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-128",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-12-17T10:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T14:41:02.942Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-21T10:42:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-09T04:42:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-15T10:42:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-129",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-12-17T13:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T16:14:06.797Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-19T13:11:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-08T19:11:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-15T13:11:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-130",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-12-21T09:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-21T10:37:43.868Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T09:20:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-07T09:20:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-12T09:20:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-131",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-12-06T11:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-06T11:59:09.907Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-08T11:18:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-25T17:18:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-31T11:18:00.000Z"
        }
      ]
    },
    {
      "external_id": "BETA-132",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-12-15T11:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-15T12:56:26.993Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-18T11:26:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2026-01-03T05:26:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-08T11:26:00.000Z"
        }
      ],
      "metadata": {
        "story_points": 4
      }
    },
    {
      "external_id": "BETA-133",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-12-07T14:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-07T17:47:16.557Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-09T14:21:00.000Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-12-27T14:21:00.000Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-02T14:21:00.000Z"
        }
      ]
    }
  ]
}

export const DEMO_REALWORLD: DemoFixture = {
  "source_type": "jira",
  "project_key": "GAMMA",
  "exported_at": "2026-03-30T10:51:21.757Z",
  "tickets": [
    {
      "external_id": "GAMMA-1",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-01-02T13:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-02T15:21:02.439Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-02T16:21:02.439Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-02T16:21:02.439Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-07T15:21:02.439Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-2",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-01-10T12:12:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-10T13:20:57.567Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-10T14:20:57.567Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-10T14:20:57.567Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-10T22:51:25.817Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-3",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-01-18T08:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-18T12:10:27.715Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-18T13:10:27.715Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-18T13:10:27.715Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-25T12:10:27.715Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-4",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-01-17T11:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-17T14:43:27.757Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-17T15:43:27.757Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-17T15:43:27.757Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-17T18:06:45.546Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-5",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-01-02T15:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-02T19:13:09.846Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-02T20:13:09.846Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-02T20:13:09.846Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-08T20:22:24.500Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-09T22:10:21.304Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-14T20:54:01.956Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-6",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-01-14T12:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-14T15:22:25.350Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-14T16:22:25.350Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-14T16:22:25.350Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-20T15:22:25.350Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-7",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-01-20T13:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-20T15:01:38.972Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-20T16:01:38.972Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-20T16:01:38.972Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-24T15:01:38.972Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-8",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-01-01T14:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-01T15:44:17.874Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-01T16:44:17.874Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-01T16:44:17.874Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-08T15:44:17.874Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-9",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-01-16T11:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-16T13:38:35.980Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-16T14:38:35.980Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-16T14:38:35.980Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-21T12:54:22.620Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-23T12:02:01.831Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-26T13:12:16.223Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-10",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-01-13T08:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-13T11:06:13.202Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-13T12:06:13.202Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-13T12:06:13.202Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-13T17:41:38.338Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-11",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-01-02T08:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-02T11:51:52.350Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-12",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-01-17T10:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-17T11:26:59.648Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-17T12:26:59.648Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-17T12:26:59.648Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-25T11:26:59.648Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-13",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-01-23T12:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-23T13:24:13.197Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-23T14:24:13.197Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-23T14:24:13.197Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-04T13:24:13.197Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-14",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-01-09T10:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-09T12:52:07.794Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-15",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-01-24T10:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-24T12:22:20.415Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-24T13:22:20.415Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-24T13:22:20.415Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-30T12:22:20.415Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-16",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-01-15T12:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-15T14:44:57.253Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-15T15:44:57.253Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-15T15:44:57.253Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-24T14:44:57.253Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-17",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-01-05T09:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-05T12:41:01.709Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-05T13:41:01.709Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-05T13:41:01.709Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-10T20:45:24.938Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-11T20:49:01.929Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-15T14:56:56.726Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-18",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-01-16T15:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-16T17:05:03.198Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-16T18:05:03.198Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-16T18:05:03.198Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-19T15:13:28.052Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-20T12:37:33.789Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-27T02:34:28.700Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-19",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-01-25T08:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-25T10:12:26.027Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-25T11:12:26.027Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-25T11:12:26.027Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-04T10:12:26.027Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-20",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-01-14T12:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-14T15:35:46.059Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-14T16:35:46.059Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-14T16:35:46.059Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-23T15:35:46.059Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-21",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-01-08T15:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-08T19:14:06.468Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-22",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-01-16T08:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-16T10:03:06.123Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-16T11:03:06.123Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-16T11:03:06.123Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-23T10:03:06.123Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-23",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-01-15T13:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-15T15:39:06.580Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-15T16:39:06.580Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-15T16:39:06.580Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-25T15:39:06.580Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-24",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-01-11T14:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-11T15:49:01.566Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-11T16:49:01.566Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-11T16:49:01.566Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-17T11:51:07.092Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-18T07:51:54.034Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-22T17:24:47.615Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-25",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-01-17T13:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-17T15:09:09.985Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-17T16:09:09.985Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-17T16:09:09.985Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-25T15:09:09.985Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-26",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-01-24T15:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-24T18:51:25.888Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-24T19:51:25.888Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-24T19:51:25.888Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-29T18:51:25.888Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-27",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-01-16T14:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-16T16:00:06.866Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-16T17:00:06.866Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-16T17:00:06.866Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-16T19:45:35.836Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-28",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-01-16T13:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-16T17:56:48.065Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-16T18:56:48.065Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-16T18:56:48.065Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-22T17:56:48.065Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-29",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-01-11T16:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-11T18:12:02.760Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-11T19:12:02.760Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-11T19:12:02.760Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-19T18:12:02.760Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-30",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-01-24T10:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-24T13:46:08.618Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-24T14:46:08.618Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-24T14:46:08.618Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-30T13:46:08.618Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-31",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-01-08T12:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-08T14:53:54.712Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-08T15:53:54.712Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-08T15:53:54.712Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-15T14:53:54.712Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-32",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-01-20T14:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-20T16:29:50.555Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-20T17:29:50.555Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-20T17:29:50.555Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-22T19:39:13.790Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-24T08:13:40.429Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-27T23:50:57.911Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-33",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-01-11T15:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-11T18:31:59.617Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-11T19:31:59.617Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-11T19:31:59.617Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-16T18:31:59.617Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-34",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-01-14T13:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-14T16:20:58.395Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-14T17:20:58.395Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-14T17:20:58.395Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-21T16:20:58.395Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-35",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-01-19T10:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-19T14:52:30.319Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-19T15:52:30.319Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-19T15:52:30.319Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-26T15:09:59.138Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-27T20:52:50.226Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-30T04:44:24.768Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-36",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-01-24T13:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-24T16:50:23.474Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-24T17:50:23.474Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-24T17:50:23.474Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-28T16:50:23.474Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-37",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-01-23T09:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-23T12:45:49.480Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-23T13:45:49.480Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-23T13:45:49.480Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-31T12:45:49.480Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-38",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-01-22T09:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-22T13:49:48.064Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-22T14:49:48.064Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-22T14:49:48.064Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-28T15:15:21.002Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-30T08:14:23.286Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-01T22:15:14.963Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-39",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-01-19T13:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-19T15:29:58.989Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-19T16:29:58.989Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-19T16:29:58.989Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-29T15:29:58.989Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-40",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-01-22T11:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-01-22T12:55:57.620Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-01-22T13:55:57.620Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-01-22T13:55:57.620Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-01-29T12:55:57.620Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-41",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-02-25T15:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-25T16:50:53.909Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-25T17:50:53.909Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-25T17:50:53.909Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-25T19:42:12.709Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-42",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-02-07T15:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-07T17:32:37.263Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-07T18:32:37.263Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-07T18:32:37.263Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-16T17:32:37.263Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-43",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-02-20T09:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-20T13:35:41.114Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-20T14:35:41.114Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-20T14:35:41.114Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-23T05:44:58.452Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-24T10:45:04.232Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-01T08:00:47.423Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-44",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-02-12T16:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-12T18:26:44.334Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-12T19:26:44.334Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-12T19:26:44.334Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-12T23:04:41.683Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-45",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-02-14T13:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-14T17:22:29.557Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-14T18:22:29.557Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-14T18:22:29.557Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-19T10:23:11.130Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-20T11:18:18.143Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-24T04:36:49.608Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-46",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-02-13T12:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-13T14:12:23.938Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-13T15:12:23.938Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-13T15:12:23.938Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-20T14:12:23.938Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-47",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-02-17T11:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-17T15:16:47.887Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-48",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-02-16T16:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-16T17:55:40.866Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-16T18:55:40.866Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-16T18:55:40.866Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-25T17:55:40.866Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-49",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-02-03T08:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-03T10:07:04.694Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-03T11:07:04.694Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-03T11:07:04.694Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-10T10:07:04.694Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-50",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-02-13T08:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-13T09:48:46.393Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-13T10:48:46.393Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-13T10:48:46.393Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-04T09:48:46.393Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-51",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-02-04T14:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-04T17:32:57.292Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-04T18:32:57.292Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-04T18:32:57.292Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-12T17:32:57.292Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-52",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-02-07T12:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-07T14:22:03.593Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-07T15:22:03.593Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-07T15:22:03.593Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-18T14:22:03.593Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-53",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-02-22T15:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-22T19:16:26.707Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-22T20:16:26.707Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-22T20:16:26.707Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-25T19:16:26.707Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-54",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-02-15T15:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-15T16:06:28.460Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-15T17:06:28.460Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-15T17:06:28.460Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-26T16:06:28.460Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-55",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-02-04T12:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-04T16:44:35.649Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-04T17:44:35.649Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-04T17:44:35.649Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-05T02:32:45.200Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-56",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-02-22T10:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-22T11:52:18.877Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-22T12:52:18.877Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-22T12:52:18.877Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-04T11:52:18.877Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-57",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-02-18T16:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-18T20:31:03.438Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-18T21:31:03.438Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-18T21:31:03.438Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-21T13:04:53.293Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-22T13:39:12.518Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-25T09:37:04.399Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-58",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-02-18T13:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-18T15:52:58.037Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-18T16:52:58.037Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-18T16:52:58.037Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-25T15:52:58.037Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-59",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-02-21T12:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-21T13:30:17.389Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-21T14:30:17.389Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-21T14:30:17.389Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-21T22:34:25.777Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-60",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-02-08T13:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-08T16:36:59.861Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-08T17:36:59.861Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-08T17:36:59.861Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-05T16:36:59.861Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-61",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-02-03T16:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-03T19:20:52.830Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-03T20:20:52.830Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-03T20:20:52.830Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-13T19:20:52.830Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-62",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-02-15T15:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-15T18:07:46.671Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-15T19:07:46.671Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-15T19:07:46.671Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-21T12:43:33.243Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-22T04:37:16.150Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-26T15:32:53.908Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-63",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-02-21T13:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-21T15:26:28.668Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-21T16:26:28.668Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-21T16:26:28.668Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-27T23:32:38.567Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-01T16:42:45.499Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-05T07:23:09.840Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-64",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-02-03T12:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-03T14:20:39.776Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-03T15:20:39.776Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-03T15:20:39.776Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-10T14:20:39.776Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-65",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-02-01T12:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-01T15:11:37.850Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-01T16:11:37.850Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-01T16:11:37.850Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-09T15:11:37.850Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-66",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-02-06T08:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-06T10:14:13.550Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-06T11:14:13.550Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-06T11:14:13.550Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-14T10:14:13.550Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-67",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-02-25T12:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-25T16:14:09.660Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-25T17:14:09.660Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-25T17:14:09.660Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-02T16:14:09.660Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-68",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-02-24T08:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-24T11:51:03.607Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-24T12:51:03.607Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-24T12:51:03.607Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-07T11:51:03.607Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-69",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-02-12T14:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-12T18:10:39.058Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-12T19:10:39.058Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-12T19:10:39.058Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-20T18:10:39.058Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-70",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-02-24T09:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-24T12:07:53.170Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-24T13:07:53.170Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-24T13:07:53.170Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-05T12:07:53.170Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-71",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-02-11T08:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-11T10:39:51.720Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-11T11:39:51.720Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-11T11:39:51.720Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-18T10:39:51.720Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-72",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-02-03T15:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-03T17:40:19.563Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-03T18:40:19.563Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-03T18:40:19.563Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-12T17:40:19.563Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-73",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-02-05T12:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-05T14:46:29.099Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-05T15:46:29.099Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-05T15:46:29.099Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-14T14:46:29.099Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-74",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-02-02T09:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-02T12:36:23.496Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-02T13:36:23.496Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-02T13:36:23.496Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-07T22:23:54.240Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-09T15:39:14.978Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-11T22:02:04.049Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-75",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-02-18T16:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-18T18:01:50.308Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-18T19:01:50.308Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-18T19:01:50.308Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-24T18:01:50.308Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-76",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-02-15T08:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-15T10:06:10.163Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-15T11:06:10.163Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-15T11:06:10.163Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-22T10:06:10.163Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-77",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-02-14T15:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-14T19:05:58.249Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-14T20:05:58.249Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-14T20:05:58.249Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-21T19:05:58.249Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-78",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-02-11T12:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-11T16:01:54.933Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-11T17:01:54.933Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-11T17:01:54.933Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-18T16:01:54.933Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-79",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-02-01T16:10:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-02-01T19:06:49.218Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-01T20:06:49.218Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-01T20:06:49.218Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-02-06T01:26:37.461Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-02-06T18:00:10.117Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-02-10T09:25:25.493Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-80",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-03-17T12:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-17T13:25:23.425Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-17T14:25:23.425Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-17T14:25:23.425Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-24T13:25:23.425Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-81",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-03-03T11:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-03T14:52:55.435Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-03T15:52:55.435Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-03T15:52:55.435Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-06T05:42:08.059Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-07T10:54:30.369Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-10T14:23:16.189Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-82",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-03-15T10:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-15T12:51:50.151Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-15T13:51:50.151Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-15T13:51:50.151Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-21T12:51:50.151Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-83",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-03-08T13:10:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-08T16:07:06.755Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-08T17:07:06.755Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-08T17:07:06.755Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-16T16:07:06.755Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-84",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-03-01T12:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-01T15:27:42.912Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-01T16:27:42.912Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-01T16:27:42.912Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-05T15:27:42.912Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-85",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-03-08T16:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-08T17:59:48.709Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-08T18:59:48.709Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-08T18:59:48.709Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-17T17:59:48.709Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-86",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-03-15T08:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-15T12:19:36.014Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-15T13:19:36.014Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-15T13:19:36.014Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-22T12:19:36.014Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-87",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-03-01T08:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-01T12:16:27.175Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-01T13:16:27.175Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-01T13:16:27.175Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-11T12:16:27.175Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-88",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-03-18T11:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-18T15:35:01.647Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-18T16:35:01.647Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-18T16:35:01.647Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-30T15:35:01.647Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-89",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-03-23T08:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-23T12:11:37.945Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-23T13:11:37.945Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-23T13:11:37.945Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-30T12:11:37.945Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-90",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-03-17T16:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-17T17:11:11.032Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-17T18:11:11.032Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-17T18:11:11.032Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-26T17:11:11.032Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-91",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-03-13T10:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-13T13:26:12.919Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-13T14:26:12.919Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-13T14:26:12.919Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-22T13:26:12.919Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-92",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-03-10T09:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-10T10:40:00.795Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-93",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-03-02T16:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-02T18:28:25.087Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-02T19:28:25.087Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-02T19:28:25.087Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-11T18:28:25.087Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-94",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-03-04T16:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-04T19:15:31.947Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-04T20:15:31.947Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-04T20:15:31.947Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-11T10:05:40.453Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-12T22:14:12.528Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-18T20:50:25.419Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-95",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-03-16T11:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-16T15:08:44.995Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-16T16:08:44.995Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-16T16:08:44.995Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-20T11:47:40.422Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-22T03:55:27.765Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-26T15:13:47.613Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-96",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-03-12T16:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-12T20:05:19.355Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-12T21:05:19.355Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-12T21:05:19.355Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-16T20:05:19.355Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-97",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-03-14T08:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-14T11:08:59.534Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-14T12:08:59.534Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-14T12:08:59.534Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-22T11:08:59.534Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-98",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-03-07T12:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-07T13:33:38.763Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-07T14:33:38.763Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-07T14:33:38.763Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-17T13:33:38.763Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-99",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-03-10T11:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-10T14:13:26.686Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-10T15:13:26.686Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-10T15:13:26.686Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-13T03:38:58.482Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-14T02:43:57.435Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-21T01:12:08.786Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-100",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-03-15T14:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-15T16:14:44.575Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-15T17:14:44.575Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-15T17:14:44.575Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-20T16:14:44.575Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-101",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-03-07T10:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-07T11:22:16.859Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-07T12:22:16.859Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-07T12:22:16.859Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-15T11:22:16.859Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-102",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-03-18T15:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-18T16:07:55.054Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-18T17:07:55.054Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-18T17:07:55.054Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-23T06:15:21.089Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-24T22:53:18.202Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-27T22:54:35.043Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-103",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-03-01T12:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-01T13:41:37.225Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-01T14:41:37.225Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-01T14:41:37.225Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-06T13:41:37.225Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-104",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-03-13T09:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-13T10:33:37.781Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-13T11:33:37.781Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-13T11:33:37.781Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-23T10:33:37.781Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-105",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-03-08T15:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-08T17:43:57.025Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-08T18:43:57.025Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-08T18:43:57.025Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-11T22:36:30.887Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-12T14:37:29.536Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-19T15:43:32.986Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-106",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-03-02T16:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-02T19:59:46.359Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-02T20:59:46.359Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-02T20:59:46.359Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-22T19:59:46.359Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-107",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-03-05T13:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-05T16:23:53.347Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-05T17:23:53.347Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-05T17:23:53.347Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-12T16:23:53.347Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-108",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-03-23T14:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-23T16:12:32.717Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-23T17:12:32.717Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-23T17:12:32.717Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-30T16:12:32.717Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-109",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-03-04T12:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-04T15:09:34.315Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-04T16:09:34.315Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-04T16:09:34.315Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-12T15:09:34.315Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-110",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-03-16T08:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-16T09:52:12.754Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-16T10:52:12.754Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-16T10:52:12.754Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-24T09:52:12.754Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-111",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-03-19T08:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-19T10:49:18.282Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-19T11:49:18.282Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-19T11:49:18.282Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-26T10:49:18.282Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-112",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-03-19T14:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-19T16:32:42.384Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-19T17:32:42.384Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-19T17:32:42.384Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-23T04:03:53.657Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-23T19:24:36.586Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-29T22:40:33.725Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-113",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-03-05T10:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-05T13:25:21.091Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-05T14:25:21.091Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-05T14:25:21.091Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-13T13:25:21.091Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-114",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-03-22T10:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-03-22T13:04:40.433Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-03-22T14:04:40.433Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-03-22T14:04:40.433Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-03-30T13:04:40.433Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-115",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-04-08T12:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-08T14:41:27.222Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-08T15:41:27.222Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-08T15:41:27.222Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-11T07:21:27.222Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-13T23:01:27.222Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-16T14:41:27.222Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-116",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-04-08T12:26:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-08T15:05:44.510Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-08T16:05:44.510Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-08T16:05:44.510Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-08T18:36:03.941Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-08T21:06:23.373Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-117",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-04-20T15:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-20T17:25:37.886Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-20T18:25:37.886Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-20T18:25:37.886Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-24T05:55:37.886Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-27T17:25:37.886Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-118",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-04-22T11:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-22T15:38:10.760Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-22T16:38:10.760Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-22T16:38:10.760Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-25T16:18:10.760Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-28T15:58:10.760Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-01T15:38:10.760Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-119",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-04-15T15:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-15T19:09:54.444Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-15T20:09:54.444Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-15T20:09:54.444Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-20T07:39:54.444Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-26T01:20:06.904Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-27T10:03:52.952Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-28T10:03:52.952Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-120",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-04-08T13:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-08T15:06:25.522Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-08T16:06:25.522Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-08T16:06:25.522Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-11T15:46:25.522Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-14T15:26:25.522Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-17T15:06:25.522Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-121",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-04-14T15:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-14T19:04:37.862Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-14T20:04:37.862Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-14T20:04:37.862Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-19T19:34:37.862Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-24T19:04:37.862Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-122",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-04-22T12:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-22T15:16:06.682Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-22T16:16:06.682Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-22T16:16:06.682Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-22T18:37:09.779Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-22T20:58:12.876Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-22T23:19:15.973Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-123",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-04-23T11:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-23T13:54:38.655Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-23T14:54:38.655Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-23T14:54:38.655Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-26T06:34:38.655Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-04-28T12:38:38.655Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-28T19:50:38.655Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-28T22:14:38.655Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-01T13:54:38.655Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-124",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-04-12T15:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-12T18:39:39.951Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-12T19:39:39.951Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-12T19:39:39.951Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-17T19:09:39.951Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-24T13:08:22.510Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-26T02:52:44.199Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-27T02:52:44.199Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-125",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-04-17T09:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-17T13:24:07.032Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-126",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-04-11T10:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-11T12:13:01.065Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-11T13:13:01.065Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-11T13:13:01.065Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-11T13:38:17.457Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-11T14:03:33.849Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-11T14:28:50.241Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-127",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-04-07T12:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-07T13:39:21.373Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-07T14:39:21.373Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-07T14:39:21.373Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-11T06:19:21.373Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-14T21:59:21.373Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-18T13:39:21.373Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-128",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-04-18T09:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-18T12:38:38.053Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-18T13:38:38.053Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-18T13:38:38.053Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-18T14:11:39.163Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-18T14:44:40.273Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-18T15:17:41.383Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-129",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-04-24T11:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-24T14:12:12.253Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-24T15:12:12.253Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-24T15:12:12.253Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-27T06:52:12.253Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-29T22:32:12.253Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-02T14:12:12.253Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-130",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-04-11T15:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-11T17:13:22.355Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-11T18:13:22.355Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-11T18:13:22.355Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-15T05:43:22.355Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-18T17:13:22.355Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-131",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-04-08T13:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-08T15:22:00.987Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-08T16:22:00.987Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-08T16:22:00.987Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-15T15:22:00.987Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-132",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-04-08T11:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-08T13:10:47.571Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-08T14:10:47.571Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-08T14:10:47.571Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-08T15:11:44.303Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-08T16:12:41.036Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-133",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-04-21T10:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-21T13:43:45.137Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-21T14:43:45.137Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-21T14:43:45.137Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-23T22:23:45.137Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-26T06:03:45.137Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-28T13:43:45.137Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-134",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-04-11T16:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-11T18:20:57.569Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-11T19:20:57.569Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-11T19:20:57.569Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-26T18:50:57.569Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-10T18:20:57.569Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-135",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-04-22T09:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-22T13:15:37.952Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-22T14:15:37.952Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-22T14:15:37.952Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-24T13:55:37.952Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-26T13:35:37.952Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-28T13:15:37.952Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-136",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-04-04T08:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-04T11:59:25.162Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-04T12:59:25.162Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-04T12:59:25.162Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-04T15:51:15.395Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-04T18:43:05.629Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-04T21:34:55.863Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-137",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-04-22T08:16:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-22T10:02:47.209Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-22T11:02:47.209Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-22T11:02:47.209Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-26T22:32:47.209Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-01T07:10:58.022Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-02T00:12:25.436Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-03T00:12:25.436Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-138",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-04-02T08:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-02T11:34:49.794Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-02T12:34:49.794Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-02T12:34:49.794Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-07T00:04:49.794Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-11T11:34:49.794Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-139",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-04-21T09:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-21T13:29:17.644Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-21T14:29:17.644Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-21T14:29:17.644Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-24T06:09:17.644Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-26T21:49:17.644Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-30T06:51:59.199Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-02T06:37:36.755Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-03T06:37:36.755Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-140",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-04-09T13:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-09T16:58:56.189Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-09T17:58:56.189Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-09T17:58:56.189Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-18T16:58:56.189Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-141",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-04-02T11:10:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-02T12:24:54.556Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-02T13:24:54.556Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-02T13:24:54.556Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-09T00:54:54.556Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-15T12:24:54.556Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-142",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-04-18T13:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-18T14:05:02.430Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-18T15:05:02.430Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-18T15:05:02.430Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-23T14:35:02.430Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-29T07:12:13.199Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-29T20:39:46.090Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-30T20:39:46.090Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-143",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-04-10T15:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-10T18:11:13.271Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-10T19:11:13.271Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-10T19:11:13.271Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-04-16T09:05:13.271Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-16T16:17:13.271Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-16T18:41:13.271Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-22T18:11:13.271Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-144",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-04-07T11:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-07T13:38:31.505Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-07T14:38:31.505Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-07T14:38:31.505Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-11T02:08:31.505Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-14T13:38:31.505Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-145",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-04-03T09:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-03T10:58:17.483Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-03T11:58:17.483Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-03T11:58:17.483Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-06T11:38:17.483Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-04-09T01:42:17.483Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-09T08:54:17.483Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-09T11:18:17.483Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-12T10:58:17.483Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-146",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-04-13T09:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-13T13:48:49.098Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-13T14:48:49.098Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-13T14:48:49.098Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-16T22:28:49.098Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-20T06:08:49.098Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-23T13:48:49.098Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-147",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-04-20T11:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-20T13:41:28.112Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-20T14:41:28.112Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-20T14:41:28.112Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-22T14:21:28.112Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-24T14:01:28.112Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-26T13:41:28.112Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-148",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-04-16T11:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-16T15:00:28.023Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-16T16:00:28.023Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-16T16:00:28.023Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-16T18:21:55.519Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-16T20:43:23.015Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-16T23:04:50.512Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-149",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-04-05T08:12:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-05T09:48:31.262Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-05T10:48:31.262Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-05T10:48:31.262Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-08T10:18:31.262Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-11T09:48:31.262Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-150",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-04-10T09:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-10T11:37:17.200Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-10T12:37:17.200Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-10T12:37:17.200Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-15T00:07:17.200Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-21T00:29:14.508Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-04-21T17:46:11.521Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-22T17:46:11.521Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-151",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-04-23T08:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-04-23T12:01:10.348Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-04-23T13:01:10.348Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-04-23T13:01:10.348Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-04-24T20:41:10.348Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-04-26T04:21:10.348Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-04-27T12:01:10.348Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-152",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-05-18T15:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-18T17:43:33.443Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-18T18:43:33.443Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-18T18:43:33.443Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-21T10:23:33.443Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-24T02:03:33.443Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-26T17:43:33.443Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-153",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-05-25T15:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-25T17:32:46.198Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-25T18:32:46.198Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-25T18:32:46.198Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-28T10:12:46.198Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-31T01:52:46.198Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-02T17:32:46.198Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-154",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-05-01T12:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-01T16:06:55.324Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-01T17:06:55.324Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-01T17:06:55.324Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-04T00:46:55.324Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-06T08:26:55.324Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-10T09:33:45.381Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-11T00:55:43.064Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-12T00:55:43.064Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-155",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-05-21T10:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-21T12:40:37.257Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-21T13:40:37.257Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-21T13:40:37.257Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-21T16:31:40.870Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-156",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-05-11T12:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-11T15:24:02.169Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-11T16:24:02.169Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-11T16:24:02.169Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-29T08:04:02.169Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T23:44:02.169Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-04T15:24:02.169Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-157",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-05-13T12:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-13T14:39:20.512Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-13T15:39:20.512Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-13T15:39:20.512Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-13T18:27:09.730Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-13T21:14:58.949Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-14T00:02:48.168Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-158",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-05-18T13:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-18T16:34:09.999Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-18T17:34:09.999Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-18T17:34:09.999Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-20T17:14:09.999Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-22T16:54:09.999Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-24T16:34:09.999Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-159",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-05-10T08:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-10T12:04:06.685Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-10T13:04:06.685Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-10T13:04:06.685Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-13T04:44:06.685Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-15T20:24:06.685Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-19T00:26:27.733Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-20T07:50:58.948Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-21T07:50:58.948Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-160",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-05-11T09:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-11T12:30:25.619Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-11T13:30:25.619Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-11T13:30:25.619Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-15T13:00:25.619Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-19T12:30:25.619Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-161",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-05-15T13:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-15T16:38:44.922Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-15T17:38:44.922Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-15T17:38:44.922Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-20T05:08:44.922Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-24T16:38:44.922Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-162",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-05-04T10:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-04T12:10:33.238Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-04T13:10:33.238Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-04T13:10:33.238Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-06T12:40:33.238Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-08T12:10:33.238Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-163",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-05-03T14:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-03T17:25:25.002Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-03T18:25:25.002Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-03T18:25:25.002Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-07T05:55:25.002Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-10T17:25:25.002Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-164",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-05-04T13:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-04T15:05:27.019Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-04T16:05:27.019Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-04T16:05:27.019Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-05-08T05:59:27.019Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-08T13:11:27.019Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-08T15:35:27.019Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-11T22:08:25.264Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-13T10:36:36.886Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-14T16:58:46.104Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-165",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-05-10T11:10:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-10T13:52:17.521Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-10T14:52:17.521Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-10T14:52:17.521Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-10T18:46:36.116Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-10T22:40:54.712Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-166",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-05-13T13:10:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-13T15:58:19.083Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-13T16:58:19.083Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-13T16:58:19.083Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-16T08:38:19.083Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-19T00:18:19.083Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-21T15:58:19.083Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-167",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-05-20T11:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-20T14:19:41.802Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-20T15:19:41.802Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-20T15:19:41.802Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-11T06:59:41.802Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-31T22:39:41.802Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-22T14:19:41.802Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-168",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-05-13T09:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-13T10:52:35.324Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-13T11:52:35.324Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-13T11:52:35.324Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-16T19:32:35.324Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-20T03:12:35.324Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-23T10:52:35.324Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-169",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-05-21T14:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-21T16:19:59.930Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-21T17:19:59.930Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-21T17:19:59.930Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-26T04:49:59.930Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-29T22:49:07.574Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-31T18:11:03.017Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-01T18:11:03.017Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-170",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-05-19T10:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-19T12:39:23.150Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-19T13:39:23.150Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-19T13:39:23.150Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-22T13:09:23.150Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-25T19:44:26.651Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-26T16:21:28.441Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-27T16:21:28.441Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-171",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-05-10T13:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-10T15:22:25.476Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-10T16:22:25.476Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-10T16:22:25.476Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-13T00:02:25.476Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-15T07:42:25.476Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-17T15:22:25.476Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-172",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-05-04T11:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-04T12:49:49.570Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-04T13:49:49.570Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-04T13:49:49.570Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-07T13:29:49.570Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-10T13:09:49.570Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-13T12:49:49.570Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-173",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-05-06T15:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-06T19:27:29.638Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-06T20:27:29.638Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-06T20:27:29.638Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-11T05:48:34.478Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-12T11:43:31.854Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-15T19:12:05.536Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-174",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-05-13T14:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-13T17:20:32.014Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-13T18:20:32.014Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-13T18:20:32.014Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-18T05:50:32.014Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-22T17:20:32.014Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-175",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-05-17T12:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-17T14:34:39.014Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-17T15:34:39.014Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-17T15:34:39.014Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-20T07:14:39.014Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-22T22:54:39.014Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-25T14:34:39.014Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-176",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-05-02T10:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-02T12:34:05.543Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-02T13:34:05.543Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-02T13:34:05.543Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-09T12:34:05.543Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-177",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-05-10T11:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-10T14:59:42.899Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-10T15:59:42.899Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-10T15:59:42.899Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-13T07:39:42.899Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-15T23:19:42.899Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-19T20:54:40.654Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-20T13:52:53.982Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-21T13:52:53.982Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-178",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-05-12T12:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-12T13:33:20.147Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-12T14:33:20.147Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-12T14:33:20.147Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-14T14:13:20.147Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-16T13:53:20.147Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-18T13:33:20.147Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-179",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-05-13T14:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-13T17:29:43.996Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-13T18:29:43.996Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-13T18:29:43.996Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-13T23:26:44.600Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-14T04:23:45.204Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-180",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-05-18T15:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-18T18:42:50.381Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-18T19:42:50.381Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-18T19:42:50.381Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-21T03:22:50.381Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-23T11:02:50.381Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-25T18:42:50.381Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-181",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-05-21T09:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-21T10:43:34.005Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-21T11:43:34.005Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-21T11:43:34.005Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-26T11:13:34.005Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-31T16:35:21.742Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-02T09:24:44.730Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-03T09:24:44.730Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-182",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-05-20T14:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-20T17:41:28.096Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-20T18:41:28.096Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-20T18:41:28.096Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-24T02:21:28.096Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-27T10:01:28.096Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-30T17:41:28.096Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-183",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-05-14T10:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-14T13:48:55.900Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-14T14:48:55.900Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-14T14:48:55.900Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-14T19:06:40.801Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-14T23:24:25.703Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-184",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-05-01T16:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-01T19:38:23.505Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-185",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-05-21T16:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-21T18:23:15.479Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-21T19:23:15.479Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-05-21T19:23:15.479Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-21T21:46:30.412Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-186",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-05-13T16:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-13T18:31:51.952Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-13T19:31:51.952Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-13T19:31:51.952Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-16T11:11:51.952Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-19T02:51:51.952Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-21T18:31:51.952Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-187",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-05-10T08:12:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-05-10T11:25:35.906Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-05-10T12:25:35.906Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-05-10T12:25:35.906Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-05-14T20:05:35.906Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-05-19T03:45:35.906Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-05-23T11:25:35.906Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-188",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-06-01T13:10:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-01T15:59:02.793Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-01T16:59:02.793Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-01T16:59:02.793Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-03T16:39:02.793Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-05T16:19:02.793Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-07T15:59:02.793Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-189",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-06-03T08:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-03T11:43:58.513Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-03T12:43:58.513Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-03T12:43:58.513Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-05T16:00:16.535Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-06T04:32:02.492Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-10T06:26:54.283Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-190",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-06-05T16:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-05T19:17:52.645Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-05T20:17:52.645Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-05T20:17:52.645Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-09T07:47:52.645Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-12T19:17:52.645Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-191",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-06-10T11:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-10T14:01:16.331Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-10T15:01:16.331Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-10T15:01:16.331Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-11T14:41:16.331Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-12T14:21:16.331Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-13T14:01:16.331Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-192",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-06-11T13:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-11T15:31:24.635Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-193",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-06-14T12:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-14T16:12:44.405Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-14T17:12:44.405Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-14T17:12:44.405Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-18T00:52:44.405Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-21T08:32:44.405Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-24T16:12:44.405Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-194",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-06-16T14:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-16T18:16:12.620Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-16T19:16:12.620Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-16T19:16:12.620Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-19T18:46:12.620Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-22T22:09:29.261Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-24T05:56:51.946Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-25T05:56:51.946Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-195",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-06-23T15:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-23T17:28:43.074Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-196",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-06-23T08:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-23T09:44:31.369Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-197",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-06-07T16:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-07T18:09:14.354Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-07T19:09:14.354Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-07T19:09:14.354Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-07T21:26:42.069Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-07T23:44:09.784Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-08T02:01:37.499Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-198",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-06-18T12:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-18T14:24:58.643Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-18T15:24:58.643Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-18T15:24:58.643Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-06-22T17:18:58.643Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-23T00:30:58.643Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-23T02:54:58.643Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-27T14:24:58.643Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-199",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-06-05T15:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-05T18:43:12.459Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-05T19:43:12.459Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-05T19:43:12.459Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-07T19:23:12.459Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-06-09T09:27:12.459Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-09T16:39:12.459Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-09T19:03:12.459Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-11T18:43:12.459Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-200",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-06-21T09:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-21T11:53:59.780Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-201",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-06-13T12:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-13T15:01:33.856Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-13T16:01:33.856Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-13T16:01:33.856Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-15T07:41:33.856Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-16T23:21:33.856Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-18T15:01:33.856Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-202",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-06-24T15:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-24T16:48:31.598Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-24T17:48:31.598Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-24T17:48:31.598Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-27T09:28:31.598Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-30T01:08:31.598Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-02T16:48:31.598Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-203",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-06-11T16:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-11T18:59:45.408Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-11T19:59:45.408Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-11T19:59:45.408Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-18T01:20:21.992Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-19T03:13:52.206Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-22T22:53:46.228Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-204",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-06-13T14:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-13T18:17:16.690Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-13T19:17:16.690Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-13T19:17:16.690Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-19T18:47:16.690Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-25T18:17:16.690Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-205",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-06-01T15:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-01T18:51:18.817Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-01T19:51:18.817Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-01T19:51:18.817Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-03T22:30:14.380Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-04T23:52:37.348Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-08T18:49:20.845Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-206",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-06-09T14:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-09T16:20:18.792Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-09T17:20:18.792Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-09T17:20:18.792Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-11T17:00:18.792Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-13T16:40:18.792Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-15T16:20:18.792Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-207",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-06-21T08:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-21T10:53:54.687Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-21T11:53:54.687Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-21T11:53:54.687Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-27T11:23:54.687Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-05T09:54:43.710Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T03:25:35.854Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-08T03:25:35.854Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-208",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-06-04T15:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-04T16:59:34.890Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-04T17:59:34.890Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-04T17:59:34.890Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-07T09:39:34.890Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-10T01:19:34.890Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-12T16:59:34.890Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-209",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-06-13T10:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-13T14:27:07.841Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-13T15:27:07.841Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-13T15:27:07.841Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-17T14:57:07.841Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-21T14:27:07.841Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-210",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-06-12T10:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-12T12:52:48.314Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-12T13:52:48.314Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-12T13:52:48.314Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-15T05:32:48.314Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-17T21:12:48.314Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-20T12:52:48.314Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-211",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-06-18T12:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-18T14:09:57.126Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-18T15:09:57.126Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-18T15:09:57.126Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-22T06:49:57.126Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-25T22:29:57.126Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-29T14:09:57.126Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-212",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-06-24T14:11:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-24T16:43:35.848Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-24T17:43:35.848Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-06-24T17:43:35.848Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-01T16:43:35.848Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-213",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-06-12T13:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-12T15:39:56.788Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-12T16:39:56.788Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-12T16:39:56.788Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-16T04:09:56.788Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-19T15:39:56.788Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-214",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-06-25T10:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-25T14:05:45.524Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-25T15:05:45.524Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-25T15:05:45.524Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-28T06:45:45.524Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-30T22:25:45.524Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-03T14:05:45.524Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-215",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-06-02T09:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-02T10:38:53.624Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-02T11:38:53.624Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-02T11:38:53.624Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-06-07T13:32:53.624Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-07T20:44:53.624Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-07T23:08:53.624Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-13T10:38:53.624Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-216",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-06-10T13:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-10T15:41:58.914Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-10T16:41:58.914Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-10T16:41:58.914Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-14T16:21:58.914Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-18T16:01:58.914Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-22T15:41:58.914Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-217",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-06-02T12:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-02T15:50:44.604Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-02T16:50:44.604Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-02T16:50:44.604Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-06T08:30:44.604Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-10T00:10:44.604Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-13T15:50:44.604Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-218",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-06-05T14:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-05T18:46:16.320Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-05T19:46:16.320Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-05T19:46:16.320Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-08T03:26:16.320Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-10T11:06:16.320Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-12T18:46:16.320Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-219",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-06-19T11:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-19T13:39:00.608Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-19T14:39:00.608Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-19T14:39:00.608Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-23T14:09:00.608Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-27T13:39:00.608Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-220",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-06-03T13:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-06-03T15:31:24.318Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-06-03T16:31:24.318Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-06-03T16:31:24.318Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-07T00:11:24.318Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-06-09T22:15:24.318Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-10T05:27:24.318Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-10T07:51:24.318Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-06-13T12:24:30.746Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-06-14T11:43:51.181Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-06-15T11:43:51.181Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-221",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-07-13T08:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-13T11:17:39.646Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-13T12:17:39.646Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-13T12:17:39.646Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-20T11:17:39.646Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-222",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-07-14T12:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-14T14:41:03.500Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-14T15:41:03.500Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-14T15:41:03.500Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-19T03:11:03.500Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-23T14:41:03.500Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-223",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-07-05T15:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-05T16:45:19.906Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-05T17:45:19.906Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-05T17:45:19.906Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-08T09:25:19.906Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-11T01:05:19.906Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-13T16:45:19.906Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-224",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-07-07T16:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T18:41:56.766Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-07T19:41:56.766Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-07T19:41:56.766Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T22:26:35.283Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-08T01:11:13.800Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-225",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-07-06T13:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-06T15:33:28.140Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-06T16:33:28.140Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T16:33:28.140Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-09T16:13:28.140Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-12T15:53:28.140Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-15T15:33:28.140Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-226",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-07-08T12:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-08T14:02:21.732Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-08T15:02:21.732Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-08T15:02:21.732Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-12T14:32:21.732Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-16T14:02:21.732Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-227",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-07-08T11:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-08T12:44:18.576Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-08T13:44:18.576Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-08T13:44:18.576Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-10T05:24:18.576Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-11T21:04:18.576Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-13T12:44:18.576Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-228",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-07-22T11:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-22T13:53:04.756Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-22T14:53:04.756Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-22T14:53:04.756Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-25T02:23:04.756Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-27T13:53:04.756Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-229",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-07-13T13:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-13T15:04:49.109Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-13T16:04:49.109Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-13T16:04:49.109Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-18T03:34:49.109Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-22T15:04:49.109Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-230",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-07-09T16:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-09T20:39:02.951Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-231",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-07-18T08:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-18T10:09:16.550Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-18T11:09:16.550Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-18T11:09:16.550Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T10:39:16.550Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-24T10:09:16.550Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-232",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-07-02T09:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-02T10:44:23.731Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-02T11:44:23.731Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-02T11:44:23.731Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-06T23:14:23.731Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-11T10:44:23.731Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-233",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-07-22T12:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-22T13:29:22.825Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-22T14:29:22.825Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-22T14:29:22.825Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-24T06:09:22.825Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-25T21:49:22.825Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-27T19:08:37.355Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-29T01:16:59.222Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-30T01:16:59.222Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-234",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-07-21T11:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-21T13:57:43.740Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-21T14:57:43.740Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-21T14:57:43.740Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-25T14:27:43.740Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-29T22:25:24.269Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-30T22:07:58.355Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-31T22:07:58.355Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-235",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-07-25T13:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-25T15:24:36.887Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-25T16:24:36.887Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-25T16:24:36.887Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T15:54:36.887Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-29T15:24:36.887Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-236",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-07-22T10:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-22T13:38:07.680Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-22T14:38:07.680Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-22T14:38:07.680Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-22T19:00:43.629Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-237",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-07-21T16:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-21T20:29:11.048Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-21T21:29:11.048Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T21:29:11.048Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-28T20:29:11.048Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-238",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-07-15T15:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-15T16:44:16.358Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-15T17:44:16.358Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-15T17:44:16.358Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-18T17:24:16.358Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T17:04:16.358Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-24T16:44:16.358Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-239",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-07-22T13:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-22T15:05:21.574Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-22T16:05:21.574Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-22T16:05:21.574Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T03:35:21.574Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-30T16:51:17.134Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-31T13:45:33.876Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-01T20:47:21.780Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-240",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-07-23T13:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-23T15:04:08.974Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-23T16:04:08.974Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-23T16:04:08.974Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-01T15:04:08.974Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-241",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-07-05T10:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-05T13:37:20.672Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-05T14:37:20.672Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-05T14:37:20.672Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-08T22:17:20.672Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-12T05:57:20.672Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-15T13:37:20.672Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-242",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-07-03T08:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-03T09:38:27.013Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-03T10:38:27.013Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-03T10:38:27.013Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T10:08:27.013Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-11T09:38:27.013Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-243",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-07-15T16:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-15T18:28:21.619Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-15T19:28:21.619Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-15T19:28:21.619Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-17T18:58:21.619Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-20T12:20:42.879Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-22T03:16:45.761Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-23T03:16:45.761Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-244",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-07-21T13:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-21T16:54:34.950Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-21T17:54:34.950Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-21T17:54:34.950Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-24T09:34:34.950Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-27T01:14:34.950Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-29T16:54:34.950Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-245",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-07-05T09:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-05T11:55:21.260Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-05T12:55:21.260Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-05T12:55:21.260Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-07-09T14:49:21.260Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-09T22:01:21.260Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-10T00:25:21.260Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-13T12:44:44.543Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-15T12:38:41.274Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-16T12:38:41.274Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-246",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-07-07T16:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-07T18:09:29.501Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-07T19:09:29.501Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-07T19:09:29.501Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-07T20:41:52.164Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T22:14:14.828Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-07T23:46:37.492Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-247",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-07-12T16:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-12T18:28:09.416Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-12T19:28:09.416Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-12T19:28:09.416Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-15T06:58:09.416Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-17T18:28:09.416Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-248",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-07-17T12:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-17T15:47:18.464Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-17T16:47:18.464Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-17T16:47:18.464Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-19T08:27:18.464Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-21T00:07:18.464Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-22T15:47:18.464Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-249",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-07-04T16:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-04T17:50:07.992Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-04T18:50:07.992Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-04T18:50:07.992Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-07T02:30:07.992Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-09T10:10:07.992Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-11T17:50:07.992Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-250",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-07-09T14:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-09T18:10:45.990Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-09T19:10:45.990Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-09T19:10:45.990Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-09T21:07:18.329Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-09T23:03:50.668Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-10T01:00:23.007Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-251",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-07-04T13:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-04T14:53:31.568Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-04T15:53:31.568Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-04T15:53:31.568Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-07-10T03:23:31.568Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-15T14:53:31.568Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-252",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-07-06T16:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-06T20:17:19.715Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-06T21:17:19.715Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-06T21:17:19.715Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-07T00:07:34.444Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-07-06T17:21:49.173Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-07T00:33:49.173Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-07T02:57:49.173Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-07T05:48:03.902Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-253",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-07-22T15:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-22T18:25:03.217Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-22T19:25:03.217Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-22T19:25:03.217Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-26T18:55:03.217Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-30T18:25:03.217Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-254",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-07-08T16:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-07-08T19:30:35.754Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-07-08T20:30:35.754Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-07-08T20:30:35.754Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-11T04:10:35.754Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-13T11:50:35.754Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-07-17T02:58:40.548Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-07-18T14:18:30.863Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-07-19T14:18:30.863Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-255",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-08-14T11:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-14T13:56:45.181Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-14T14:56:45.181Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T14:56:45.181Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-16T14:36:45.181Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-18T14:16:45.181Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-20T13:56:45.181Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-256",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-08-16T12:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-16T15:52:25.411Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-16T16:52:25.411Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-16T16:52:25.411Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-28T00:32:25.411Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-11-09T08:12:25.411Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-21T15:52:25.411Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-257",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-08-21T09:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-21T13:03:16.309Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-258",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-08-06T16:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-06T19:33:25.387Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-06T20:33:25.387Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-06T20:33:25.387Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-10-10T08:03:25.387Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-13T19:33:25.387Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-259",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-08-06T14:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-06T18:34:38.963Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-06T19:34:38.963Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-06T19:34:38.963Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-09T11:14:38.963Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-12T02:54:38.963Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-14T18:34:38.963Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-260",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-08-17T15:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-17T18:51:17.555Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-17T19:51:17.555Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-17T19:51:17.555Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-19T19:31:17.555Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-21T19:11:17.555Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-23T18:51:17.555Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-261",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-08-09T15:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-09T16:28:30.150Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-09T17:28:30.150Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-09T17:28:30.150Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-14T04:58:30.150Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-18T16:28:30.150Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-262",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-08-02T09:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-02T12:42:19.591Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-02T13:42:19.591Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-02T13:42:19.591Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-02T16:08:43.996Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-02T18:35:08.402Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-02T21:01:32.807Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-263",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-08-14T09:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-14T12:26:38.028Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-14T13:26:38.028Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T13:26:38.028Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T12:56:38.028Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-18T12:26:38.028Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-264",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-08-03T09:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-03T11:58:35.707Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-03T12:58:35.707Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-03T12:58:35.707Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-05T12:38:35.707Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-07T12:18:35.707Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-09T11:58:35.707Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-265",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-08-10T13:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-10T16:44:11.961Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-10T17:44:11.961Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-10T17:44:11.961Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-17T00:03:43.419Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-18T03:54:43.904Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-21T11:27:52.780Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-266",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-08-04T11:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-04T13:34:45.402Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-04T14:34:45.402Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-04T14:34:45.402Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-04T18:37:46.111Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-04T22:40:46.821Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-267",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-08-03T13:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-03T14:44:57.066Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-03T15:44:57.066Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-03T15:44:57.066Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-09T03:14:57.066Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-14T14:44:57.066Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-268",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-08-23T09:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-23T12:01:28.058Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-23T13:01:28.058Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-23T13:01:28.058Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-27T00:31:28.058Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-30T12:01:28.058Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-269",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-08-06T16:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-06T18:11:32.499Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-06T19:11:32.499Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-06T19:11:32.499Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-11T02:51:32.499Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-08-15T00:55:32.499Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-15T08:07:32.499Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-15T10:31:32.499Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-19T18:11:32.499Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-270",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-08-16T14:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-16T18:26:01.099Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-16T19:26:01.099Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-16T19:26:01.099Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-20T06:56:01.099Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-23T18:26:01.099Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-271",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-08-08T11:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-08T12:29:45.662Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-08T13:29:45.662Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-08T13:29:45.662Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-15T12:29:45.662Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-272",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-08-05T11:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-05T13:26:10.937Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-05T14:26:10.937Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-05T14:26:10.937Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-10T13:56:10.937Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-16T01:36:16.162Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-16T19:07:03.615Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-17T19:07:03.615Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-273",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-08-15T10:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-15T12:48:38.769Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-274",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-08-12T09:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-12T13:16:59.487Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-12T14:16:59.487Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-12T14:16:59.487Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-08-17T04:10:59.487Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-17T11:22:59.487Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-17T13:46:59.487Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-23T18:23:46.802Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-24T20:13:33.255Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-25T20:13:33.255Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-275",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-08-24T15:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-24T17:00:10.301Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-24T18:00:10.301Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-24T18:00:10.301Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-29T05:30:10.301Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-02T17:00:10.301Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-276",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-08-14T09:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-14T12:34:45.382Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-14T13:34:45.382Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-14T13:34:45.382Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-16T21:14:45.382Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-19T04:54:45.382Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-21T12:34:45.382Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-277",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-08-08T14:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-08T17:06:32.439Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-08T18:06:32.439Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-08T18:06:32.439Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-12T17:36:32.439Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-16T17:06:32.439Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-278",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-08-09T14:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-09T15:28:02.643Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-09T16:28:02.643Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-09T16:28:02.643Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-11T15:58:02.643Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-13T15:28:02.643Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-279",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-08-07T10:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-07T12:25:54.386Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-07T13:25:54.386Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-07T13:25:54.386Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-09T13:05:54.386Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-11T12:45:54.386Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-13T12:25:54.386Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-280",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-08-17T15:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-17T19:11:23.635Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-17T20:11:23.635Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-17T20:11:23.635Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-24T19:11:23.635Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-281",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-08-23T12:31:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-23T14:58:54.179Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-23T15:58:54.179Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-23T15:58:54.179Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-25T15:38:54.179Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-27T15:18:54.179Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-29T14:58:54.179Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-282",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-08-20T08:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-20T11:30:29.761Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-20T12:30:29.761Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-20T12:30:29.761Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-08-26T02:24:29.761Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-26T09:36:29.761Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-26T12:00:29.761Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-01T13:33:54.890Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-02T06:04:01.570Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-03T06:04:01.570Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-283",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-08-18T11:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-18T15:09:44.105Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-18T16:09:44.105Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-18T16:09:44.105Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-22T15:49:44.105Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-26T15:29:44.105Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-30T15:09:44.105Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-284",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-08-11T13:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-11T17:18:13.473Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-11T18:18:13.473Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-11T18:18:13.473Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-13T09:58:13.473Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-15T01:38:13.473Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-16T17:18:13.473Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-285",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-08-25T11:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-25T13:43:11.361Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-08-25T14:43:11.361Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-25T14:43:11.361Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-28T14:23:11.361Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-31T14:03:11.361Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-03T13:43:11.361Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-286",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-08-22T09:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-22T10:41:34.874Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-22T11:41:34.874Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-08-22T11:41:34.874Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-08-22T12:15:07.513Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-22T12:48:40.153Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-287",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-08-05T15:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-05T19:18:14.199Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-05T20:18:14.199Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-05T20:18:14.199Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-06T05:30:57.582Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-288",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-08-05T09:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-08-05T10:11:11.670Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-08-05T11:11:11.670Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-08-05T11:11:11.670Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-08-11T10:11:11.670Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-289",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-09-03T10:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-03T12:01:05.828Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-03T13:01:05.828Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-03T13:01:05.828Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-03T16:40:02.429Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-03T20:18:59.030Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-290",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-09-07T09:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-07T12:37:21.938Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-07T13:37:21.938Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-07T13:37:21.938Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-10-22T21:17:21.938Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-12-07T04:57:21.938Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-21T12:37:21.938Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-291",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-09-08T15:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-08T18:15:01.042Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-292",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-09-10T13:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T17:12:01.260Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-293",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-09-20T15:48:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-20T19:20:45.635Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T20:20:45.635Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-20T20:20:45.635Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T19:20:45.635Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-294",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-09-09T09:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-09T11:33:15.457Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-09T12:33:15.457Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-09T12:33:15.457Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-13T00:03:15.457Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-16T11:33:15.457Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-295",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-09-07T08:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-07T11:24:30.521Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-07T12:24:30.521Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-07T12:24:30.521Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-12T11:54:30.521Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-19T05:15:48.951Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T21:33:36.805Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-20T21:33:36.805Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-296",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-09-08T11:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-08T14:13:45.128Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-08T15:13:45.128Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-08T15:13:45.128Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-13T02:43:45.128Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-17T14:13:45.128Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-297",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-09-01T16:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-01T18:26:49.671Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-01T19:26:49.671Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-01T19:26:49.671Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-05T06:56:49.671Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-08T18:26:49.671Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-298",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-09-01T11:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-01T13:50:24.285Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-01T14:50:24.285Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-01T14:50:24.285Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-03T06:30:24.285Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-04T22:10:24.285Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-06T13:50:24.285Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-299",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-09-01T08:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-01T09:26:22.072Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-01T10:26:22.072Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-01T10:26:22.072Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-04T21:56:22.072Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-08T09:26:22.072Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-300",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-09-14T08:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-14T10:09:53.241Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-14T11:09:53.241Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-14T11:09:53.241Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-17T22:39:53.241Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-21T10:09:53.241Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-301",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-09-25T12:35:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-25T16:09:16.339Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-25T17:09:16.339Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-25T17:09:16.339Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-30T16:39:16.339Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-10-03T22:26:39.128Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-10-04T16:07:07.222Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-08T01:48:18.863Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-302",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-09-02T08:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-02T11:44:40.873Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-303",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-09-17T13:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-17T16:11:12.498Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-17T17:11:12.498Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-17T17:11:12.498Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-17T18:09:03.623Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-17T19:06:54.749Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-304",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-09-01T10:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-01T13:57:00.936Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-01T14:57:00.936Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-01T14:57:00.936Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-05T14:27:00.936Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-09T13:57:00.936Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-305",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-09-02T12:12:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-02T15:26:38.934Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-02T16:26:38.934Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-02T16:26:38.934Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-08T03:56:38.934Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-13T15:26:38.934Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-306",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-09-16T13:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-16T15:07:55.238Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-16T16:07:55.238Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-16T16:07:55.238Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-19T15:47:55.238Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-22T15:27:55.238Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-25T15:07:55.238Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-307",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-09-17T08:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-17T11:53:02.897Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-17T12:53:02.897Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-17T12:53:02.897Z"
        },
        {
          "from_status": "In Review",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T22:10:41.782Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-24T20:41:35.945Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-27T13:22:57.765Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-308",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-09-10T09:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T10:22:36.266Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-10T11:22:36.266Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-10T11:22:36.266Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-10T13:05:17.659Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-10T14:47:59.053Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-10T16:30:40.446Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-309",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-09-24T09:45:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-24T12:48:22.581Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-24T13:48:22.581Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-24T13:48:22.581Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-28T13:18:22.581Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-02T12:48:22.581Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-310",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-09-13T15:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-13T17:28:50.601Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-13T18:28:50.601Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-13T18:28:50.601Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-17T10:08:50.601Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-21T01:48:50.601Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-24T17:28:50.601Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-311",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-09-09T15:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-09T16:40:53.844Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-09T17:40:53.844Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-09T17:40:53.844Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-16T16:40:53.844Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-312",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-09-22T13:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-22T16:34:45.004Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-22T17:34:45.004Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-22T17:34:45.004Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-25T09:14:45.004Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-28T00:54:45.004Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-30T16:34:45.004Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-313",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-09-10T09:58:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-10T13:56:45.449Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-10T14:56:45.449Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-10T14:56:45.449Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-10T17:07:25.910Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-10T19:18:06.372Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-314",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-09-19T09:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T12:08:24.125Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-19T13:08:24.125Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-19T13:08:24.125Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-23T00:38:24.125Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-27T08:28:24.989Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-28T10:37:41.178Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-29T10:37:41.178Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-315",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-09-14T12:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-14T14:00:47.036Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-14T15:00:47.036Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-14T15:00:47.036Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "In Review",
          "transitioned_at": "2025-09-19T02:30:47.036Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-23T14:00:47.036Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-316",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-09-16T16:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-16T19:18:31.860Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-16T20:18:31.860Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-16T20:18:31.860Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-19T11:58:31.860Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review (blocked)",
          "transitioned_at": "2025-09-21T18:02:31.860Z"
        },
        {
          "from_status": "In Review (blocked)",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-22T01:14:31.860Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-22T03:38:31.860Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-27T15:49:20.135Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-29T02:32:58.856Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-30T02:32:58.856Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-317",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-09-03T11:36:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-03T12:57:45.032Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-03T13:57:45.032Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-03T13:57:45.032Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-06T05:37:45.032Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-08T21:17:45.032Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-11T12:57:45.032Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-318",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-09-20T16:43:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-20T20:22:10.380Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-20T21:22:10.380Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-20T21:22:10.380Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-23T21:02:10.380Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-26T20:42:10.380Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-29T20:22:10.380Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-319",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-09-19T10:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T12:58:17.839Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-19T13:58:17.839Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-19T13:58:17.839Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-21T01:28:17.839Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-22T12:58:17.839Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-320",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-09-08T12:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-08T13:36:21.313Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-08T14:36:21.313Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-08T14:36:21.313Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-11T06:16:21.313Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-13T21:56:21.313Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-16T13:36:21.313Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-321",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-09-03T14:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-03T18:42:53.130Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-03T19:42:53.130Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-03T19:42:53.130Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-07T11:22:53.130Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-11T03:02:53.130Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-14T18:42:53.130Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-322",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-09-11T14:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-11T17:47:35.553Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-11T18:47:35.553Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-11T18:47:35.553Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-11T19:33:09.115Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-11T20:18:42.677Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-323",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-09-21T10:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-21T12:04:39.741Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-21T13:04:39.741Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-21T13:04:39.741Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-23T20:44:39.741Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-26T04:24:39.741Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-28T12:04:39.741Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-324",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-09-15T08:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-15T10:05:33.869Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-325",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-09-19T12:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-19T15:45:37.733Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-19T16:45:37.733Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-19T16:45:37.733Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-23T04:15:37.733Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-26T15:45:37.733Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-326",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-09-06T13:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-09-06T16:02:19.717Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2025-09-06T17:02:19.717Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "In Progress",
          "transitioned_at": "2025-09-06T17:02:19.717Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-09T16:42:19.717Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-12T16:22:19.717Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for QA",
          "transitioned_at": "2025-09-17T03:12:30.129Z"
        },
        {
          "from_status": "Ready for QA",
          "to_status": "In Review",
          "transitioned_at": "2025-09-18T00:51:45.762Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-09-19T00:51:45.762Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-327",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-10-25T13:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-25T16:54:42.003Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-25T17:54:42.003Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-25T17:54:42.003Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-30T05:24:42.003Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-03T02:29:35.639Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-04T16:34:24.718Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-05T16:34:24.718Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-328",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-10-18T10:01:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-18T13:06:45.710Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-18T14:06:45.710Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-18T14:06:45.710Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-23T13:36:45.710Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-29T02:56:38.678Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-30T01:32:29.900Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-31T01:32:29.900Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-329",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-10-17T16:09:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-17T19:45:55.522Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-17T20:45:55.522Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-17T20:45:55.522Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-22T08:15:55.522Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-26T19:45:55.522Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-330",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-10-19T14:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-19T16:24:02.324Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-19T17:24:02.324Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-19T17:24:02.324Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-25T04:54:02.324Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-30T16:24:02.324Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-331",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-10-09T15:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-09T17:50:42.258Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-09T18:50:42.258Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-09T18:50:42.258Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-12T18:20:42.258Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-15T17:50:42.258Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-332",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-10-04T13:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-04T15:09:45.300Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-04T16:09:45.300Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-04T16:09:45.300Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T03:39:45.300Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-11T15:09:45.300Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-333",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-10-03T14:14:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-03T15:31:14.312Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-03T16:31:14.312Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-03T16:31:14.312Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-05T04:01:14.312Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-06T20:12:15.953Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T01:18:56.794Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-09T01:18:56.794Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-334",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-10-05T11:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-05T14:17:52.410Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-05T15:17:52.410Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-05T15:17:52.410Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T14:47:52.410Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-11T14:17:52.410Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-335",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-10-18T15:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-18T19:36:18.061Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-18T20:36:18.061Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-18T20:36:18.061Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-21T08:06:18.061Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-23T19:36:18.061Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-336",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-10-11T12:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-11T16:21:55.650Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-11T17:21:55.650Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-11T17:21:55.650Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-15T04:51:55.650Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T16:21:55.650Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-337",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-10-17T11:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-17T14:18:26.024Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-17T15:18:26.024Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-17T15:18:26.024Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-17T19:17:10.055Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-17T23:15:54.086Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-338",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-10-16T13:30:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-16T15:21:26.025Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-16T16:21:26.025Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-16T16:21:26.025Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-20T03:51:26.025Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-24T11:30:53.180Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-25T01:05:55.016Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-26T01:05:55.016Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-339",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-10-06T14:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-06T17:16:21.641Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-06T18:16:21.641Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-06T18:16:21.641Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-09T17:46:21.641Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-12T17:16:21.641Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-340",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-10-21T14:57:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-21T18:26:19.840Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-21T19:26:19.840Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-21T19:26:19.840Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-27T06:56:19.840Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-01T18:26:19.840Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-341",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-10-20T15:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-20T18:00:32.840Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T19:00:32.840Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-20T19:00:32.840Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-26T06:30:32.840Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-31T18:00:32.840Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-342",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-10-20T14:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-20T17:46:29.232Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T18:46:29.232Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-20T18:46:29.232Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-23T06:16:29.232Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-25T17:46:29.232Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-343",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-10-01T08:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-01T12:40:35.010Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-01T13:40:35.010Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-01T13:40:35.010Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-04T13:10:35.010Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-07T08:45:50.476Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T02:05:54.797Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-09T02:05:54.797Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-344",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-10-24T15:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-24T18:35:38.830Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-24T19:35:38.830Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-24T19:35:38.830Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-29T07:05:38.830Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-02T18:35:38.830Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-345",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-10-21T10:41:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-21T13:47:58.820Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-21T14:47:58.820Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-21T14:47:58.820Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-24T02:17:58.820Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-26T13:47:58.820Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-346",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-10-13T15:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-13T16:34:21.183Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-13T17:34:21.183Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-13T17:34:21.183Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-13T19:55:35.523Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-13T22:16:49.863Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-347",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-10-02T13:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-02T15:20:19.645Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-02T16:20:19.645Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-02T16:20:19.645Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-06T03:50:19.645Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-09T15:20:19.645Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-348",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-10-23T13:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-23T16:40:47.405Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-23T17:40:47.405Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-23T17:40:47.405Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-23T20:38:32.185Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-23T23:36:16.966Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-349",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-10-02T16:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-02T20:28:53.179Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-02T21:28:53.179Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-02T21:28:53.179Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-05T20:58:53.179Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-08T20:28:53.179Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-350",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-10-03T09:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-03T12:12:08.036Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-03T13:12:08.036Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-03T13:12:08.036Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-06T12:42:08.036Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-09T12:12:08.036Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-351",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-10-12T11:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-12T12:58:20.132Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-12T13:58:20.132Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-12T13:58:20.132Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-16T13:28:20.132Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-20T12:58:20.132Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-352",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-10-23T14:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-23T16:50:39.415Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-23T17:50:39.415Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-23T17:50:39.415Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-27T05:20:39.415Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-30T16:50:39.415Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-353",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-10-05T12:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-05T16:10:54.124Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-05T17:10:54.124Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-05T17:10:54.124Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-08T16:40:54.124Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-11T16:10:54.124Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-354",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-10-17T13:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-17T15:13:57.033Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-17T16:13:57.033Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-17T16:13:57.033Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-14T03:43:57.033Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-02-09T15:13:57.033Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-355",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-10-16T08:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-16T09:34:06.467Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-16T10:34:06.467Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-16T10:34:06.467Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-19T22:04:06.467Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-23T09:34:06.467Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-356",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-10-20T12:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-20T13:43:39.301Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-20T14:43:39.301Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-20T14:43:39.301Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-24T02:13:39.301Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-27T13:43:39.301Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-357",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-10-18T16:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-18T19:22:34.122Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-18T20:22:34.122Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-18T20:22:34.122Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-19T01:06:54.355Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-19T05:51:14.588Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-358",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-10-23T11:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-23T13:29:37.414Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-23T14:29:37.414Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-23T14:29:37.414Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-29T13:59:37.414Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-04T13:29:37.414Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-359",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-10-15T12:52:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-15T16:21:41.872Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-15T17:21:41.872Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-15T17:21:41.872Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-19T16:51:41.872Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-23T16:21:41.872Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-360",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-10-13T13:06:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-13T14:59:19.218Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-13T15:59:19.218Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-13T15:59:19.218Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-16T03:29:19.218Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T14:59:19.218Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-361",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-10-08T15:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-08T18:28:52.977Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-08T19:28:52.977Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-08T19:28:52.977Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-13T06:58:52.977Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-17T18:28:52.977Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-362",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-10-17T16:05:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-17T19:52:13.262Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-17T20:52:13.262Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-17T20:52:13.262Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-17T23:31:13.271Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-18T02:10:13.281Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-363",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-10-23T09:18:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-10-23T12:34:09.264Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-10-23T13:34:09.264Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-10-23T13:34:09.264Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-10-27T01:04:09.264Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-10-30T12:34:09.264Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-364",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-11-14T14:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-14T16:50:09.562Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-14T17:50:09.562Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-14T17:50:09.562Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-17T17:20:09.562Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-20T16:50:09.562Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-365",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-11-25T16:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-25T17:51:57.692Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T18:51:57.692Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-25T18:51:57.692Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-29T18:21:57.692Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-02T07:17:03.291Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-02T21:17:06.545Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-05T06:56:34.257Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-366",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-11-14T11:40:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-14T13:04:10.478Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-14T14:04:10.478Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-14T14:04:10.478Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-18T13:34:10.478Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-22T13:04:10.478Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-367",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-11-16T11:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-16T14:03:11.014Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-16T15:03:11.014Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-16T15:03:11.014Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-22T14:33:11.014Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-28T14:03:11.014Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-368",
      "title": "Implement full-text search",
      "ticket_type": "story",
      "created_at": "2025-11-02T13:50:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-02T17:27:16.802Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-02T18:27:16.802Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-02T18:27:16.802Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-06T17:57:16.802Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-10T17:27:16.802Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-369",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-11-08T14:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T17:12:58.054Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T18:12:58.054Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-08T18:12:58.054Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-12T05:42:58.054Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-15T17:12:58.054Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-370",
      "title": "Optimize slow dashboard query",
      "ticket_type": "task",
      "created_at": "2025-11-05T10:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-05T11:39:12.794Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-05T12:39:12.794Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-05T12:39:12.794Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-09T12:09:12.794Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-13T11:39:12.794Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-371",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-11-08T08:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T09:55:08.902Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T10:55:08.902Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-08T10:55:08.902Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-13T10:25:08.902Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-18T09:55:08.902Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-372",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-11-07T10:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-07T14:07:52.627Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-07T15:07:52.627Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-07T15:07:52.627Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-11T02:37:52.627Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-14T14:07:52.627Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-373",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-11-20T08:37:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-20T10:34:59.981Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-20T11:34:59.981Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-20T11:34:59.981Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-22T23:04:59.981Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-25T10:34:59.981Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-374",
      "title": "Migrate to structured logging",
      "ticket_type": "task",
      "created_at": "2025-11-15T08:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-15T12:31:19.465Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-15T13:31:19.465Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-15T13:31:19.465Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-19T13:01:19.465Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-22T09:15:20.458Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-23T04:16:04.860Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-24T19:46:45.832Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-375",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-11-10T12:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T15:38:53.873Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-10T16:38:53.873Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-10T16:38:53.873Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-14T16:08:53.873Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-18T15:38:53.873Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-376",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-11-08T08:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T12:24:06.699Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T13:24:06.699Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-08T13:24:06.699Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-12T00:54:06.699Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-15T12:24:06.699Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-377",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-11-20T10:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-20T13:03:52.120Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-20T14:03:52.120Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-20T14:03:52.120Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-24T01:33:52.120Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-27T13:03:52.120Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-378",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-11-07T14:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-07T17:48:44.743Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-07T18:48:44.743Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-07T18:48:44.743Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-12T06:18:44.743Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-18T07:29:08.699Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-18T22:07:53.452Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-19T22:07:53.452Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-379",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-11-04T11:47:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-04T12:47:21.358Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-04T13:47:21.358Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-04T13:47:21.358Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-08T01:17:21.358Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-11T13:40:20.102Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-13T09:56:09.901Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-14T09:56:09.901Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-380",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-11-10T08:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-10T09:59:55.277Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-10T10:59:55.277Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-10T10:59:55.277Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-14T22:29:55.277Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-19T09:59:55.277Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-381",
      "title": "Resolve deep link 404 error",
      "ticket_type": "bug",
      "created_at": "2025-11-25T12:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-25T16:19:27.005Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-25T17:19:27.005Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-25T17:19:27.005Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-28T16:49:27.005Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-01T16:19:27.005Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-382",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-11-21T09:27:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-21T12:25:00.337Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-21T13:25:00.337Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-21T13:25:00.337Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-26T12:55:00.337Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-01T12:25:00.337Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-383",
      "title": "Add SSO provider support",
      "ticket_type": "story",
      "created_at": "2025-11-08T09:44:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T11:59:48.308Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T12:59:48.308Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-08T12:59:48.308Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-11T00:29:48.308Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-13T11:59:48.308Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-384",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-11-05T11:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-05T13:34:47.843Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-05T14:34:47.843Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-05T14:34:47.843Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-10T02:04:47.843Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-14T13:34:47.843Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-385",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-11-24T11:33:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-24T15:01:05.231Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-24T16:01:05.231Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-24T16:01:05.231Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-29T03:31:05.231Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-03T15:01:05.231Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-386",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-11-07T14:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-07T15:48:28.415Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-07T16:48:28.415Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-07T16:48:28.415Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-12T04:18:28.415Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-16T15:48:28.415Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-387",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-11-16T16:46:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-16T17:46:10.739Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-16T18:46:10.739Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-16T18:46:10.739Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-22T06:16:10.739Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-27T17:46:10.739Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-388",
      "title": "Add performance benchmarks",
      "ticket_type": "task",
      "created_at": "2025-11-23T16:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-23T20:26:29.520Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-23T21:26:29.520Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-23T21:26:29.520Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-28T20:56:29.520Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-05T00:37:58.026Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-06T05:56:11.601Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-07T05:56:11.601Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-389",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-11-04T08:29:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-04T10:45:06.590Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-04T11:45:06.590Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-04T11:45:06.590Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-08T23:15:06.590Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-14T22:31:12.021Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-15T14:02:57.386Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-16T14:02:57.386Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-390",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-11-08T16:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-08T20:11:31.264Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-08T21:11:31.264Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-08T21:11:31.264Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-12T20:41:31.264Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-16T20:11:31.264Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-391",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-11-06T09:04:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T10:05:43.704Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-392",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-11-24T16:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-24T18:14:34.261Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-24T19:14:34.261Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-24T19:14:34.261Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-30T06:44:34.261Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-05T19:34:41.981Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-07T03:40:14.237Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-08T03:40:14.237Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-393",
      "title": "Implement user authentication flow",
      "ticket_type": "story",
      "created_at": "2025-11-02T14:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-02T17:57:28.032Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-02T18:57:28.032Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-02T18:57:28.032Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-05T18:27:28.032Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-08T17:57:28.032Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-394",
      "title": "Add real-time collaboration",
      "ticket_type": "story",
      "created_at": "2025-11-06T09:39:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T11:05:41.445Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-06T12:05:41.445Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-06T12:05:41.445Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-11T23:35:41.445Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-17T11:05:41.445Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-395",
      "title": "Build notification preferences",
      "ticket_type": "story",
      "created_at": "2025-11-06T11:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-06T14:54:09.220Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-06T15:54:09.220Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-06T15:54:09.220Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-11T15:24:09.220Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-16T14:54:09.220Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-396",
      "title": "Build onboarding wizard",
      "ticket_type": "story",
      "created_at": "2025-11-04T13:21:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-04T15:11:12.867Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-04T16:11:12.867Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-04T16:11:12.867Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-09T03:41:12.867Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-13T15:11:12.867Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-397",
      "title": "Fix date picker timezone offset",
      "ticket_type": "bug",
      "created_at": "2025-11-11T09:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-11T11:09:03.259Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-11T12:09:03.259Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-11T12:09:03.259Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-13T23:39:03.259Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-16T11:14:48.532Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-17T05:33:33.105Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-18T05:33:33.105Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-398",
      "title": "Build activity feed component",
      "ticket_type": "story",
      "created_at": "2025-11-24T08:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-24T09:48:11.624Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-24T10:48:11.624Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-24T10:48:11.624Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-29T10:18:11.624Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-04T09:48:11.624Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-399",
      "title": "Fix broken layout on small screens",
      "ticket_type": "bug",
      "created_at": "2025-11-15T08:08:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-11-15T10:11:40.308Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-11-15T11:11:40.308Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-11-15T11:11:40.308Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-11-18T22:41:40.308Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-11-22T10:11:40.308Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-400",
      "title": "Fix session timeout handling",
      "ticket_type": "bug",
      "created_at": "2025-12-10T10:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T13:33:59.751Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T14:33:59.751Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-10T14:33:59.751Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-13T14:03:59.751Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-16T13:33:59.751Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-401",
      "title": "Fix flaky test in CI pipeline",
      "ticket_type": "bug",
      "created_at": "2025-12-20T12:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-20T13:35:54.518Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-20T14:35:54.518Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-20T14:35:54.518Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-20T16:50:18.599Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-20T19:04:42.681Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-402",
      "title": "Add pagination to results list",
      "ticket_type": "story",
      "created_at": "2025-12-19T11:32:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-19T14:42:31.490Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-19T15:42:31.490Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-19T15:42:31.490Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-23T03:12:31.490Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-26T14:42:31.490Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-403",
      "title": "Integrate webhook notifications",
      "ticket_type": "story",
      "created_at": "2025-12-16T11:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-16T13:39:17.730Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-16T14:39:17.730Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-16T14:39:17.730Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-19T02:09:17.730Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-21T13:39:17.730Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-404",
      "title": "Fix null reference on empty state",
      "ticket_type": "bug",
      "created_at": "2025-12-24T08:12:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-24T09:12:35.619Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-24T10:12:35.619Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-24T10:12:35.619Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T21:42:35.619Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-01-02T09:12:35.619Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-405",
      "title": "Fix memory leak in polling loop",
      "ticket_type": "bug",
      "created_at": "2025-12-03T14:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-03T16:47:51.159Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-03T17:47:51.159Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-03T17:47:51.159Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-08T05:17:51.159Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-12T16:47:51.159Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-406",
      "title": "Add keyboard shortcut support",
      "ticket_type": "story",
      "created_at": "2025-12-02T15:56:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-02T19:32:11.229Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-02T20:32:11.229Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-02T20:32:11.229Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-06T20:02:11.229Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-10T19:32:11.229Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-407",
      "title": "Build public API endpoints",
      "ticket_type": "story",
      "created_at": "2025-12-10T10:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T13:41:57.062Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T14:41:57.062Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-10T14:41:57.062Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-13T14:11:57.062Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-16T13:41:57.062Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-408",
      "title": "Fix drag-and-drop reorder bug",
      "ticket_type": "bug",
      "created_at": "2025-12-16T09:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-16T13:29:22.358Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-16T14:29:22.358Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-16T14:29:22.358Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-21T13:59:22.358Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-27T08:35:56.468Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T08:26:54.164Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-29T08:26:54.164Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-409",
      "title": "Resolve save race condition",
      "ticket_type": "bug",
      "created_at": "2025-12-10T13:02:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T15:20:02.839Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T16:20:02.839Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-10T16:20:02.839Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-15T15:50:02.839Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-20T15:20:02.839Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-410",
      "title": "Refactor API client layer",
      "ticket_type": "task",
      "created_at": "2025-12-10T10:20:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T11:21:15.566Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T12:21:15.566Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-10T12:21:15.566Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2026-01-26T23:51:15.566Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-03-15T11:21:15.566Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-411",
      "title": "Redesign settings page layout",
      "ticket_type": "story",
      "created_at": "2025-12-02T13:25:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-02T15:53:58.537Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-02T16:53:58.537Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-02T16:53:58.537Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-06T04:23:58.537Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-09T15:53:58.537Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-412",
      "title": "Implement data retention policy",
      "ticket_type": "story",
      "created_at": "2025-12-20T09:54:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-20T11:09:51.127Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-20T12:09:51.127Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-20T12:09:51.127Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-25T23:39:51.127Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-31T11:09:51.127Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-413",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-12-15T14:03:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-15T16:24:36.599Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-15T17:24:36.599Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-15T17:24:36.599Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-20T04:54:36.599Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-24T16:24:36.599Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-414",
      "title": "Upgrade dependencies to latest",
      "ticket_type": "task",
      "created_at": "2025-12-17T11:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T15:11:05.681Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-17T16:11:05.681Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-17T16:11:05.681Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-21T15:41:05.681Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-25T15:11:05.681Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-415",
      "title": "Implement audit log view",
      "ticket_type": "story",
      "created_at": "2025-12-10T13:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T14:53:44.743Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T15:53:44.743Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-10T15:53:44.743Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-10T18:01:44.896Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-10T20:09:45.050Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-416",
      "title": "Document REST API endpoints",
      "ticket_type": "task",
      "created_at": "2025-12-19T09:15:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-19T12:12:42.375Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-19T13:12:42.375Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-19T13:12:42.375Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-24T00:42:42.375Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-28T12:12:42.375Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-417",
      "title": "Extract shared UI components",
      "ticket_type": "task",
      "created_at": "2025-12-14T11:34:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-14T15:00:49.493Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-418",
      "title": "Resolve import validation error",
      "ticket_type": "bug",
      "created_at": "2025-12-19T16:17:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-19T17:23:56.572Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-19T18:23:56.572Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-19T18:23:56.572Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2026-02-24T05:53:56.572Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-05-01T17:23:56.572Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-419",
      "title": "Fix export data truncation",
      "ticket_type": "bug",
      "created_at": "2025-12-20T13:42:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-20T16:44:14.963Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-20T17:44:14.963Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-20T17:44:14.963Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-20T18:36:04.374Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-20T19:27:53.786Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-420",
      "title": "Add weekly email digest",
      "ticket_type": "story",
      "created_at": "2025-12-14T11:23:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-14T13:07:55.816Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-421",
      "title": "Implement role-based permissions",
      "ticket_type": "story",
      "created_at": "2025-12-24T16:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-24T19:23:28.521Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-24T20:23:28.521Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-24T20:23:28.521Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-28T07:53:28.521Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-31T19:23:28.521Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-422",
      "title": "Set up error monitoring alerts",
      "ticket_type": "task",
      "created_at": "2025-12-07T15:49:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-07T17:06:03.801Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-07T18:06:03.801Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-07T18:06:03.801Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-07T21:38:04.599Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-08T01:10:05.398Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-423",
      "title": "Configure staging environment",
      "ticket_type": "task",
      "created_at": "2025-12-11T13:07:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-11T15:47:59.453Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-11T16:47:59.453Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-11T16:47:59.453Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-16T16:17:59.453Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-21T15:47:59.453Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-424",
      "title": "Fix incorrect percentage display",
      "ticket_type": "bug",
      "created_at": "2025-12-23T08:19:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-23T11:48:40.379Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-23T12:48:40.379Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-23T12:48:40.379Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2026-02-25T00:18:40.379Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-04-29T11:48:40.379Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-425",
      "title": "Fix incorrect sort order",
      "ticket_type": "bug",
      "created_at": "2025-12-20T08:55:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-20T10:28:38.240Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-20T11:28:38.240Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-20T11:28:38.240Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-24T22:58:38.240Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-29T10:28:38.240Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-426",
      "title": "Add rate limiting to endpoints",
      "ticket_type": "task",
      "created_at": "2025-12-06T15:00:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-06T18:16:23.853Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-06T19:16:23.853Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-06T19:16:23.853Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-06T21:07:53.067Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-06T22:59:22.281Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-427",
      "title": "Build CSV export feature",
      "ticket_type": "story",
      "created_at": "2025-12-02T14:13:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-02T16:59:02.602Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-02T17:59:02.602Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-02T17:59:02.602Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2026-02-09T05:29:02.602Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2026-04-18T16:59:02.602Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-428",
      "title": "Add custom field support",
      "ticket_type": "story",
      "created_at": "2025-12-01T15:53:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-01T19:23:22.085Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-01T20:23:22.085Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-01T20:23:22.085Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-05T19:53:22.085Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-09T19:23:22.085Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-429",
      "title": "Build team overview dashboard",
      "ticket_type": "story",
      "created_at": "2025-12-03T10:38:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-03T11:39:37.449Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-03T12:39:37.449Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-03T12:39:37.449Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-06T12:09:37.449Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-09T11:39:37.449Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-430",
      "title": "Add database index for search",
      "ticket_type": "task",
      "created_at": "2025-12-17T15:51:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-17T19:21:34.619Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-17T20:21:34.619Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-17T20:21:34.619Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-20T19:51:34.619Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-24T05:32:26.717Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-25T18:29:24.130Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-26T18:29:24.130Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-431",
      "title": "Remove deprecated API calls",
      "ticket_type": "task",
      "created_at": "2025-12-11T16:28:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-11T19:58:26.563Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-11T20:58:26.563Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-11T20:58:26.563Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-15T20:28:26.563Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-19T19:58:26.563Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-432",
      "title": "Add multi-select bulk actions",
      "ticket_type": "story",
      "created_at": "2025-12-18T09:59:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-18T13:41:37.661Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-433",
      "title": "Fix tooltip positioning",
      "ticket_type": "bug",
      "created_at": "2025-12-06T15:22:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-06T18:11:28.577Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-06T19:11:28.577Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-06T19:11:28.577Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-11T06:41:28.577Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-16T22:15:11.529Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-18T07:09:06.632Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-19T07:09:06.632Z"
        }
      ]
    },
    {
      "external_id": "GAMMA-434",
      "title": "Resolve double-submit on form",
      "ticket_type": "bug",
      "created_at": "2025-12-10T11:24:00.000Z",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2025-12-10T14:15:28.093Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "In Progress",
          "transitioned_at": "2025-12-10T15:15:28.093Z"
        },
        {
          "from_status": "In Progress",
          "to_status": "Ready for Dev!",
          "transitioned_at": "2025-12-10T15:15:28.093Z"
        },
        {
          "from_status": "Ready for Dev!",
          "to_status": "In Review",
          "transitioned_at": "2025-12-15T02:45:28.093Z"
        },
        {
          "from_status": "In Review",
          "to_status": "Done",
          "transitioned_at": "2025-12-19T14:15:28.093Z"
        }
      ]
    }
  ]
}
