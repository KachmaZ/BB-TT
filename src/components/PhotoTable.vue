<template>
  <div class="flex justify-center">
    <div
      class="w-[600px] h-[600px] overflow-y-auto border rounded-lg shadow-md dark:border-gray-700"
      @scroll="onScroll"
    >
      <table class="w-full table-auto border-collapse text-sm">
        <thead class="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="p-2 text-left border-b cursor-pointer select-none"
              @click="sortColumn(col.key)"
            >
              {{ col.label }}
              <span v-if="sortKey === col.key">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in visiblePhotos"
            :key="item.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="p-2 border-b">{{ item.id }}</td>
            <td class="p-2 border-b">{{ item.albumId }}</td>
            <td class="p-2 border-b truncate max-w-[200px]" :title="item.title">
              {{ item.title }}
            </td>
            <td class="p-2 border-b truncate max-w-[200px]" :title="item.url">
              <a :href="item.url" class="text-blue-500 underline" target="_blank">Открыть</a>
            </td>
            <td class="p-2 border-b">
              <img :src="item.thumbnailUrl" class="w-10 h-10 rounded" />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoading" class="p-4 text-center text-gray-500">Загрузка...</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePhotoStore } from '../stores/photoStore'
import { storeToRefs } from 'pinia'

const store = usePhotoStore()
const { sortKey, sortOrder, visiblePhotos, isLoading } = storeToRefs(store)
const { loadMore, sortBy, fetchPhotos } = store

const onScroll = (e) => {
  const el = e.target
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
    loadMore()
  }
}

const sortColumn = (key) => {
  sortBy(key)
}

const columns = [
  { key: 'id', label: 'Ид' },
  { key: 'albumId', label: 'Альбом' },
  { key: 'title', label: 'Название' },
  { key: 'url', label: 'Ссылка' },
  { key: 'thumbnailUrl', label: 'Миниатюра' },
]

onMounted(async () => {
  await fetchPhotos()
})
</script>
