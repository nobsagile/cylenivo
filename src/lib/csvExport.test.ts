import { describe, it, expect } from 'vitest'
import { toCsv } from './csvExport'

describe('toCsv', () => {
  it('generates BOM + semicolon-separated CSV', () => {
    const csv = toCsv(['Name', 'Value'], [['Foo', 1], ['Bar', 2]])
    expect(csv.startsWith('\uFEFF')).toBe(true)
    expect(csv).toContain('Name;Value')
    expect(csv).toContain('Foo;1')
    expect(csv).toContain('Bar;2')
  })

  it('escapes cells containing semicolons', () => {
    const csv = toCsv(['A'], [['hello;world']])
    expect(csv).toContain('"hello;world"')
  })

  it('escapes cells containing quotes', () => {
    const csv = toCsv(['A'], [['say "hi"']])
    expect(csv).toContain('"say ""hi"""')
  })

  it('handles null and undefined as empty string', () => {
    const csv = toCsv(['A', 'B'], [[null, undefined]])
    expect(csv).toContain(';')
    expect(csv).not.toContain('null')
    expect(csv).not.toContain('undefined')
  })

  it('uses CRLF line endings', () => {
    const csv = toCsv(['A'], [['1']])
    expect(csv).toContain('\r\n')
  })
})
