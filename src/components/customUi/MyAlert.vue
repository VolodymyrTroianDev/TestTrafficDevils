<template>
  <Transition
    enter-from-class="alert-enter-from"
    leave-to-class="alert-leave-to"
    enter-active-class="alert-enter-active"
    leave-active-class="alert-leave-active"
  >
    <div
      v-if="messageStore.showAlert"
      class="alert"
      :class="{
        'alert--error': messageStore.message.type === 'Error',
        'alert--success': messageStore.message.type === 'Success',
        'alert--info': messageStore.message.type === 'Info',
        'alert--warning': messageStore.message.type === 'Warning',
      }"
    >
      <div class="alert__content">
        <div class="alert__content_header">
          <strong class="alert__title">
            {{ messageStore.message.type }}
          </strong>
          <button
            type="button"
            @click="messageStore.removeMessageAlert"
            class="alert__close-btn"
          >
            &#215;
          </button>
        </div>
        <span class="alert__text">{{ messageStore.message.text }}</span>
        <div class="alert__progress-bar">
          <div
            :style="{ width: messageStore.timerWidth + '%', transition: 'width .5s ease-out' }"
            class="alert__progress"
            :class="{
              'alert__progress--error': messageStore.message.type === 'Error',
              'alert__progress--success': messageStore.message.type === 'Success',
              'alert__progress--info': messageStore.message.type === 'Info',
              'alert__progress--warning': messageStore.message.type === 'Warning',
            }"
          >
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const messageStore = useMessageStore();

</script>
<style scoped lang="scss">
.alert {
  position: fixed;
  top: 0;
  right: 0;
  margin: 1rem;
  border: 1px solid;
  padding: 1rem;
  border-radius: 0.5rem;

  &--error {
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
  }

  &--success {
    background-color: #d4edda;
    color: #155724;
    border-color: #c3e6cb;
  }

  &--info {
    background-color: #d1ecf1;
    color: #0c5460;
    border-color: #bee5eb;
  }

  &--warning {
    background-color: #fff3cd;
    color: #856404;
    border-color: #ffeeba;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__close-btn {
    position: absolute;
    padding: 0;
    top: -6px;
    bottom: 0;
    right: 0;
    height: fit-content;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  &__title {
    font-weight: bold;
  }

  &__text {
    display: block;
  }

  &__progress-bar {
    width: 100%;
    background-color: #e2e3e5;
    border-radius: 0.25rem;
    height: 0.25rem;
    margin-top: 0.5rem;
    overflow: hidden;
  }

  &__progress {
    height: 100%;
    border-radius: 0.25rem;
    transition: width 0.5s ease-out;

    &--error {
      background-color: #dc3545;
    }

    &--success {
      background-color: #28a745;
    }

    &--info {
      background-color: #17a2b8;
    }

    &--warning {
      background-color: #ffc107;
    }
  }

  &-enter-from {
    transform: translateX(10px);
    opacity: 0;
  }

  &-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.5s;
  }
}
</style>

