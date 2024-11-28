<template>
  <div
    v-if="visible"
    :class="alertClass"
    class="fixed top-20 right-4 md:right-8 px-6 py-4 rounded-lg shadow-lg transition-all z-50 max-w-xs w-full"
    role="alert"
  >
    <p class="text-sm md:text-base font-medium">{{ message }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success',
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const alertClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'bg-red-500 text-white';
    case 'success':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
});
</script>

<style scoped>
/* Add custom transition and shadow for alert visibility */
.transition-all {
  transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
  /* For small screens, adjust the positioning */
  .fixed {
    top: 16px; /* Adjust top space for smaller screens */
    right: 4px; /* Ensure it doesn't go off the screen */
  }
}
</style>
