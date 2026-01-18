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
    <h3>History</h3>
    <ul>
      <li v-for="item in props.items" :key="item">
        <button @click="onSelect(item)">{{ item }}</button>
        <button @click="onDelete(item)">Delete</button>
      </li>
    </ul>
  </div>
</template>
