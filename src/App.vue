<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 pt-16 pb-16">
    <AppHeader />

    <main class="container mx-auto p-4 overflow-y-auto text-right">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold mb-4">عنوان محتوا</h2>

        <div class="space-y-4">
          <p class="text-gray-700">محتوای اصلی</p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="item in 3"
              :key="item"
              class="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <h3 class="font-semibold text-lg">آیتم {{ item }}</h3>
              <p class="text-gray-600">توضیحات آیتم {{ item }}</p>
            </div>
          </div>

          <div class="mt-8">
            <h3 class="text-xl font-semibold mb-2">محتوای طولانی</h3>
            <div class="h-96 overflow-y-auto border border-gray-200 p-4 rounded-lg">
              <p class="mb-4" v-for="i in 20" :key="i">خط شماره {{ i }} از محتوای قابل اسکرول .</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
