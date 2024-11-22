// authStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const user = ref<{ email: string } | null>(null); // Store user information

  // Load token and user data from localStorage if on the client side
  if (process.client) {
    token.value = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  }

  const setToken = (newToken: string, newUser: { email: string }) => {
    if (process.client) {
      localStorage.setItem('authToken', newToken); // Set token in localStorage
      localStorage.setItem('user', JSON.stringify(newUser)); // Set user in localStorage
    }
    token.value = newToken;
    user.value = newUser;
  };

  const clearAuth = () => {
    if (process.client) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user'); // Remove user from localStorage
    }
    token.value = null;
    user.value = null;
  };

  const getToken = computed(() => token.value);
  const getUser = computed(() => user.value);

  return { token, setToken, clearAuth, getToken, getUser };
});
