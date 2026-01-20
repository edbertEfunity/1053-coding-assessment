const KEY = 'history'
const LIMIT = 10 // A total of 10 search cities in the history list

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
    // External error coming from JSON.parse method which i will ignore and just return an empty array
    return []
  }
}

export function saveHistory(items: string[]): void {
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, LIMIT))) // Convert to JSON format and only adding the first 10 cities in the list
}

export function addToHistory(city: string): string[] {
  const current = loadHistory()
  const non_duplicate = current.filter((prevCity) => prevCity != city) // Ensuring no duplicated searched cities
  const search_history = [city, ...non_duplicate].slice(0, LIMIT) // I do this just to put the most current searched city at the top of the history list
  saveHistory(search_history)
  return search_history
}

export function removeHistory(city: string): string[] {
  const current = loadHistory()
  const remaining_search = current.filter((prevCity) => prevCity != city)
  saveHistory(remaining_search)
  return remaining_search
}
