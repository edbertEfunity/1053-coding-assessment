export type forecastList = Array<{
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
  dt_txt: string
}>

export type forecastInfo = Array<{
  day: string
  time: string
  min: number
  max: number
  description: string
  icon: string
}>

export type forecastDetails = {
  message: number | string
  list: forecastList
  city: {
    name: string
    country: string
    population: number
  }
}

export type forecastDay = {
  day: string
  title: string | undefined
  rows: forecastInfo
}
