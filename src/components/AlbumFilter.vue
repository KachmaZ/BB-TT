<template>
  <div class="flex gap-4 items-center">
    <input
      v-model="input"
      class="border px-4 py-2 rounded w-64 dark:bg-gray-800 dark:border-gray-600"
      placeholder="ID альбомов (например: 1 2 3)"
    />
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      @click="onSearch"
    >
      Поиск
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const onSearch = () => {
  console.log('Нажат поиск, введено:', input.value)
}
</script>
