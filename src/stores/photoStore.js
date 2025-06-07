import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePhotoStore = defineStore('photo', () => {
  const photos = ref([]) // Все загруженные фото
  const albumIds = ref([]) // ID альбомов для фильтра
  const albumIdsField = computed({
    // Переменная для работы с формой поиска
    get: () => albumIds.value.join(' '),
    set: (input) => {
      const ids = input.trim().split(/\s+/).map(Number).filter(Boolean)
      albumIds.value = ids

      localStorage.setItem(localAlbumKey, JSON.stringify(ids))
    },
  })
  const isLoading = ref(false) // Статус загрузки
  const error = ref(null) // Состояние ошибки

  const theme = ref('light') // Текущая тема
  const localThemeKey = 'bb-tt_theme' // Ключ темы для localStorage

  const sortKey = ref('id') // Текущий ключ сортировки
  const sortOrder = ref('asc') // asc | desc

  const limit = ref(30) // Сколько показываем
  const localAlbumKey = 'bb-tt_albumIds' // Ключ идентификаторов альбомов для localStorage

  const filteredAndSorted = computed(() => {
    // Отфильтрованные и отсортированные фото
    const sorted = [...photos.value].sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]
      return sortOrder.value === 'asc' ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1
    })
    return sorted
  })

  const visiblePhotos = computed(() => filteredAndSorted.value.slice(0, limit.value)) // Отображаемые фото

  // === ФОТО ===

  async function fetchPhotos() {
    isLoading.value = true
    error.value = null
    try {
      let url = 'https://jsonplaceholder.typicode.com/photos'
      if (albumIds.value.length > 0) {
        const query = albumIds.value.map((id) => `albumId=${id}`).join('&')
        url += `?${query}`
      }
      const res = await fetch(url)
      let data = await res.json()

      data = data.map((item) => ({
        ...item,
        url: `https://picsum.photos/id/${item.id % 100}/600/400`,
        thumbnailUrl: `https://picsum.photos/id/${item.id % 100}/150/150`,
      }))

      photos.value = data
      limit.value = 30
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  function loadAlbumIdsFromStorage() {
    const stored = localStorage.getItem(localAlbumKey)

    if (stored) {
      albumIds.value = JSON.parse(stored)
    }
  }

  function sortBy(key) {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
    limit.value = 30
  }

  function loadMore() {
    limit.value += 30
  }

  // === ТЕМА ===

  function setTheme(newTheme) {
    theme.value = newTheme
    localStorage.setItem(localThemeKey, newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  function loadThemeFromStorage() {
    const saved = localStorage.getItem(localThemeKey)
    setTheme(saved)
  }

  return {
    photos,
    visiblePhotos,
    isLoading,
    error,
    albumIds,
    albumIdsField,
    theme,
    fetchPhotos,
    setTheme,
    loadAlbumIdsFromStorage,
    loadThemeFromStorage,
    sortKey,
    sortOrder,
    sortBy,
    loadMore,
  }
})
