import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: null,
    user: {
      user_id: null,
      role: null,
      username: '',
      email: '',
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isUserRole: (state) => state.user.role === 'users',
    isAdminRole: (state) => state.user.role === 'admin',
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUser(user) {
      this.user = { ...this.user, ...user };
    },
    clearAuth() {
      this.token = null;
      this.user = {
        user_id: null,
        role: null,
        username: '',
        email: '',
      };
    },
    logout() {
      this.clearAuth();
    },
  },
});
