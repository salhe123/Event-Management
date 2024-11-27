<script setup>
import { useRoute } from 'vue-router';

// Get the current route
const route = useRoute();

// Define pages where you don't want the Navbar and Footer
const authRoutes = ['/auth/login', '/auth/signup'];

// Check if the current route is an auth page
const isAuthPage = authRoutes.includes(route.path);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Conditionally render Navbar -->
    <header v-if="!isAuthPage" class="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </header>
    
    <main class="flex-grow">
      <NuxtPage />
    </main>
    
    <!-- Conditionally render Footer -->
    <footer v-if="!isAuthPage" class="z-10">
      <Footer />
    </footer>
  </div>
</template>
