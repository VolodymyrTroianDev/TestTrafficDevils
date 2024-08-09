<template>
  <div class="wrapper__main">
    <MyForm
      @submit="onSubmit"
      v-if="!isLoading"
      :initial-values="initialValues"
      :validation-schema="validationSchema"
      v-slot="{ values }"
    >
      <div class="edit-user">
        <section class="edit-user__header">
          <h2>{{ route.params.id ? "Edit Book" : "Create Book" }}</h2>
        </section>
        <section class="edit-user__main">
          <Field
            name="login"
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
            name="login"
            class="form-error"
            as="div"
          />
          <Field
            name="password"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="form-input"
              type="password"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
            >
              Password
            </MyInput>
          </Field>
          <ErrorMessage
            name="login"
            class="form-error"
            as="div"
          />

          <div class="select-wrapper">
            <label for="select">User Role</label>
            <Field
              name="role"
              v-slot="{ field, handleChange }"
            >
              <select
                v-model="field.value"
                :value="field.value"
                @change="(event) => handleChange(event, true)"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="mentor">mentor</option>
              </select>
            </Field>
          </div>
        </section>
        <section class="edit-user__footer">
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
import type { User } from "../../types/UsersTypes.ts";

const route = useRoute(),
  router = useRouter(),
  authStore = useAuthStore(),
  { usersList } = storeToRefs(authStore);

const initialValues = computed(() => {
  if (usersList.value && usersList.value.length > 0 && route.params.id) {
    const filteredBook = usersList.value.filter(user => user.id === route.params.id)
    return filteredBook[filteredBook?.length - 1]
  }
})
const onSubmit = (values: User): void => {
  route.params.id ? authStore.updateUser(values) : authStore.createUser(values);
  router.back();
}
</script>

<style scoped lang="scss">
.edit-user {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;

    .select-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      select {
        width: 100%;
        max-height: 2.5rem;
        padding: 0.5rem;
        border: 1px solid var(--white-color);;
        border-radius: 0.375rem;
        background-color: var(--white-color);
        color: var(--gray-bg-color);
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
}
</style>
