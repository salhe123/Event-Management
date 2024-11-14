<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import header from "../components/header.vue";
import footer from "../components/footer.vue"

const GET_EVENTS = gql`
  query GetEvents($limit: Int!, $offset: Int!) {
    events(limit: $limit, offset: $offset) {
      title
      venue
      id
      organizer_id
      price
      location
      address
      description
      created_at
      date
      updated_at
    }
    events_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const pageSize = 6;  
const currentPage = ref(1);  
const totalEvents = ref(0);  
const totalPages = computed(() => Math.ceil(totalEvents.value / pageSize));  

const { result, loading, error } = useQuery(GET_EVENTS, {
  limit: pageSize,
  offset: (currentPage.value - 1) * pageSize,
});

const events = ref([]);  

watch(result, () => {
  if (result.value) {
    events.value = result.value.events;
    totalEvents.value = result.value.events_aggregate.aggregate.count;
  }
}, { immediate: true });

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
  }
};

const buyTicket = (eventId) => {
  alert(`Buying ticket for event ID: ${eventId}`);
};

onMounted(() => {
  changePage(currentPage.value);
});

// Computed property for paginated events
const paginatedEvents = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  return events.value.slice(startIndex, startIndex + pageSize);
});
</script>


<template>
  <div>
    <Header />
  </div>
  <div class="container mx-auto p-4">
  
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- Loop through Events -->
      <div
        v-for="event in paginatedEvents"
        :key="event.id"
        class="bg-white border rounded-lg shadow-lg overflow-hidden"
      >
       
        <div class="relative">
          <img
            src="https://via.placeholder.com/300x200"  
            alt="Event"
            class="w-full h-48 object-cover"
          />
          
          <div class="absolute top-2 right-2 flex space-x-3">
            <button class="text-white bg-gray-800 bg-opacity-50 p-2 rounded-full">
              <i class="fas fa-heart"></i> 
            </button>
            <button class="text-white bg-gray-800 bg-opacity-50 p-2 rounded-full">
              <i class="fas fa-bookmark"></i> 
            </button>
          </div>
        </div>

        
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">{{ event.title }}</h3>
          <p class="text-sm text-gray-600">{{ event.venue }}</p>
          <p class="text-xs text-gray-500">{{ event.address }}</p>

          <!-- Price and Date -->
          <div class="mt-2 text-sm flex items-center justify-between">
            <span class="text-lg font-bold text-gray-800">${{ event.price }}</span>
            <span class="text-xs text-gray-500">{{ new Date(event.date).toLocaleDateString() }}</span>
          </div>

         
          <button
            @click="buyTicket(event.id)"
            class="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </div>

    
    <div class="mt-6 flex justify-center space-x-4">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
      >
        Previous
      </button>
      <span class="flex items-center text-lg font-semibold">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
  
    <Footer />
  
</template>



<style scoped>
/* Add custom styles for card hover effects, etc. */
</style>
