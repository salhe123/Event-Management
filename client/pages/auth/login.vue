<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/UseAuth';

const { login, error } = useAuth();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  await login(email.value, password.value);
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-lg">
      <h2 class="text-3xl font-bold text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              class="p-3 mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              v-model="password"
              class="p-3 mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Login
          </button>
        </div>
      </form>
      <p class="text-center text-sm text-gray-600">
        Don't have an account?
        <nuxt-link to="/auth/signup" class="text-blue-600 hover:underline">Sign up</nuxt-link>
      </p>
    </div>
  </div>
</template>
