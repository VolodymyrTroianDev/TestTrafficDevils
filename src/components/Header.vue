<template>
  <header class="header">
    <nav class="header__nav">
      <ul class="header__nav__btn-group">
        <router-link
          v-role="{ allowedRoles: [PermissionEnum.ADMIN, PermissionEnum.MENTOR, PermissionEnum.USER], role: userInfo.role }"
          class="header__btn"
          active-class="header__btn--active"
          tag="li"
          to="/"
        >
          Home
        </router-link>
        <router-link
          v-role="{ allowedRoles: [PermissionEnum.ADMIN, PermissionEnum.MENTOR], role: userInfo.role }"
          class="header__btn"
          active-class="header__btn--active"
          tag="li"
          to="/users"
        >
          Users
        </router-link>
        <router-link
          v-role="{ allowedRoles: [PermissionEnum.ADMIN, PermissionEnum.MENTOR, PermissionEnum.USER], role: userInfo.role }"
          class="header__btn"
          active-class="header__btn--active"
          tag="li"
          to="/books"
        >
          Books list
        </router-link>
      </ul>

      <button class="header__btn" @click="login">{{ statusAuth ? 'Logout' : 'Login' }}
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { PermissionEnum } from "@/enums/PermissionsEnum";

const router = useRouter(),
  authStore = useAuthStore(),
  { statusAuth, userInfo } = storeToRefs(authStore);

const login = () => {
  if (statusAuth.value) {
    authStore.logout();
    router.push({ 'name': 'Home' })
  } else router.push({ 'name': 'Login' })
}
</script>

<style scoped lang="scss">
.header {
  background-color: var(--gray-bg-color);
  height: 100%;
  padding: 0 20px;
  min-height: 60px;
  display: flex;
  justify-content: end;

  &__nav {
    display: flex;

    gap: 2rem;
    align-items: center;

    &__btn-group {
      display: flex;
      align-items: center;
      gap: 2rem;
      color: white;
    }

    @media (max-width: 500px) {
      flex-direction: column;
      justify-content: center;
      gap: 0;
    }
  }

  &__btn {
    &--active {
      color: var(--active-color);
      text-decoration: underline;
      text-underline-offset: 0.5rem;
    }
  }

  @media (max-width: 500px) {
    justify-content: center;
    padding: 10px 0 10px 0;
  }
}
</style>

