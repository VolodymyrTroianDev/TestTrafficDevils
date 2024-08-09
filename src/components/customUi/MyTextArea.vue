<template>
  <div class="input-wrapper">
    <label for="textarea">
      <slot></slot>
    </label>
    <textarea
      @input="($event) => $emit('update:modelValue', $event.target.value)"
      :value="props.modelValue"
      class="textarea-field"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"])
const props = withDefaults(
  defineProps<{
    modelValue: string,
    placeholder: string
  }>(),
  {
    placeholder: "select"
  }
);
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & label {
    color: var(--white-color);
  }

  & .textarea-field {
    border: 0;
    border-radius: 0.375rem;
    padding: 0.5rem;
    outline: none;
    background-color: white;
    color: #1a1a1a;
    resize: vertical;
    min-height: 150px;

    &:focus-visible {
      outline: none;
    }
  }
}
</style>
