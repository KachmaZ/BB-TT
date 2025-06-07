<template>
  <button
    class="text-sm py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 p-3"
    @click="toggle"
  >
    {{ isDark ? 'Светлая тема' : 'Тёмная тема' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggle = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
})
</script>
