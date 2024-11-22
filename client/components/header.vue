<template>
  <header class="bg-white text-gray-800 shadow-md">
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Logo -->
      <div class="flex items-center">
        <img src="../assets/css/image/logo.png" alt="Logo" class="h-10 w-10 mr-2" />
      </div>

      <!-- Search Engine and Navigation Links -->
      <div class="flex items-center space-x-4">
        <!-- Search Bar -->
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            v-model="searchQuery"
            class="px-24 py-2 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div v-if="filteredResults.length > 0" class="absolute top-full mt-2 bg-white text-black rounded-lg shadow-lg w-full">
            <ul>
              <li
                v-for="result in filteredResults"
                :key="result.id"
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                @click="selectResult(result)"
              >
                {{ result.name }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Navigation Links on Right Side -->
        <router-link to="#" class="hover:text-blue-500 pl-20">Create Events</router-link>
      </div>

      <!-- User Authentication Links -->
      <div class="flex items-center space-x-4">
        <!-- Show Login and Sign Up only if not authenticated -->
        <router-link v-if="!isAuthenticated" to="/auth/login" class="hover:text-blue-500">
          Login
        </router-link>
        <router-link v-if="!isAuthenticated" to="/auth/signup" class="hover:text-blue-500">
          Sign Up
        </router-link>

        <!-- Show Profile Dropdown if authenticated -->
        <div v-else class="relative">
          <button class="flex items-center space-x-2 focus:outline-none" @click="toggleDropdown">
            <span class="text-gray-800">{{ user.email }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 w-40"
          >
            <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="goToProfile">
              Profile
            </li>
            <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" @click="logout">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// States
const dropdownOpen = ref(false);
const searchQuery = ref('');
const results = ref([
  { id: 1, name: 'Event A' },
  { id: 2, name: 'Event B' },
  { id: 3, name: 'Event C' },
]);

// Computed States
const isAuthenticated = computed(() => !!authStore.getToken);
const user = computed(() => authStore.getUser);

// Watch for search filtering
const filteredResults = computed(() => {
  if (!searchQuery.value) return [];
  return results.value.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Actions
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = () => {
  authStore.clearAuth();
  dropdownOpen.value = false;
  router.push('/');
};

const goToProfile = () => {
  router.push('/profile');  // Modify the route to your profile page
  dropdownOpen.value = false;
};

const selectResult = (result) => {
  router.push(`/events/${result.id}`);  // Modify according to your route setup
  searchQuery.value = '';
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
