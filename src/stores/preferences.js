import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore('preferences', () => {
  // default
  const defaultPreferences = {
    theme: 'light',
    fontSize: 'medium',
  }

  const loadPreferences = () => {
    const saved = localStorage.getItem('userPreferences')
    return saved ? JSON.parse(saved) : defaultPreferences
  }

  const preferences = ref(loadPreferences())

  const theme = computed(() => preferences.value.theme)
  const fontSize = computed(() => preferences.value.fontSize)

  // actions

  const setTheme = (newTheme) => {
    preferences.value.theme = newTheme
    savePreferences()
  }

  const setFontSize = (newSize) => {
    preferences.value.fontSize = newSize
    savePreferences()
  }

  const savePreferences = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences.value))
  }

  return {
    preferences,
    theme,
    fontSize,
    setTheme,
    setFontSize,
  }
})
