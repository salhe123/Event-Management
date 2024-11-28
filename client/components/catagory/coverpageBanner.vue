<script setup>
defineProps({
  category: String,
  image: String,
})
</script>

<template>
  <div class="relative w-full h-96 lg:h-[80vh] flex flex-col lg:flex-row justify-between items-center bg-blue-600 overflow-hidden">
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-transparent"></div>
    
    <!-- Content Section -->
    <div class="relative flex flex-col p-6 text-white max-w-lg lg:max-w-sm mx-4">
      <h1 class="text-3xl lg:text-4xl font-bold mb-2">{{ category }} Events</h1>
      <p class="text-base lg:text-lg mb-4">Discover the best {{ category }} events in your area</p>
    </div>
    
    <!-- Image Section -->
    <img :src="image" alt="Category Image" class="relative w-full lg:w-1/2 h-64 lg:h-full object-cover rounded-l-lg shadow-lg transition-transform duration-500 hover:scale-105" />
  </div>
</template>
