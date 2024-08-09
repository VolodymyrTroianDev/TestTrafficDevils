<template>
  <div class="wrapper">
    <router-view name="header"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
  <MyAlert/>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  &__main {
    padding: 20px;
    flex: 1 1 auto;
  }
}
</style>

