<template>
  <div class="flex gap-4 items-center">
    <input
      v-model="albumIdsField"
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
import { storeToRefs } from 'pinia'
import { usePhotoStore } from '../stores/photoStore'

const store = usePhotoStore()
const { albumIdsField } = storeToRefs(store)
const { fetchPhotos } = store

const onSearch = async () => {
  await fetchPhotos()
}
</script>
