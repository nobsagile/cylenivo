const SEP = ';'
const BOM = '\uFEFF'

function escapeCell(value: unknown): string {
  if (value == null) return ''
  const str = String(value)
  if (str.includes(SEP) || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.map(escapeCell).join(SEP)]
  for (const row of rows) {
    lines.push(row.map(escapeCell).join(SEP))
  }
  return BOM + lines.join('\r\n') + '\r\n'
}

export function downloadCsv(filename: string, headers: string[], rows: unknown[][]) {
  const csv = toCsv(headers, rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
