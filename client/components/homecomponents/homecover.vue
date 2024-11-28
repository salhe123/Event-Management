<script setup>
import cover from "../../assets/css/for.avif"
import event from "../../assets/css/event.jpeg"
import ev1 from "../../assets/css/eve1.webp"
import ev2 from "../../assets/css/eve3.avif"
import ev3 from "../../assets/css/eve3.avif"
import { ref, onMounted } from "vue"

const events = [event, ev1, ev2, ev3, cover];
const currentIndex = ref(0);
const currentImage = ref(events[currentIndex.value]);

const changeImage = () => {
  currentIndex.value = (currentIndex.value + 1) % events.length;
  currentImage.value = events[currentIndex.value];
};

onMounted(() => {
  setInterval(changeImage, 3000);  // Increased time for better viewing
});
</script>

<template>
  <div class="relative p-4 mt-24">
    <!-- Cover Image with smooth transition -->
    <img :src="currentImage" alt="Cover Image" 
         class="w-full h-96 object-cover rounded-lg shadow-lg transition duration-700 ease-in-out transform hover:scale-105" />

    <!-- Overlay Section with Text -->
    <div class="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 p-8 rounded-lg">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">Welcome to TestEvents</h1>
      <p class="text-md sm:text-lg md:text-xl mb-6 px-4 md:px-8 text-shadow-lg">Discover and manage your events with ease. Find the best events happening near you and never miss out!</p>
      <button class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
        Explore Events
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Adding text shadow for better readability */
.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .text-shadow-lg {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  }
  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 1rem;
  }
}

@media (max-width: 1024px) {
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.25rem;
  }
}
</style>
