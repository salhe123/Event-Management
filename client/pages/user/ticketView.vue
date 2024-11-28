<script setup>
definePageMeta({
  layout: 'user',
  middleware: "auth-log"
});

import { GET_TICKET_USER_BY_USER_ID, GET_TRANSACTIONS } from "../../util/queries";
import { useQuery } from "@vue/apollo-composable";
import { onMounted, ref } from "vue";

// const userId = ref(localStorage.getItem("userId"));
const { result, error, loading, refetch } = useQuery(GET_TRANSACTIONS);

// Helper function to format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

onMounted(() => {
  refetch();
});
</script>

<template>
  <div class="mt-20 px-4 sm:px-6 lg:px-8">
    <!-- Loading and Error States -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">There is an error fetching your tickets.</div>
    <div v-else-if="result?.transactions.length === 0" class="text-center text-red-600">No tickets found.</div>

    <!-- Ticket Table -->
    <div v-else>
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full text-sm text-gray-700">
          <thead class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <tr>
              <th class="px-4 py-3 text-left font-bold uppercase tracking-wider">Checkout URL</th>
              <th class="px-4 py-3 text-left font-bold uppercase tracking-wider">Amount</th>
              <th class="px-4 py-3 text-left font-bold uppercase tracking-wider">Event Date</th>
              <th class="px-4 py-3 text-left font-bold uppercase tracking-wider">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ticket, index) in result?.transactions"
              :key="ticket.id"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              class="hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              <td class="px-4 py-3 border-b text-gray-800">
                <a :href="ticket?.checkout_url" target="_blank" class="text-blue-500 hover:underline">
                  {{ ticket?.checkout_url }}
                </a>
              </td>
              <td class="px-4 py-3 border-b text-gray-800">{{ ticket?.amount }}</td>
              <td class="px-4 py-3 border-b text-gray-800">{{ formatDate(ticket?.event.date) }}</td>
              <td class="px-4 py-3 border-b text-gray-800">{{ ticket?.phoneNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

