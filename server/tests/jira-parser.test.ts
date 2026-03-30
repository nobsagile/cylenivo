import { describe, it, expect } from 'vitest'
import { extractTransitions, mapIssueType } from '../src/connectors/jira.js'
import changelog from './fixtures/jira-api-changelog.json'

// Jira history shape: { id, created, items: [{ field, fromString, toString }] }
function makeHistory(created: string, fromString: string | null, toString: string) {
  return { id: '1', created, items: [{ field: 'status', fieldtype: 'jira', fromString, toString }] }
}

describe('extractTransitions', () => {
  it('parses full changelog correctly', () => {
    const transitions = extractTransitions(changelog)
    // Only status field items (5 in the fixture, 1 non-status item filtered out)
    expect(transitions).toHaveLength(5)
  })

  it('returns transitions in chronological order', () => {
    const transitions = extractTransitions(changelog)
    for (let i = 1; i < transitions.length; i++) {
      expect(new Date(transitions[i].transitioned_at).getTime())
        .toBeGreaterThanOrEqual(new Date(transitions[i - 1].transitioned_at).getTime())
    }
  })

  it('maps first transition with null fromString to from_status: null', () => {
    const transitions = extractTransitions(changelog)
    expect(transitions[0].from_status).toBeNull()
    expect(transitions[0].to_status).toBe('Backlog')
  })

  it('passes through status names with special characters unchanged', () => {
    const transitions = extractTransitions(changelog)
    const blocked = transitions.find(t => t.to_status === 'In Review (blocked)')
    expect(blocked).toBeDefined()
    expect(blocked!.from_status).toBe('In Progress')
  })

  it('handles rework (same status appears multiple times)', () => {
    const transitions = extractTransitions(changelog)
    const inProgressEntries = transitions.filter(t => t.to_status === 'In Progress')
    expect(inProgressEntries).toHaveLength(2)
  })

  it('filters out non-status changelog items', () => {
    const historiesWithNoise = [
      { id: '1', created: '2025-01-01T00:00:00.000+0000', items: [
        { field: 'assignee', fieldtype: 'jira', fromString: null, toString: 'Alice' },
        { field: 'priority', fieldtype: 'jira', fromString: 'Medium', toString: 'High' },
      ]},
    ]
    const transitions = extractTransitions(historiesWithNoise)
    expect(transitions).toHaveLength(0)
  })

  it('returns empty array for empty changelog', () => {
    expect(extractTransitions([])).toEqual([])
  })

  it('returns empty array for history with no status items', () => {
    const noStatusHistory = [
      { id: '1', created: '2025-01-01T00:00:00.000+0000', items: [
        { field: 'summary', fieldtype: 'jira', fromString: 'Old title', toString: 'New title' },
      ]},
    ]
    expect(extractTransitions(noStatusHistory)).toHaveLength(0)
  })

  it('sorts by timestamp when histories arrive out of order', () => {
    const outOfOrder = [
      makeHistory('2025-03-01T00:00:00.000+0000', 'In Progress', 'Done'),
      makeHistory('2025-01-01T00:00:00.000+0000', null, 'Backlog'),
      makeHistory('2025-02-01T00:00:00.000+0000', 'Backlog', 'In Progress'),
    ]
    const transitions = extractTransitions(outOfOrder)
    expect(transitions[0].to_status).toBe('Backlog')
    expect(transitions[1].to_status).toBe('In Progress')
    expect(transitions[2].to_status).toBe('Done')
  })

  it('preserves transitioned_at as ISO string from history.created', () => {
    const ts = '2025-06-15T12:30:00.000+0000'
    const transitions = extractTransitions([makeHistory(ts, 'Backlog', 'Done')])
    expect(transitions[0].transitioned_at).toBe(ts)
  })
})

describe('mapIssueType', () => {
  it('maps bug → bug (case-insensitive)', () => {
    expect(mapIssueType('bug')).toBe('bug')
    expect(mapIssueType('Bug')).toBe('bug')
    expect(mapIssueType('BUG')).toBe('bug')
  })

  it('maps epic → epic', () => {
    expect(mapIssueType('Epic')).toBe('epic')
  })

  it('maps task variants → task', () => {
    expect(mapIssueType('Task')).toBe('task')
    expect(mapIssueType('Sub-task')).toBe('task')
    expect(mapIssueType('Subtask')).toBe('task')
  })

  it('maps unknown types → story (default)', () => {
    expect(mapIssueType('Story')).toBe('story')
    expect(mapIssueType('User Story')).toBe('story')
    expect(mapIssueType('Improvement')).toBe('story')
    expect(mapIssueType('New Feature')).toBe('story')
    expect(mapIssueType('')).toBe('story')
  })
})
