<script setup>
import { watchEffect } from 'vue'
import IconMahdaad from './components/icons/IconMahdaad.vue'
import FontSizeSelector from '@/components/FontSizeSelector.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { usePreferencesStore } from '@/stores/preferences'

const preferences = usePreferencesStore()

watchEffect(() => {
  document.documentElement.classList.toggle('dark', preferences.theme === 'dark')
})

watchEffect(() => {
  const sizes = {
    small: '14px',
    medium: '16px',
    large: '18px',
  }
  document.documentElement.style.fontSize = sizes[preferences.fontSize]
})
</script>

<template>
  <div
    class="min-h-screen p-8 transition-colors duration-300"
    :class="{
      'bg-gray-100 text-gray-900': preferences.theme === 'light',
      'bg-gray-900 text-gray-100': preferences.theme === 'dark',
    }"
  >
    <div class="max-w-4xl mx-auto">
      <div class="flex gap-5 items-center mb-5">
        <IconMahdaad />
        <h1 class="text-3xl font-bold mb-8">Mahdaad Dashboard</h1>
      </div>
      <div class="bg-white/10 p-6 rounded-xl backdrop-blur-sm mb-8">
        <h2 class="text-xl font-semibold mb-4">Preferences</h2>
        <div class="space-y-6">
          <div>
            <h3 class="font-medium mb-2">Theme</h3>
            <ThemeSwitcher />
          </div>
          <div>
            <h3 class="font-medium mb-2">Font Size</h3>
            <FontSizeSelector />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="p-6 rounded-xl backdrop-blur-sm"
          :class="{
            'bg-black/10': preferences.theme === 'light',
            'bg-white/10': preferences.theme !== 'dark',
          }"
        >
          <h2 class="">Blog 1</h2>
          <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
            industries for previewing layouts and visual mockups.
          </p>
        </div>
        <div
          class="p-6 rounded-xl backdrop-blur-sm"
          :class="{
            'bg-black/10': preferences.theme === 'light',
            'bg-white/10': preferences.theme !== 'dark',
          }"
        >
          <h2 class="">Blog 1</h2>
          <p>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
            industries for previewing layouts and visual mockups.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
