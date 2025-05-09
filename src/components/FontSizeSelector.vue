<script setup>
import { usePreferencesStore } from '@/stores/preferences'

const preferences = usePreferencesStore()
</script>

<template>
  <div class="flex items-center space-x-2">
    <button
      v-for="size in ['small', 'medium', 'large']"
      :key="size"
      @click="preferences.setFontSize(size)"
      class="px-4 py-2 rounded-lg transition-all"
      :class="{
        'bg-blue-500 text-white': preferences.fontSize === size,
        'bg-gray-200 text-gray-700': preferences.fontSize !== size,
      }"
    >
      {{ size }}
    </button>
  </div>
</template>
