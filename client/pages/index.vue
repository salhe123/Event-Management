
<script setup>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
// import { ref, computed, onMounted } from "vue";
// import { useEvents } from "../composables/useEvents";


// // Using events composable
// const { eventsData, loadingEvents, errorEvents } = useEvents();
// const blogs = ref([]);

// // Computed property to handle `eventsData` safely
// const eventsList = computed(() => {
//   return eventsData?.events || [];  // Default to an empty array if `eventsData` is undefined
// });

// // Pagination state
// const currentPage = ref(1);
// const itemsPerPage = 6; // Number of events per page

// // Fetch events on component mount
// onMounted(() => {
//   if (!loadingEvents && eventsList.value.length > 0) {
//     blogs.value = eventsList.value;
//   }
// });

// // Computed for paginated events
// const paginatedEvents = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   return blogs.value.slice(start, end);
// });

// // Computed total pages
// const totalPages = computed(() => {
//   return Math.ceil(blogs.value.length / itemsPerPage);
// });

// // Change page function
// const goToPage = (page) => {
//   if (page >= 1 && page <= totalPages.value) {
//     currentPage.value = page;
//   }
// };

// // Date formatting function
// const formatDate = (dateString) => {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };
</script>
<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Header Component -->
    <header class="bg-white shadow">
      <Header />
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">Upcoming Events</h1>

      <!-- Loading & Error States -->
      <div v-if="loadingEvents" class="flex justify-center py-8">
        <div class="loader">Loading...</div>
      </div>
      <div v-if="errorEvents" class="text-center text-red-500">
        An error occurred: {{ errorEvents.message }}
      </div>

      <!-- Events Grid -->
      <div v-else class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="event in paginatedEvents"
          :key="event.id"
          class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <h2 class="text-xl font-semibold text-gray-800">{{ event.title }}</h2>
          <p class="text-gray-600 text-sm">{{ event.venue }}</p>
          <p class="text-gray-600 text-sm">{{ event.address }}</p>
          <p class="text-gray-700 mt-2">
            <span class="font-semibold">Date:</span> {{ formatDate(event.event_date) }}
          </p>
          <p class="text-gray-700">
            <span class="font-semibold">Price:</span> ${{ event.price }}
          </p>

          <!-- Action Buttons -->
          <div class="mt-4 flex justify-end space-x-4">
            <button class="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
              <icon name="uil:edit" class="w-5 h-5" />
              <span>Edit</span>
            </button>
            <button class="text-red-600 hover:text-red-800 flex items-center space-x-1">
              <icon name="uil:trash-alt" class="w-5 h-5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>

    <!-- Footer Component -->
    <footer class="">
      <Footer />
    </footer>
  </div>
</template>



<style>
/* Loader animation (optional) */
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation: load 1.8s infinite ease-in-out;
}
.loader {
  color: #3b82f6;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@keyframes load {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
