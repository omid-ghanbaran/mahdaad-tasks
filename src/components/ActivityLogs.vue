<template>
  <div class="container mx-auto p-4 max-w-6xl">
    <h1 class="text-2xl font-bold mb-6">User Activity Logs</h1>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="grid grid-cols-12 bg-gray-100 p-4 font-semibold border-b">
        <div class="col-span-1">ID</div>
        <div class="col-span-2">User</div>
        <div class="col-span-2">Action</div>
        <div class="col-span-4">Details</div>
        <div class="col-span-2">Timestamp</div>
        <div class="col-span-1">Status</div>
      </div>

      <div
        ref="scrollContainer"
        class="relative overflow-y-auto"
        :style="{ height: dynamicContainerHeight }"
        @scroll="handleScroll"
      >
        <div :style="{ height: dynamicContainerHeight }">
          <div
            v-for="log in visibleLogs"
            :key="log.id"
            :style="{ transform: `translateY(${log.offset}px)` }"
            class="absolute w-full"
          >
            <ActivityLogRow :log="log" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 text-sm text-gray-600">
      Showing {{ Math.min(logs.length, totalLogs) }} of {{ totalLogs }} logs
      <span v-if="loading" class="p-4 text-center text-gray-500">Loading more logs...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ActivityLogRow from '@/components/ActivityLogRow.vue'

const rowHeight = 60
const buffer = 15
const itemsPerLoad = 10
const loadThreshold = 0.7

const scrollContainer = ref(null)

const logs = ref([])
const loading = ref(false)
const scrollTop = ref(0)
const totalLogs = ref(10000)
const windowHeight = ref(window.innerHeight)

const dynamicContainerHeight = computed(() => {
  return `${windowHeight.value * 0.6}px`
})

const fetchLogs = async (startIndex, count = itemsPerLoad) => {
  if (loading.value || logs.value.length >= totalLogs.value) return

  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 300))

  const newLogs = Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    user: `user${Math.floor(Math.random() * 1000)}`,
    action: ['login', 'logout', 'purchase', 'view', 'edit'][Math.floor(Math.random() * 5)],
    details: `Action details for log ${startIndex + i}. ${'Some logs have more text than others '.repeat(Math.floor(Math.random() * 3))}`,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: ['success', 'failed', 'pending'][Math.floor(Math.random() * 3)],
  }))

  logs.value = [...logs.value, ...newLogs]
  loading.value = false
}

const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / rowHeight) - buffer)
})

const endIndex = computed(() => {
  return Math.min(
    logs.value.length - 1,
    Math.floor((scrollTop.value + parseInt(dynamicContainerHeight.value)) / rowHeight) + buffer,
  )
})

const visibleLogs = computed(() => {
  return logs.value.slice(startIndex.value, endIndex.value + 1).map((log, i) => ({
    ...log,
    offset: (startIndex.value + i) * rowHeight,
  }))
})

const handleScroll = () => {
  if (!scrollContainer.value || loading.value) return

  scrollTop.value = scrollContainer.value.scrollTop

  const distanceToBottom =
    scrollContainer.value.scrollHeight -
    (scrollContainer.value.scrollTop + scrollContainer.value.clientHeight)

  if (distanceToBottom < 20 && logs.value.length < totalLogs.value) {
    fetchLogs(logs.value.length, itemsPerLoad)
  }
}

const handleResize = () => {
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  fetchLogs(0, itemsPerLoad)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
