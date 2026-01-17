const BASEURL = 'api.openweathermap.org/data/2.5'

function getKey(): string {
  const key = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  if (!key) {
    throw new Error('No API key in .env file, store it there.')
  }
  return key
}

export async function getCurrentWeather(city: string) {
  const key = getKey()
  // fetch currentWeather information from openWeather API URL
  const url = `${BASEURL}/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('City not found')
  }
  return res.json()
}

export async function getForecast(city: string) {
  const key = getKey()
  // fetch forecast information from openWeather API URL
  const url = `${BASEURL}/forecast?q=${encodeURIComponent(city)}&appid=${key}&units=metric`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('City not found!')
  }
  return res.json()
}
