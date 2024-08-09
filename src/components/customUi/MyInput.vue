<template>
  <div class="input-wrapper">
    <label for="input">
      <slot></slot>
    </label>
    <input
      @input="($event) => $emit('update:modelValue', $event.target.value)"
      :value="props.modelValue"
      :type="type"
      class="input-field"
    >
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"])
const props = withDefaults(
  defineProps<{
    modelValue: string,
    type: string,
    placeholder: string
  }>(),
  {
    type: "text",
    placeholder: "select"
  }
);
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  gap: 0.75rem;
  & label {
    color: var(--white-color);
  }

  & .input-field {
    max-width: 100%;
    border: 0;
    border-radius: 0.375rem;
    max-height: 2.5rem;
    padding: 0.5rem;
    outline: none;
    background-color: white;
    color: #1a1a1a;

    &:focus-visible {
      outline: none;
    }
  }
}


</style>
