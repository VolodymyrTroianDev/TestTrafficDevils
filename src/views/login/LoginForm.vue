<template>
  <div class="wrapper__main">
    <div class="form-container">
      <MyForm
        @submit="onSubmit"
        :validation-schema="validationSchema"
        v-slot="{ values }"
      >
        <header class="form-header">
          <span class="form-header__title">Sign In</span>
        </header>
        <section class="form-section">
          <Field
            name="login"
            v-slot="{ field, handleChange }"
          >
            <MyInput
              class="form-input"
              v-model="field.value"
              v-bind="field"
              @change="(event) => handleChange(event, true)"
              type="text"
            >
              Login
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
            name="password"
            class="form-error"
            as="div"
          />
        </section>
        <footer class="form-footer">
          <button
            type="submit"
            class="form-button"
          >
            Login
          </button>
        </footer>
      </MyForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, Field, Form as MyForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from 'yup';

const router = useRouter(),
  authStore = useAuthStore(),
  messageStore = useMessageStore();

interface User {
  login: string;
  password: string;
}

onMounted(async () => {
  if (authStore.usersList.length < 1) {
    await authStore.initializeUsersList();
  }
});

const onSubmit = async (user: User): Promise<void> => {
  try {
    await authStore.login(user);
    await router.push({ name: 'Home' })
    await messageStore.updateMessageAlert("Success", "Success login");
  } catch (e) {
    await messageStore.updateMessageAlert("Error", e);
  }
};

const validationSchema = computed(() => {
  return toTypedSchema(
    object({
      login: string().required().label("User name"),
      password: string().required().label("Password"),
    })
  )
})
</script>

<style scoped lang="scss">
.wrapper__main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 100%;
  max-width: 450px;
  min-height: fit-content;
  background-color: var(--gray-bg-color);
  gap: 1.25rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
}

.form-header {
  background-color: #272727;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  height: 3rem;
}

.form-header__title {
  color: #f9fafb;
}

.form-section {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  justify-content: space-between;
  gap: 1.25rem;
}
</style>
