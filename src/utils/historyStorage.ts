const KEY = 'history_v1'
const LIMIT = 10

export function loadHistory(): string[] {
  // load past search result in an array
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    return []
  }

  // Error handling
  try {
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? (arr as string[]) : []
  } catch {
    return []
  }
}

export function saveHistory(items: string[]): void {
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, LIMIT)))
}

export function addToHistory(city: string): string[] {
  const current = loadHistory()
  const non_duplicate = current.filter((prevCity) => prevCity != city)
  const search_history = [city, ...non_duplicate].slice(0, LIMIT)
  saveHistory(search_history)
  return search_history
}

export function removeHistory(city: string): string[] {
  const current = loadHistory()
  const remaining_search = current.filter((prevCity) => prevCity != city)
  saveHistory(remaining_search)
  return remaining_search
}
