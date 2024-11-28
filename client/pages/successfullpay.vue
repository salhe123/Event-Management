<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
</style>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
      <div class="text-green-500 text-6xl mb-6">✔️</div>
      <h1 class="text-3xl font-semibold text-green-500 mb-4">Payment Successful!</h1>
      <p class="text-lg text-gray-700 mb-2">Thank you for your payment.</p>
      <p class="text-lg text-gray-700 mb-6">
        Your transaction was successful.
      </p>
      <button
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 w-full"
        @click="goHome"
      >
        Return to Home
      </button>
    </div>
  </div>
</template>
