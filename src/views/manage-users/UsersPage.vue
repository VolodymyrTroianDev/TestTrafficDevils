<template>
  <div class="wrapper__main">
    <div class="wrapper__main__filter-panel">
      <MyInput v-model="searchValue">
        Search User:
      </MyInput>
      <button
        @click="router.push({ name: 'CreateUsers' })"
        class="wrapper__main__filter-panel-btn"
      >
        Added User
      </button>
    </div>
    <UserItem :users-list="filteredUsersList"/>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore(),
  router = useRouter(),
  searchValue = ref<string>(""),
  { usersList } = storeToRefs(authStore);

const filteredUsersList = computed(() => {
  if (usersList.value.length > 0) {
    return usersList.value.filter(user => user.login.toLowerCase().includes(searchValue.value.toLowerCase()));
  }
})
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
