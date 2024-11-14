<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <header
    class="flex bg-white border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50"
  >
    <div class="flex flex-wrap items-center justify-between w-full">
      <!-- Logo Section (Link to Home) -->
      <div class="flex lg:hidden items-center space-x-2">
        <nuxt-link to="/" class="text-2xl font-semibold text-[#007bff]">My Event App</nuxt-link>
      </div>
      <div class="hidden lg:flex items-center space-x-8">
        <!-- Logo Desktop Version -->
        <nuxt-link to="/" class="text-2xl font-semibold text-[#007bff]">My Event App</nuxt-link>
      </div>

      <!-- Search and Filter Section -->
      <div class="flex-1 flex flex-col lg:flex-row items-center gap-y-4 lg:gap-x-6">
        <div class="flex items-center w-full lg:w-auto">
          <div
            class="flex border-2 focus-within:border-gray-400 rounded-full px-4 lg:px-6 py-2 lg:py-3 overflow-hidden w-full lg:max-w-2xl"
          >
            <input
              type="text"
              placeholder="Search events..."
              class="w-full text-sm bg-transparent outline-none pr-2"
            />
            <Icon name="search" class="cursor-pointer text-gray-600 w-5 h-5 mr-4" />
            <div class="h-full w-px bg-gray-300 mx-4"></div>
            <select class="text-sm bg-transparent outline-none cursor-pointer text-gray-600">
              <option value="" disabled selected>Filter</option>
              <option value="all">All</option>
              <option value="popular">Popular</option>
              <option value="recent">Recent</option>
              <option value="recommended">Recommended</option>
            </select>
          </div>
        </div>
        
        <!-- Action Links Section (Create Event, Login, Sign Up) -->
        <div class="hidden lg:flex items-center space-x-8">
          <NuxtLink to="/create-event" class="text-[#333] hover:text-[#007bff] text-[15px] font-semibold">
            Create Event
          </NuxtLink>
          <NuxtLink to="/auth/login" class="flex space-x-4">
            <button
              class="px-6 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff] transition duration-300"
            >
              Login
            </button>
            <button
              class="px-6 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff] transition duration-300"
            >
              Sign Up
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile Menu Toggle (Hamburger Icon) -->
      <button @click="toggleMenu" class="lg:hidden ml-auto">
        <Icon name="uil:github" class="w-6 h-6" />
      </button>

      <!-- Mobile Menu (Dropdown for Small Screens) -->
      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center space-y-4 py-6 lg:hidden"
      >
        <NuxtLink to="#" class="text-[#333] hover:text-[#007bff] text-[15px] font-semibold">
          Create Event
        </NuxtLink>
        <NuxtLink to="/auth/login" class="w-full text-center">
          <button
            class="w-10/12 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff] transition duration-300"
          >
            Login
          </button>
        </NuxtLink>
        <NuxtLink to="/auth/signup" class="w-full text-center">
          <button
            class="w-10/12 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff] transition duration-300"
          >
            Sign Up
          </button>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Optional: Add additional styling for header elements like hover effects */
</style>
