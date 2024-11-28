<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
/* Active link color */
.router-link-exact-active {
  color: #FF5722 !important; /* Orange */
}

/* Smooth transition for the menu */
.menu-transition {
  transition: transform 0.3s ease-in-out;
}

/* Hover effects for a more polished feel */
.nav-link:hover {
  background-color: #F3F4F6; /* Light grey */
  color: #333;
}

/* Responsive menu */
.mobile-menu {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

@media (min-width: 768px) {
  .menu-transition {
    transform: none;
    opacity: 1;
  }
}

@media (max-width: 767px) {
  .mobile-menu {
    opacity: 0;
    transform: translateY(-10px);
  }

  .mobile-menu-active {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <nav class="bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 shadow-lg p-4">
    <div class="container mx-auto flex items-center justify-between">
      <NuxtLink to="/" exact class="text-white text-2xl font-semibold hover:text-gray-200 px-4 py-2 rounded-lg transition duration-300">
        TestEvent
      </NuxtLink>
      <div class="flex items-center space-x-6">
        <!-- Desktop Links -->
        <div class="hidden md:flex space-x-6">
          <NuxtLink to="/auth/login" exact class="nav-link text-black px-4 py-2 rounded-lg transition duration-300">
            Login
          </NuxtLink>
          <NuxtLink to="/auth/signup" exact class="nav-link text-black hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-300">
            Signup
          </NuxtLink>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="toggleMenu"
          class="md:hidden text-white hover:text-blue-800 transition duration-300 focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      :class="['absolute top-16 right-2 bg-white shadow-lg rounded-lg w-40 p-4 menu-transition', { 'mobile-menu-active': isMenuOpen }]"
      v-show="isMenuOpen"
    >
      <NuxtLink 
        to="/auth/login" 
        exact 
        class="block px-4 py-2 text-black hover:bg-blue-100"
        @click="closeMenu"
      >
        Login
      </NuxtLink>
      <NuxtLink 
        to="/auth/signup" 
        exact 
        class="block px-4 py-2 text-black hover:bg-blue-100"
        @click="closeMenu"
      >
        Signup
      </NuxtLink>
    </div>
  </nav>
</template>
