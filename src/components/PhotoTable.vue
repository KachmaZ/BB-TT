<template>
  <div class="flex justify-center">
    <div
      class="w-[600px] h-[600px] overflow-y-auto border rounded-lg shadow-md dark:border-gray-700"
    >
      <table class="w-full table-auto border-collapse text-sm">
        <thead class="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
          <tr>
            <th v-for="col in columns" :key="col.key" class="p-2 text-left border-b">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in mockData"
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
    </div>
  </div>
</template>

<script setup>
const columns = [
  { key: 'id', label: 'Ид' },
  { key: 'albumId', label: 'Альбом' },
  { key: 'title', label: 'Название' },
  { key: 'url', label: 'Ссылка' },
  { key: 'thumbnailUrl', label: 'Миниатюра' },
]

const mockData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  albumId: (i % 5) + 1,
  title: 'Заглушка заголовка ' + (i + 1),
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952',
}))
</script>
