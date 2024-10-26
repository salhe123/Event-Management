<template>
  <form class="font-[sans-serif] text-[#333] max-w-4xl mx-auto px-6 my-6 bg-slate-50">
    <div class="grid sm:grid-cols-2 gap-10">
      <!-- Title -->
      <div class="relative flex items-center sm:col-span-2">
        <label class="text-[13px] absolute top-[-10px] left-0">Title</label>
        <input
          type="text"
          placeholder="Enter event title"
          class="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
        />
      </div>

      <!-- Description -->
      <div class="relative flex items-center sm:col-span-2">
        <label class="text-[13px] absolute top-[-10px] left-0"
          >Description</label
        >
        <textarea
          placeholder="Enter event description"
          rows="4"
          class="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
        ></textarea>
      </div>

      <!-- Event Date -->
      <div class="relative flex items-center">
        <label class="text-[13px] absolute top-[-10px] left-0"
          >Event Date</label
        >
        <input
          type="date"
          placeholder="Select event date"
          class="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
        />
      </div>

      <!-- Start Time -->
      <div class="relative flex items-center">
        <label class="text-[13px] absolute top-[-10px] left-0"
          >Start Time</label
        >
        <input
          type="time"
          placeholder="Select start time"
          class="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
        />
      </div>

      <!-- End Time -->
      <div class="relative flex items-center">
        <label class="text-[13px] absolute top-[-10px] left-0">End Time</label>
        <input
          type="time"
          placeholder="Select end time"
          class="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
        />
      </div>

      <!-- Price -->
      <div class="relative flex items-center">
        <label class="text-[13px] absolute top-[-10px] left-0">Price</label>
        <input
          type="number"
          placeholder="Enter event price"
          class="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
        />
      </div>

      <!-- Location -->
      <div class="relative flex items-center">
        <label class="text-[13px] absolute top-[-10px] left-0">Location</label>
        <input
          type="text"
          placeholder="Enter event location"
          class="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
        />
      </div>

      <!-- Tags -->
      <div class="relative flex items-center sm:col-span-2">
        <label class="text-[13px] absolute top-[-10px] left-0">Tags</label>
        <input
          type="text"
          placeholder="Enter event tags (comma separated)"
          class="px-2 pt-5 pb-2 bg-white w-full text-sm border-b-2 border-gray-100 focus:border-[#333] outline-none"
        />
      </div>

      <!-- Upload Image -->
      <div class="font-[sans-serif] max-w-md mx-auto pr-36">
        <label class="text-base text-gray-500 font-semibold mb-2 block"
          >Upload file</label
        >
        <input
          type="file"
          class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
        />
        <p class="text-xs text-gray-400 mt-2">
          PNG, JPG SVG, WEBP, and GIF are Allowed.
        </p>
      </div>
    </div>

    <div class="flex justify-end mt-6">
      <button
        type="submit"
        class="px-4 py-2 text-white rounded  bg-blue-600 hover:bg-blue-700 focus:outline-none transition"
      >
        Create Event
      </button>
    </div>
  </form>
</template>

<script setup>
// You can add any necessary logic here, like handling form submission
</script>

<style scoped>
/* You can add additional styles if needed */
</style>
