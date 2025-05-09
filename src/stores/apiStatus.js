import { defineStore } from 'pinia'
import { ref } from 'vue'
import { safeApiCall } from '@/api/axiosWithCircuitBreaker'

export const useApiStatusStore = defineStore('apiStatus', () => {
  const apiStatus = ref('unknown')
  const errorCount = ref(0)
  const errorMessage = ref('')
  const countdown = ref(0)

  let retryTimer = null
  let countdownInterval = null

  const startCountdown = (seconds) => {
    clearCountdown()
    countdown.value = seconds
    countdownInterval = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearCountdown()
      }
    }, 1000)
  }

  const clearCountdown = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
    if (retryTimer) {
      clearTimeout(retryTimer)
      retryTimer = null
    }
  }

  const fetchData = async (endpoint) => {
    try {
      const response = await safeApiCall({
        method: 'get',
        url: endpoint,
      })

      apiStatus.value = 'available'
      errorCount.value = 0
      errorMessage.value = ''
      clearCountdown()

      return response.data
    } catch (error) {
      errorCount.value++

      if (error.isCircuitOpen) {
        apiStatus.value = 'unavailable'
        errorMessage.value = error.message
        startCountdown(error.remainingTime)

        retryTimer = setTimeout(() => {
          apiStatus.value = 'available'
          errorCount.value = 0
          fetchData(endpoint)
        }, error.remainingTime * 1000)
      } else {
        errorMessage.value = `خطا در ارتباط با سرور (${errorCount.value}/3)`

        if (errorCount.value >= 3) {
          apiStatus.value = 'unavailable'
          startCountdown(60)

          retryTimer = setTimeout(() => {
            apiStatus.value = 'available'
            errorCount.value = 0
            fetchData(endpoint)
          }, 60000)
        }
      }

      throw error
    }
  }

  const initialize = (endpoint, autoFetch = false) => {
    if (autoFetch) {
      fetchData(endpoint)
    }
  }

  return {
    apiStatus,
    errorCount,
    errorMessage,
    countdown,
    fetchData,
    initialize,
    clearCountdown,
  }
})
