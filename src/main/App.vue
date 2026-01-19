<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentWeather, getForecast } from '@/api/weatherApi'
import type { currentWeather, weatherInfo } from '@/types/currentWeatherType'
import { type forecastDetails, type forecastInfo, type forecastDay } from '@/types/forecastType'
import { groupByDay } from '@/utils/groupForecast'
import { loadHistory, addToHistory, removeHistory } from '@/utils/historyStorage'
import { mapCurrentWeather, mapForecastList } from '@/utils/mapWeather'
import SearchBar from '@/components/SearchBar.vue'
import CurrentCard from '@/components/CurrentCard.vue'
import HistoryList from '@/components/HistoryList.vue'
import ForecastDays from '@/components/ForecastDays.vue'

const error = ref<string | null>(null)
const loading = ref<boolean>(false)

const current = ref<weatherInfo | null>(null)
const forecastDays = ref<forecastDay[] | undefined>([])
const history = ref<string[]>([])

onMounted(() => {
  history.value = loadHistory()
})

async function onSearch(city: string) {
  loading.value = true // Ensures onSearch function finish executing before next line of instruction gets executed
  error.value = null

  // Error handling
  try {
    const current_in_raw_format: currentWeather = await getCurrentWeather(city)
    const forecast_in_raw_format: forecastDetails = await getForecast(city)

    // To structure the current weather and forecast nicely
    current.value = mapCurrentWeather(current_in_raw_format) // Outputs an object of current weather
    const forecast: forecastInfo = mapForecastList(forecast_in_raw_format.list) // Outputs an array of objects of forecast details

    history.value = addToHistory(city)

    forecastDays.value = groupByDay(forecast)
  } catch (e: any) {
    error.value = e.message ?? 'Something went wrong'
    current.value = null
    forecastDays.value = []
  } finally {
    loading.value = false
  }
}

function onDeleteHistory(city: string): void {
  history.value = removeHistory(city)
}
</script>

<template>
  <div class="page">
    <SearchBar @search="onSearch" />

    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>

    <HistoryList
      v-if="history.length"
      :items="history"
      @select="onSearch"
      @delete="onDeleteHistory"
    />

    <CurrentCard v-if="current" :data="current" />

    <ForecastDays v-if="forecastDays?.length" :forecast-data="forecastDays" />
  </div>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
}
</style>
