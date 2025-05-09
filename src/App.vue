<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <router-link
          to="/"
          class="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          داشبورد مالی
        </router-link>

        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <router-link
            to="/"
            class="px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-blue-50 text-blue-600"
          >
            صفحه اصلی
          </router-link>
          <router-link
            to="/about"
            class="px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            active-class="bg-blue-50 text-blue-600"
          >
            درباره ما
          </router-link>
        </div>
      </div>
    </nav>

    <main class="flex-grow container mx-auto px-4 py-6">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-white border-t py-4">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>© 2025 سیستم مالی. تمام حقوق محفوظ است.</p>
      </div>
    </footer>

    <ApiStatusAlert />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useApiStatusStore } from '@/stores/apiStatus'

const apiStatus = useApiStatusStore()

onMounted(() => {
  apiStatus.initialize()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#app {
  font-family: 'Vazir', Arial, sans-serif;
  direction: rtl;
  text-align: right;
}

.rtl\:space-x-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}
</style>
