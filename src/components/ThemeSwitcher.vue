<script setup>
import { usePreferencesStore } from '@/stores/preferences'

const preferences = usePreferencesStore()
</script>

<template>
  <div class="flex items-center space-x-2">
    <button
      @click="preferences.setTheme('light')"
      class="px-4 py-2 rounded-lg transition-all"
      :class="{
        'bg-blue-500 text-white': preferences.theme === 'light',
        'bg-gray-200 text-gray-700': preferences.theme !== 'light',
      }"
    >
      light
    </button>
    <button
      @click="preferences.setTheme('dark')"
      class="px-4 py-2 rounded-lg transition-all"
      :class="{
        'bg-blue-500 text-white': preferences.theme === 'dark',
        'bg-gray-200 text-gray-700': preferences.theme !== 'dark',
      }"
    >
      Dark
    </button>
  </div>
</template>
