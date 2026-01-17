<script setup lang="ts">
import { ref } from 'vue'
import { getCurrentWeather, getForecast } from '@/api/weatherApi'
import { mapCurrentWeather, mapForecastList } from '@/utils/mapWeather'
import type { currentWeather, weatherInfo } from '@/types/currentWeatherType'
import type { forecastDetails, forecastInfo } from '@/types/forecastType'
import SearchBar from '@/components/SearchBar.vue'

const error = ref<string | null>(null)
const loading = ref<boolean>(false)

const current = ref<weatherInfo | null>(null)

async function onSearch(city: string) {
  loading.value = true // Ensures onSearch function finish executing before next line of instruction gets executed
  error.value = null

  // Error handling
  try {
    const current_in_raw_format: currentWeather = await getCurrentWeather(city)
    const forecast_in_raw_format: forecastDetails = await getForecast(city)

    const current = mapCurrentWeather(current_in_raw_format)
    const forecast = mapForecastList(forecast_in_raw_format.list)
  } catch (e: any) {
    error.value = e.message ?? 'Something went wrong'
    current.value = null
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
  </div>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
}
</style>
