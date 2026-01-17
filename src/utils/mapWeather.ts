/* Returns object of weather information */
import type { currentWeather, weatherInfo } from '@/types/currentWeatherType'
import type { forecastInfo, forecastList } from '@/types/forecastType'

export function mapCurrentWeather(obj: currentWeather): weatherInfo {
  return {
    temp: obj.main.temp,
    city: obj.name,
    description: obj.weather[0]?.description ?? 'No weather information',
    humidity: obj.main.humidity,
    windSpeed: obj.wind.speed,
    windDeg: obj.wind.deg,
    visibilityInKm: obj.visibility / 1000, // Visibility is in meter, converted to kilometer (km)
    icon: `https://openweathermap.org/img/wn/${obj.weather[0]?.icon}@2x.png`, // Weather icon (url retrieved from the assessment pdf)
    dateText: new Date(obj.dt * 1000).toLocaleString(), // convert to "17/01/2026, 3:30:00 pm" for example
  }
}

export function mapForecastList(list: forecastList): forecastInfo {
  return list.map((item) => {
    const dt = new Date(item.dt * 1000)
    const time24 = dt.toLocaleTimeString('en-GB', { hour12: false })

    return {
      dayKey: dt.toISOString().slice(0, 10), // convert to "2026-01-17" for example
      time: time24,
      min: item.main.temp_min,
      max: item.main.temp_max,
      description: item.weather[0]?.description ?? 'No weather information',
      icon: `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`,
    }
  })
}
