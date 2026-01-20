<script setup lang="ts">
import type { forecastDay, forecastInfo } from '@/types/forecastType'
import { computed } from 'vue'

const props = defineProps<{
  forecastData: forecastDay[]
}>()
const title = computed<string | undefined>(() => {
  return props.forecastData[0]?.title?.toLowerCase()
})
const forecastRows = computed<forecastInfo | undefined>(() => {
  return title.value === 'today' ? props.forecastData[0]?.rows : []
})
</script>

<template>
  <div v-if="title === 'today'">
    <h2 class="title">{{ title }}'s Forecast:</h2>
    <div class="card" v-for="(row, index) in forecastRows" :key="index">
      <img class="img-fluid" style="max-width: 100px" :src="row.icon" alt="Forecast Icon" />
      <p>Date: {{ row.day }}</p>
      <p>Time: {{ row.time }}</p>
      <p>Minimum Temperature: {{ row.min }}°C</p>
      <p>Maximum Temperature: {{ row.max }}°C</p>
      <p>Description: {{ row.description }}</p>
    </div>
  </div>
</template>

<style scoped>
:root {
  --title-color: #222;
}
.title {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  column-gap: 20px;
  margin: 10px 0;
  font-family: 'Merriweather', serif;
  font-size: 2.2rem;
  color: var(--title-color);
  line-height: 1.2;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
}

.card {
  border: 1px solid #7b7878;
  padding: 12px;
  border-radius: 10px;
}
</style>
