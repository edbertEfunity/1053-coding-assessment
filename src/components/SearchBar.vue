<script setup lang="ts">
import { ref } from 'vue'

const city = ref<string>('')
const emit = defineEmits<{
  (e: 'search', city: string): void
}>()

function submit(): void {
  // if city name is empty, return nothing
  if (!city.value.trim()) {
    return
  }

  // send the payload city to the parent component
  emit('search', city.value.trim())
}
</script>

<template>
  <div class="search">
    <input
      class="input-group mb-3"
      @keyup.enter="submit"
      v-model="city"
      placeholder="Input city name (e.g. Singapore, Malaysia, Thailand)"
      aria-label="Input city name (e.g. Singapore, Malaysia, Thailand)"
      aria-describedby="basic-addon1"
    />
    <button type="button" class="btn btn-outline-dark mb-3" @click="submit">Search</button>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 8px;
}

button {
  padding: 8px 12px;
}
</style>
