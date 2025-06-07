<template>
  <button
    class="text-sm py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 p-3"
    @click="toggleTheme"
  >
    {{ theme === 'dark' ? 'Тёмная тема' : 'Светлая тема' }}
  </button>
</template>

<script setup>
import { usePhotoStore } from '@/stores/photoStore'
import { storeToRefs } from 'pinia'

const store = usePhotoStore()

const { theme } = storeToRefs(store)
const { setTheme } = store

const toggleTheme = () => {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}
</script>
