<script setup>
import { ref, onMounted } from "vue";
import { useEvents } from "../composables/useEvents";
import header from "../components/header.vue";
import footer from "../components/footer.vue";

// Use events composable
const { eventsData, loadingEvents, errorEvents } = useEvents();
const blogs = ref([]);

// Fetch the events on component mount
onMounted(() => {
  if (!loadingEvents && !errorEvents) {
    blogs.value = eventsData?.events || [];
  }
});
</script>

<template>
  <div>
    <Header />
  </div>
  <div class="bg-white font-sans p-4 relative">
    <div class="max-w-5xl max-lg:max-w-3xl max-md:max-w-sm mx-auto">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-800 inline-block">
          LATEST EVENTS
        </h2>
      </div>
      <!-- Loading and Error states -->
      <div v-if="loadingEvents" class="text-center mt-10">
        Loading events...
      </div>
      <div v-if="errorEvents" class="text-center text-red-500 mt-10">
        Error loading events.
      </div>

      <!-- Display Events -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div
          v-for="(blog, index) in blogs"
          :key="index"
          class="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-[1.03] transition-all duration-300"
        >
          <div class="h-64 lg:w-full">
            <img
              :src="blog.image || 'default-image.jpg'"
              :alt="blog.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6 relative">
            <h3 class="text-xl font-bold text-gray-800">{{ blog.title }}</h3>
            <span class="text-sm block text-gray-400 mt-2">
              {{ blog.event_date }} | BY {{ blog.created_by }}
            </span>
            <p class="text-sm text-gray-500 mt-4">{{ blog.venue }}, {{ blog.location }}</p>
            <a
              href="javascript:void(0);"
              class="mt-4 inline-block text-blue-600 font-semibold text-sm hover:underline"
              >Read More</a
            >
            <!-- Like and Bookmark icons -->
            <div class="absolute top-4 right-4 flex space-x-2">
              <button class="text-gray-500 hover:text-yellow-500">
                <i class="far fa-bookmark"></i>
              </button>
              <button class="text-gray-500 hover:text-red-500">
                <i class="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <Footer />
  </div>
</template>

<style scoped>
/* Add any additional styles here if necessary */
</style>
