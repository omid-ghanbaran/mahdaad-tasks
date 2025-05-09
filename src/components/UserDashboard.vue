<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex items-center gap-4">
        <input
          v-model="inputUserId"
          @keyup.enter="fetchData"
          type="text"
          placeholder="Enter User ID"
          class="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="fetchData"
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Loading...' : 'Fetch Data' }}
        </button>
      </div>
    </div>

    <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
      <p>{{ error }}</p>
    </div>

    <div v-if="userData" class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">User Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-600">User ID:</p>
            <p class="font-medium">{{ userData.id }}</p>
          </div>
          <div>
            <p class="text-gray-600">Name:</p>
            <p class="font-medium">{{ userData.name }}</p>
          </div>
          <div>
            <p class="text-gray-600">Email:</p>
            <p class="font-medium">{{ userData.email }}</p>
          </div>
          <div>
            <p class="text-gray-600">Join Date:</p>
            <p class="font-medium">{{ userData.joinDate }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-6 border-t">
        <h2 class="text-xl font-semibold mb-4">Statistics</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <p class="text-blue-600">Posts</p>
            <p class="text-2xl font-bold">{{ userData.stats.posts }}</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <p class="text-green-600">Followers</p>
            <p class="text-2xl font-bold">{{ userData.stats.followers }}</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <p class="text-purple-600">Following</p>
            <p class="text-2xl font-bold">{{ userData.stats.following }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="Object.keys(cache).length > 0" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Cached Users</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="(cachedUser, userId) in cache"
          :key="userId"
          @click="((inputUserId = userId), fetchData())"
          class="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition"
        >
          <p class="font-medium">{{ cachedUser.name }}</p>
          <p class="text-sm text-gray-600">ID: {{ userId }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { fetchUserData } from '@/api'

const inputUserId = ref('')
const userData = ref(null)
const isLoading = ref(false)
const error = ref(null)
const cache = ref({})
let currentRequestId = 0

const fetchData = async () => {
  const userId = inputUserId.value.trim()
  if (!userId) {
    error.value = 'Please enter a User ID'
    return
  }

  if (cache.value[userId]) {
    userData.value = cache.value[userId]
    error.value = null
    return
  }

  const requestId = ++currentRequestId
  isLoading.value = true
  error.value = null

  try {
    const data = await fetchUserData(userId)

    if (requestId === currentRequestId) {
      userData.value = data
      cache.value[userId] = data
    }
  } catch (err) {
    if (requestId === currentRequestId) {
      error.value = `Failed to fetch user data: ${err.message}`
    }
  } finally {
    if (requestId === currentRequestId) {
      isLoading.value = false
    }
  }
}

watch(inputUserId, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    fetchData()
  }
})
</script>
