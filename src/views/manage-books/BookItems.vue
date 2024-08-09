<template>
  <div class="card-container">
    <div class="card" v-for="book in booksList" :key="book.id">
      <div class="card__header">
        <router-link
          v-role="{
            allowedRoles: [PermissionEnum.ADMIN, PermissionEnum.MENTOR, PermissionEnum.USER],
            role: book.authorRole,
            book
          }"
          class="card__header-btn"
          tag="div"
          :to="`books/edit/${book.id}`"
        >
          <img src="./../../assets/edit.svg" width="15" alt="edit">
        </router-link>
        <button
          v-role="{
            allowedRoles: [PermissionEnum.ADMIN, PermissionEnum.MENTOR],
            role: book.authorRole,
            book
          }"
          @click="bockStore.deleteBook(book.id)" class="card__header-btn"
        >
          <img src="./../../assets/delete.svg" width="15" alt="delete">
        </button>
      </div>
      <section class="card__main">
        <h2>{{ book.title }}</h2>
        <p><strong>Автор:</strong> {{ book.authors }}</p>
        <p><strong>Рік видавництва:</strong> {{ book.publishedDate }}</p>
      </section>
      <section class="card__footer">
        <button @click="toggleDescription(book.id)">
          {{ book.showDescription ? 'Сховати опис' : 'Показати опис' }}
        </button>
        <p :class="{ 'description': true, 'description--visible': book.showDescription }">{{ book.description }}</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PermissionEnum } from "@/enums/PermissionsEnum";

const props = defineProps<{
  booksList: {
    id: string,
    title: string,
    authors: string[],
    publishedDate: string
  }[]
}>();

const router = useRouter(),
  authStore = useAuthStore(),
  bockStore = useBooksStore();

const toggleDescription = (id: string): void => {
  const book = props.booksList.find(book => book.id === id);
  if (book) {
    book.showDescription = !book.showDescription;
  }
};
</script>

<style scoped lang="scss">
.card-container {
  .card {
    .description--visible {
      max-height: 300px;
      padding: 0 10px 0 10px;
      overflow-y: auto;
      opacity: 1;
    }
  }
}
</style>
