<template>
  <div class="wrapper__main">
    <div class="wrapper__main__filter-panel">
      <MyInput v-model="searchValue">
        Search Book:
      </MyInput>
      <button
        v-role="{ allowedRoles: ['admin', 'mentor', 'user'], role: userInfo.role }"
        @click="router.push({ name: 'CreateBooks' })"
        class="wrapper__main__filter-panel-btn"
      >
        Added Book
      </button>
    </div>
    <BookItems :booksList="filteredBooksList"/>
  </div>
</template>

<script setup lang="ts">
const booksStore = useBooksStore(),
  router = useRouter(),
  searchValue = ref<string>(""),
  authStore = useAuthStore(),
  { userInfo } = storeToRefs(authStore),
  { booksList } = storeToRefs(booksStore);

onMounted(async () => {
  if (booksList.value.length === 0) {
    await booksStore.getBooksList();
  }
})

const filteredBooksList = computed(() => {
  if (!searchValue.value) return booksList.value;
  return booksList.value.filter(book =>
    book.title.toLowerCase().includes(searchValue.value.toLowerCase())
  );
});
</script>

<style scoped lang="scss">
.wrapper__main {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__filter-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    max-height: 100px;
    background: var(--gray-bg-color);
    padding: 20px;
    gap: 1rem;
    @media (max-width: 500px) {
      flex-direction: column;
      gap: 1rem;
      max-height: 200px;
      &-btn {
        width: 100%;
      }
    }
    &-btn {
      height: 50px;
    }
  }
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 300px;
  max-height: 70px;
  @media (max-width: 500px) {
    width: 100%;
  }
}
</style>
