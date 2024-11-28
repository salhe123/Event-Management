<script setup>
import Home from "../../assets/icons/Home.vue"
import Ticket from "../../assets/icons/Ticket.vue"
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter()
</script>

<template>
  <!-- Sidebar container -->
  <div class="relative md:w-64 w-full min-h-screen bg-white from-slate-800 to-slate-700 mt-16 text-black shadow-lg rounded-lg p-4 flex flex-col space-y-6">
    
    <!-- Home Link -->
    <NuxtLink
      exact
      class="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-amber-600 hover:text-white"
      to="/user"
    >
      <Home class="w-6 h-6 text-white" />
      <span class="text-lg font-semibold">Home</span>
    </NuxtLink>

    <!-- Ticket Link -->
    <NuxtLink
      exact
      class="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-amber-600 hover:text-white"
      to="/user/ticketView"
    >
      <Ticket class="w-6 h-6 text-white" />
      <span class="text-lg font-semibold">Ticket</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
/* Active link style */
.router-link-exact-active {
  color: #ff8c00 !important; /* Active link color (orange) */
}
</style>
