<template>
  <div class="card-container">
    <div class="card" v-for="user in props.usersList" :key="user.id">
      <div class="card__header">
        <router-link
          v-role="{ allowedRoles: [PermissionEnum.ADMIN], role: userInfo.role }"
          class="card__header-btn"
          tag="div"
          :to="`users/edit/${user.id}`"
        >
          <img src="./../../assets/edit.svg" width="15" alt="edit">
        </router-link>
        <button
          v-role="{ allowedRoles: [PermissionEnum.ADMIN], role: userInfo.role }"
          @click="bockStore.deleteBook(user.id)"
          class="card__header-btn"
        >
          <img src="./../../assets/delete.svg" width="15" alt="delete">
        </button>
      </div>
      <section class="card__main">
        <p><strong>Name:</strong> {{ user.login }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PermissionEnum } from "@/enums/PermissionsEnum";

const props = defineProps<{
  usersList: {
    id: string,
    login: string,
    role: string
  }[]
}>();

const router = useRouter(),
  authStore = useAuthStore(),
  { userInfo } = storeToRefs(authStore),
  bockStore = useBooksStore();
</script>

<style scoped lang="scss">
.card-container {
  .card {
    .description--visible {
      max-height: 100%;
      opacity: 1;
    }
  }
}
</style>
