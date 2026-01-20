<script setup lang="ts">
const props = defineProps<{
  error: string
}>()

const cities = ['Singapore', 'Malaysia', 'Indonesia']
</script>

<template>
  <div class="error-box">
    <p class="error">{{ props.error }}</p>
    <strong style="margin-left: 5px">Example cities to input:</strong>
    <ul v-for="city in cities" :key="city">
      <li>{{ city }}</li>
    </ul>
  </div>
</template>

<style scoped>
.error {
  margin-left: 5px;
  color: red;
}

.error-box {
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
