export type currentWeather = {
  name: string
  dt: number
  visibility: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
}

export type weatherInfo = {
  temp: number
  city: string
  description: string
  humidity: number
  windSpeed: number
  windDeg: number
  visibilityInKm: number
  icon: string
  dateText: string
}
