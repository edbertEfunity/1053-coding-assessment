<script setup lang="ts">
const props = defineProps<{
  items: string[]
}>()

const emit = defineEmits<{
  (e: 'select', city: string): void
  (e: 'delete', city: string): void
}>()

function onSelect(item: string): void {
  emit('select', item)
}

function onDelete(item: string): void {
  emit('delete', item)
}
</script>

<template>
  <div v-if="props.items.length">
    <h4>History</h4>
    <div class="card">
      <ul>
        <li v-for="item in props.items" :key="item">
          <button class="btn btn-outline-secondary btn-sm" @click="onSelect(item)">
            {{ item }}
          </button>
          <button class="btn btn-outline-secondary btn-sm" @click="onDelete(item)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #7b7878;
  padding: 12px;
  border-radius: 10px;
}

button {
  padding: 8px 12px;
}
</style>
