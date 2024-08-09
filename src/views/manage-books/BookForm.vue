<template>
  <div class="wrapper__main">
    <MyForm
      @submit="onSubmit"
      v-if="!isLoading"
      :initial-values="initialValues"
      :validation-schema="validationSchema"
      v-slot="{ values }"
    >
      <div class="edit-book">
        <section class="edit-book__header">
          <h2>{{ route.params.id ? "Edit Book" : "Create Book" }}</h2>
        </section>
        <section class="edit-book__main">
          <Field
            name="title"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="form-input"
              type="text"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
            >
              Title
            </MyInput>
          </Field>
          <ErrorMessage
            name="title"
            class="form-error"
            as="div"
          />
          <Field
            name="authors"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="form-input"
              type="text"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
            >
              Authors
            </MyInput>
          </Field>
          <ErrorMessage
            name="authors"
            class="form-error"
            as="div"
          />
          <Field
            name="publishedDate"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="form-input"
              type="text"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
            >
              Published Date
            </MyInput>
          </Field>
          <ErrorMessage
            name="publishedDate"
            class="form-error"
            as="div"
          />
          <Field
            name="description"
            v-slot="{ field, handleChange }"
          >
            <MyTextArea
              class="form-input"
              type="textarea"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
            >
              Description
            </MyTextArea>
          </Field>
          <ErrorMessage
            name="description"
            class="form-error"
            as="div"
          />
          <Field
            name="authorRole"
            v-slot="{ field, handleChange }"
            :value="userInfo.role"
          >
            <input
              class="form-input"
              v-model="field.value"
              type="hidden"
            />
          </Field>
        </section>
        <section class="edit-book__footer">
          <button
            type="button"
            @click="router.back()"
          >
            Cancel
          </button>
          <button
            type="submit"
          >
            Save
          </button>
        </section>
      </div>
    </MyForm>
  </div>
</template>
<script setup lang="ts">
import { ErrorMessage, Field, Form as MyForm } from "vee-validate";
import { Book } from "../../types/BooksTypes.ts";

const route = useRoute(),
  router = useRoute(),
  booksStore = useBooksStore(),
  authStore = useAuthStore(),
  { userInfo } = storeToRefs(authStore),
  { booksList, isLoading } = storeToRefs(booksStore);

const initialValues = computed(() => {
  if (booksList.value && booksList.value.length > 0 && route.params.id) {
    const filteredBook = booksList.value.filter(book => book.id === route.params.id)
    return { ...filteredBook[filteredBook?.length - 1] }
  }
})

const onSubmit = (values: Book): void => {
  route.params.id ? booksStore.updateBook(values) : booksStore.createBook(values);
  router.back();
}
</script>

<style scoped lang="scss">
.edit-book {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  &__footer {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
}
</style>
