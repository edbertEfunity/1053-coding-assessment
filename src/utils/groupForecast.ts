/* To group the list of forecast info by the correct day */
import type { forecastInfo, forecastDay } from '@/types/forecastType'

export function groupByDay(forecast: forecastInfo): forecastDay[] | undefined {
  const days: forecastDay[] = []
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD format

  for (const f of forecast) {
    let day = days.find((d) => d.day === f.day) // method to find the first object which d.day === f.day

    if (!day) {
      day = {
        day: f.day,
        title: f.day === today ? 'Today' : undefined,
        rows: [],
      }

      days.push(day)
    }

    day.rows.push(f)
  }
  return days
}
