<template>
  <header
    class="flex bg-white border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50"
  >
    <div class="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
      <!-- <div
        :class="{
          'lg:ml-10 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50 flex justify-between':
            !isMenuOpen,
        }"
      >
        <button
          @click="toggleMenu"
          class="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
        >
          <Icon name="close" class="w-4 h-4 text-black" />
        </button>

        <ul
          :class="{
            'flex lg:flex-row lg:space-x-6 max-lg:flex-col max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50':
              isMenuOpen,
          }"
        >
          <li class="mb-6 hidden max-lg:block">
            <NuxtLink to="/" aria-label="Home">
              <img
                src="https://readymadeui.com/readymadeui.svg"
                alt="logo"
                class="w-36"
              />
            </NuxtLink>
          </li>
          <li class="px-3">
            <NuxtLink
              to="/new"
              class="text-[#007bff] hover:text-[#007bff] text-[15px] font-semibold"
              >New</NuxtLink
            >
          </li>
          <li class="px-3">
            <NuxtLink
              to="/men"
              class="text-[#333] hover:text-[#007bff] text-[15px] font-semibold"
              >Men</NuxtLink
            >
          </li>
          <li class="px-3">
            <NuxtLink
              to="/create-events"
              class="text-[#333] hover:text-[#007bff] text-[15px] font-semibold"
              >Create Events</NuxtLink
            >
          </li>
        </ul>
      </div> -->

      <div class="flex gap-x-96 gap-y-4 ml-auto">
        <div
          class="flex border-2 focus-within:border-gray-400 rounded-full px-6 py-3 overflow-hidden max-w-2xl w-full"
        >
          <!-- Search Input -->
          <div class="flex-1 flex items-center">
            <input
              type="text"
              placeholder="Search something..."
              class="w-full text-sm bg-transparent outline-none pr-2"
            />
            <Icon
              name="search"
              class="cursor-pointer text-gray-600 w-5 h-5 mr-4"
            />
          </div>
          <div class="h-full w-px bg-gray-300 mx-4"></div>
          <div class="flex items-center">
            <select
              class="text-sm bg-transparent outline-none cursor-pointer text-gray-600"
            >
              <option value="" disabled selected>Filter</option>
              <option value="all">All</option>
              <option value="popular">Popular</option>
              <option value="recent">Recent</option>
              <option value="recommended">Recommended</option>
            </select>
          </div>
        </div>

        <div class="flex items-center space-x-8">
          <NuxtLink
              to="/create-events"
              class="text-[#333] hover:text-[#007bff] text-[15px] font-semibold pr-12 flex flex-row"
              >Create Events</NuxtLink>
          <nuxt-link to="/auth/login">
            <button
              class="px-6 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff] hover:shadow-lg transition-shadow duration-300 flex flex-row"
            >
              SignIn
            </button>
          </nuxt-link>

          <button @click="toggleMenu" class="lg:hidden">
            <Icon name="uil:github" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style scoped>
/* Add any additional styling as necessary */
</style>
