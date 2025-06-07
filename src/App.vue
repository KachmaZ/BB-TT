<template>
  <div class="photo-table_wrapper flex justify-center items-center p-4">
    <div class="photo-table flex flex-col">
      <div class="photo-table_controls flex justify-between items-center mb-4">
        <ThemeToggle />
        <AlbumFilter />
      </div>
      <PhotoTable />
    </div>
  </div>
</template>

<script setup>
import AlbumFilter from './components/AlbumFilter.vue'
import PhotoTable from './components/PhotoTable.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import { onMounted } from 'vue'
import { usePhotoStore } from '@/stores/photoStore'

const { loadAlbumIdsFromStorage, fetchPhotos, loadThemeFromStorage } = usePhotoStore()

onMounted(async () => {
  loadAlbumIdsFromStorage()
  loadThemeFromStorage()
  await fetchPhotos()
})
</script>
