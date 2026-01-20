/* Returns object of current weather and weather forecast information */
import type { currentWeather, weatherInfo } from '@/types/currentWeatherType'
import type { forecastInfo, forecastList } from '@/types/forecastType'

export function mapCurrentWeather(obj: currentWeather): weatherInfo {
  const date = new Date(obj.dt * 1000).toISOString().slice(0, 10) // Convert to YYYY-MM-DD
  const time24h = new Date(obj.dt * 1000).toLocaleTimeString('en-GB', { hour12: false }) // Convert to 24hr format
  console.log(typeof date)
  console.log(typeof time24h)
  return {
    temp: obj.main.temp,
    city: obj.name,
    description: obj.weather[0]?.description ?? 'No weather information',
    humidity: obj.main.humidity,
    windSpeed: obj.wind.speed,
    windDeg: obj.wind.deg,
    visibilityInKm: obj.visibility / 1000, // Visibility is in meter, converted to kilometer (km) for better readability
    icon: `https://openweathermap.org/img/wn/${obj.weather[0]?.icon}@2x.png`, // Weather icon (url retrieved from the assessment pdf)
    date: date,
    time: time24h,
  }
}

export function mapForecastList(list: forecastList): forecastInfo {
  return list.map((item) => {
    // To create a new array of objects with key:value pair selectively chosen as shown below
    const dt = item.dt_txt.slice(11, 19) // This will give the time in 24h format

    return {
      day: item.dt_txt.slice(0, 10), // "2026-01-17"
      time: dt,
      min: item.main.temp_min,
      max: item.main.temp_max,
      description: item.weather[0]?.description ?? 'No weather information',
      icon: `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`,
    }
  })
}
