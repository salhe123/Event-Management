<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

const email = ref('');

const subscribeToNewsletter = () => {
  if (email.value) {
    alert(`Subscribed successfully with ${email.value}!`);
    email.value = '';
  } else {
    alert('Please enter a valid email address.');
  }
};
</script>

<style scoped>
.router-link-exact-active {
  color: blueviolet !important;
}
</style>

<template>
  <footer class="bg-slate-700 text-white py-8">
    <div class="container mx-auto px-4">
      <!-- Top Section: Logo, Links, and Newsletter -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <!-- Logo and Info -->
        <div class="mb-6 md:mb-0">
          <h2 class="text-3xl font-bold">MinabEvent</h2>
          <p class="text-gray-400 mt-2">Empowering your events with simplicity and efficiency.</p>
        </div>

        <!-- Quick Links -->
        <div class="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
          <NuxtLink to="/" class="text-gray-400 hover:text-white">Home</NuxtLink>
          <NuxtLink to="/events" class="text-gray-400 hover:text-white">Events</NuxtLink>
          <NuxtLink to="/about" class="text-gray-400 hover:text-white">About</NuxtLink>
          <NuxtLink to="/contact" class="text-gray-400 hover:text-white">Contact</NuxtLink>
        </div>

        <!-- Newsletter Subscription -->
        <div class="mt-6 md:mt-0">
          <h3 class="text-lg font-semibold">Stay Updated</h3>
          <p class="text-gray-400 text-sm mb-2">Subscribe to our newsletter for the latest updates.</p>
          <div class="flex">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="p-2 rounded-l-lg focus:outline-none"
            />
            <button 
              @click="subscribeToNewsletter" 
              class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <!-- Social Media Links -->
      <div class="flex justify-center space-x-6 mb-6">
        <NuxtLink to="#" class="text-gray-400 hover:text-white">
          <nuxt-icon name="mdi-facebook" class="w-6 h-6" />
        </NuxtLink>
        <NuxtLink to="#" class="text-gray-400 hover:text-white">
          <nuxt-icon name="mdi-twitter" class="w-6 h-6" />
        </NuxtLink>
        <NuxtLink to="#" class="text-gray-400 hover:text-white">
          <nuxt-icon name="mdi-instagram" class="w-6 h-6" />
        </NuxtLink>
        <NuxtLink to="#" class="text-gray-400 hover:text-white">
          <nuxt-icon name="mdi-linkedin" class="w-6 h-6" />
        </NuxtLink>
        <NuxtLink to="#" class="text-gray-400 hover:text-white">
          <nuxt-icon name="mdi-youtube" class="w-6 h-6" />
        </NuxtLink>
      </div>

      <!-- Footer Bottom: Copyright and Legal Links -->
      <div class="flex flex-col md:flex-row justify-between items-center border-t border-gray-500 pt-4">
        <p class="text-sm text-gray-400">&copy; {{ new Date().getFullYear() }} MinabEvent. All rights reserved.</p>
        <div class="flex space-x-4 mt-2 md:mt-0">
          <NuxtLink to="/terms" class="text-gray-400 hover:text-white text-sm">Terms of Service</NuxtLink>
          <NuxtLink to="/privacy" class="text-gray-400 hover:text-white text-sm">Privacy Policy</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
