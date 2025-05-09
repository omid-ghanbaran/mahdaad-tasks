import axios from 'axios'

const circuit = {
  failureCount: 0,
  lastFailureTime: null,
  isOpen: false,
  resetAfter: 60000,
}

const instance = axios.create({
  baseURL: 'https://api.example.com/financial-data',
  timeout: 10000,
})

const shouldTriggerFailure = (error) => {
  return !error.response || error.response.status >= 500
}

instance.interceptors.response.use(
  (response) => {
    circuit.failureCount = 0
    return response
  },
  (error) => {
    if (shouldTriggerFailure(error)) {
      circuit.failureCount++
      circuit.lastFailureTime = Date.now()

      if (circuit.failureCount >= 3) {
        circuit.isOpen = true
        setTimeout(() => {
          circuit.isOpen = false
          circuit.failureCount = 0
        }, circuit.resetAfter)
      }
    }

    return Promise.reject(error)
  },
)

export const safeApiCall = async (config) => {
  if (circuit.isOpen) {
    const remaining = Math.ceil(
      (circuit.resetAfter - (Date.now() - circuit.lastFailureTime)) / 1000,
    )
    throw {
      message: `سرویس موقتاً غیرفعال است. لطفاً پس از ${remaining} ثانیه تلاش کنید.`,
      isCircuitOpen: true,
      remainingTime: remaining,
    }
  }

  return instance(config)
}
