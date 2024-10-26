<template>
  <div class="relative min-h-screen bg-cover bg-center flex items-center justify-center">
    <!-- Background Image -->
    <img
      src="/assets/css/image/photo_2022-06-01_19-15-01.jpg"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover z-0"
    />

    <!-- Content Box -->
    <div class="relative z-10 bg-white bg-opacity-15 p-8 rounded-lg shadow-lg text-center max-w-lg mx-4 sm:mx-0">
      <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
        Welcome to Our Local Event Website
      </h1>
      <p class="text-lg sm:text-xl text-gray-200 mb-6">
        Your journey to great experiences starts here.
      </p>
      <nuxt-link to="/auth/login">
        <button
          class="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Get Started
        </button>
      </nuxt-link>
    </div>

    <!-- Event Form Component -->
    
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
