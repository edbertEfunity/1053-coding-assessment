<script setup lang="ts">
import type { weatherInfo } from '@/types/currentWeatherType'

const props = defineProps<{
  data: weatherInfo
}>()
</script>

<template>
  <div class="card">
    <div class="column">
      <h2>{{ props.data.city }}</h2>
      <p>Date: {{ props.data.date }}</p>
      <p>Time: {{ props.data.time }}</p>

      <div class="column">
        <img :src="props.data.icon" alt="Weather icon" />
        <p class="temp">{{ props.data.temp }}°C</p>
        <p>Description: {{ props.data.description }}</p>
        <div>
          <p>Humidity: {{ props.data.humidity }}%</p>
          <p>Wind: {{ props.data.windSpeed }} m/s (deg: {{ props.data.windDeg }})</p>
          <p>Visibility: {{ props.data.visibilityInKm }} km</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #7b7878;
  padding: 12px;
  border-radius: 10px;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 12px; */
}

.temp {
  font-size: 28px;
  margin: 0;
}

img {
  width: 70px;
  height: 70px;
}
</style>
