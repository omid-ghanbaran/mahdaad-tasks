<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">داشبورد مالی</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="stock in stocks"
        :key="stock.symbol"
        class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <h3 class="text-lg font-semibold">{{ stock.symbol }}</h3>
        <p class="text-2xl font-bold" :class="getPriceColor(stock.change)">
          ${{ stock.price?.toFixed(2) || '--' }}
        </p>
        <p :class="getChangeColor(stock.change)">
          {{ stock.change ? (stock.change >= 0 ? '+' : '') + stock.change.toFixed(2) + '%' : '--' }}
        </p>
      </div>
    </div>

    <div class="mt-6 space-y-4">
      <button
        @click="fetchStockData"
        :disabled="apiStatus === 'unavailable' || isRefreshing"
        class="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span v-if="isRefreshing">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          در حال بروزرسانی...
        </span>
        <span v-else-if="apiStatus === 'unavailable'">سرویس موقتاً غیرفعال</span>
        <span v-else>{{ hasData ? 'بروزرسانی داده‌ها' : 'دریافت داده‌ها' }}</span>
      </button>

      <div
        v-if="apiStatus === 'unavailable'"
        class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              سیستم پس از ۳ خطای متوالی به مدت ۱ دقیقه غیرفعال شد.
              <span class="font-medium">زمان باقیمانده: {{ countdown }} ثانیه</span>
            </p>
          </div>
        </div>
        <div class="mt-3">
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-yellow-400 h-2.5 rounded-full"
              :style="{ width: `${countdownPercentage}%` }"
            ></div>
          </div>
        </div>
      </div>

      <div v-if="showErrorAlert" class="bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useApiStatusStore } from '@/stores/apiStatus'
import { storeToRefs } from 'pinia'

const apiStatusStore = useApiStatusStore()
const { apiStatus, errorMessage, errorCount, countdown } = storeToRefs(apiStatusStore)

const stocks = ref([])
const isRefreshing = ref(false)
const hasData = ref(false)
const initialLoad = ref(true)

const getPriceColor = (change) => {
  return change >= 0 ? 'text-green-600' : 'text-red-600'
}

const getChangeColor = (change) => {
  return change >= 0 ? 'text-green-500' : 'text-red-500'
}

const countdownPercentage = computed(() => {
  return (countdown.value / 60) * 100
})

const showErrorAlert = computed(() => {
  return errorMessage.value && (apiStatus.value !== 'unavailable' || initialLoad.value)
})

const fetchStockData = async () => {
  try {
    initialLoad.value = false
    isRefreshing.value = true
    const data = await apiStatusStore.fetchData('/stocks')
    stocks.value = data.map((stock) => ({
      symbol: stock.symbol,
      price: stock.current_price,
      change: stock.percentage_change,
    }))
    hasData.value = true
  } catch (error) {
    console.error('خطا در دریافت داده‌ها:', error)
  } finally {
    isRefreshing.value = false
  }
}

watch(countdown, (newValue, oldValue) => {
  if (newValue === 0 && oldValue > 0) {
    fetchStockData()
  }
})

onMounted(() => {
  apiStatusStore.initialize('/stocks', false)
})
</script>

<style scoped>
.progress-bar {
  transition: width 1s linear;
}
</style>
