<script setup lang="ts">
import { ref } from 'vue'
import { getCurrentWeather, getForecast } from '@/api/weatherApi'
import { mapCurrentWeather, mapForecastList } from '@/utils/mapWeather'
import type { currentWeather, weatherInfo } from '@/types/currentWeatherType'
import { type forecastDetails, type forecastInfo, type forecastDay } from '@/types/forecastType'
import { groupByDay } from '@/utils/groupForecast'
import SearchBar from '@/components/SearchBar.vue'
import CurrentCard from '@/components/CurrentCard.vue'

const error = ref<string | null>(null)
const loading = ref<boolean>(false)

const current = ref<weatherInfo | null>(null)
const forecastDays = ref<forecastDay[] | undefined>([])

async function onSearch(city: string) {
  loading.value = true // Ensures onSearch function finish executing before next line of instruction gets executed
  error.value = null

  // Error handling
  try {
    const current_in_raw_format: currentWeather = await getCurrentWeather(city)
    const forecast_in_raw_format: forecastDetails = await getForecast(city)

    current.value = mapCurrentWeather(current_in_raw_format)
    const forecast: forecastInfo = mapForecastList(forecast_in_raw_format.list)

    forecastDays.value = groupByDay(forecast)
  } catch (e: any) {
    error.value = e.message ?? 'Something went wrong'
    current.value = null
    forecastDays.value = []
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <SearchBar @search="onSearch" />

    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>

    <CurrentCard v-if="current" :data="current" />

    <pre v-if="forecastDays?.length">{{ forecastDays }}</pre>
  </div>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
}
</style>
