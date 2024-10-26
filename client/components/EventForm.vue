<script setup>
import { ref } from "vue";
//   import MapComponent from './MapComponent.vue';

const event = ref({
  title: "",
  description: "",
  date: "",
  price: 0,
  location: "",
  tags: "",
  images: [],
});

const handleFileUpload = (event) => {
  const files = event.target.files;
  event.value.images = Array.from(files);
};

const submitEvent = () => {
  // Handle event submission logic (e.g., API call)
  console.log("Event submitted:", event.value);
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-gray-200 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-center">Create Event</h2>
    <form @submit.prevent="submitEvent">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Event Title</label
        >
        <input
          type="text"
          id="title"
          placeholder="please enter a title"
          v-model="event.title"
          required
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-950"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <label for="description" class="block text-sm font-medium text-gray-500"
          >when you write the description make it specfic</label
        >
        <textarea
          id="description"
          v-model="event.description"
          required
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        ></textarea>
      </div>

      <div class="mb-4 flex flex-col md:flex-row gap-4">
        <!-- Event Date Input -->
        <div class="flex-1">
          <label for="date" class="block text-sm font-medium text-gray-700"
            >Event Date</label
          >
          <input
            type="date"
            id="date"
            v-model="event.date"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Start Time Input -->
        <div class="flex-1">
          <label
            for="start-time"
            class="block text-sm font-medium text-gray-700"
            >Start Time</label
          >
          <input
            type="time"
            id="start-time"
            v-model="event.startTime"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- End Time Input -->
        <div class="flex-1">
          <label for="end-time" class="block text-sm font-medium text-gray-700"
            >End Time</label
          >
          <input
            type="time"
            id="end-time"
            v-model="event.endTime"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Price</label
        >
        <input
          type="number"
          id="price"
          placeholder="price"
          v-model="event.price"
          min="0"
          required
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="location" class="block text-sm font-medium text-gray-700"
          >Location</label
        >
        <MapComponent v-model="event.location" />
      </div>

      <div class="mb-4">
        <label for="tags" class="block text-sm font-medium text-gray-700"
          >Tags</label
        >
        <input
          type="text"
          id="tags"
          v-model="event.tags"
          placeholder="Comma separated tags"
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="images" class="block text-sm font-medium text-gray-700"
          >Upload Images</label
        >
        <input
          type="file"
          id="images"
          multiple
          @change="handleFileUpload"
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p class="mt-1 text-sm text-gray-500">
          Select a featured image for the thumbnail.
        </p>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Event
        </button>
      </div>
    </form>
  </div>
</template>
