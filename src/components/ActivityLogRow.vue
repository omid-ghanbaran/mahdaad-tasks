<template>
  <div
    class="grid grid-cols-12 p-4 border-b hover:bg-gray-50 transition-colors"
    :style="{ height: `${rowHeight}px` }"
  >
    <div class="col-span-1 truncate" :title="log.id">{{ log.id }}</div>

    <div class="col-span-2 truncate" :title="log.user">{{ log.user }}</div>

    <div class="col-span-2 truncate" :title="log.action">{{ log.action }}</div>

    <div class="col-span-4 truncate" :title="log.details">{{ log.details }}</div>

    <div class="col-span-2 truncate" :title="formatDate(log.timestamp, true)">
      {{ formatDate(log.timestamp) }}
    </div>

    <div class="col-span-1">
      <span
        :class="{
          'bg-green-100 text-green-800': log.status === 'success',
          'bg-red-100 text-red-800': log.status === 'failed',
          'bg-yellow-100 text-yellow-800': log.status === 'pending',
        }"
        class="px-2 py-1 rounded-full text-xs truncate inline-block w-full"
        :title="log.status"
      >
        {{ log.status }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  log: {
    type: Object,
    required: true,
  },
  rowHeight: {
    type: Number,
    default: 60,
  },
})

const formatDate = (timestamp, full = false) => {
  const date = new Date(timestamp)
  return full ? date.toLocaleString() + ' (' + date.toISOString() + ')' : date.toLocaleString()
}
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
}

.truncate:hover::after {
  content: attr(title);
  position: absolute;
  left: 0;
  top: 100%;
  background: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: normal;
  z-index: 100;
  min-width: 200px;
  max-width: 400px;
}
</style>
