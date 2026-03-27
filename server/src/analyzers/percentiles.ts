const MINIMUM_SAMPLE_SIZE = 10

export interface PercentileResult {
  p50: number | null
  p70: number | null
  p85: number | null
  p95: number | null
  mean_days: number | null
  median_days: number | null
  sample_size: number
  warning: string | null
}

export function calculatePercentiles(values: number[]): PercentileResult {
  if (values.length < MINIMUM_SAMPLE_SIZE) {
    return {
      p50: null,
      p70: null,
      p85: null,
      p95: null,
      mean_days: null,
      median_days: null,
      sample_size: values.length,
      warning: `Insufficient data (n=${values.length}). At least ${MINIMUM_SAMPLE_SIZE} completed tickets recommended.`,
    }
  }

  const sorted = [...values].sort((a, b) => a - b)
  const pct = (p: number) => sorted[Math.floor(sorted.length * p / 100)]
  const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length

  return {
    p50: pct(50),
    p70: pct(70),
    p85: pct(85),
    p95: pct(95),
    mean_days: mean,
    median_days: pct(50),
    sample_size: values.length,
    warning: null,
  }
}

export function calculateThroughputPerWeek(completedAtDates: Date[]): number {
  if (completedAtDates.length < 2) return completedAtDates.length
  const times = completedAtDates.map(d => d.getTime())
  const minDate = Math.min(...times)
  const maxDate = Math.max(...times)
  const weeks = Math.max((maxDate - minDate) / (1000 * 86400 * 7), 1)
  return Math.round((completedAtDates.length / weeks) * 10) / 10
}
