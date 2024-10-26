<script setup>
import { ref } from "vue";
import header from "../components/header.vue";
import footer from "../components/footer.vue";

const blogs = ref([
  {
    image: "https://readymadeui.com/Imagination.webp",
    title: "A Guide to Igniting Your Imagination",
    date: "10 FEB 2023",
    author: "JOHN DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit.",
    liked: false,
    bookmarked: false,
  },
  {
    image: "https://readymadeui.com/hacks-watch.webp",
    title: "Hacks to Supercharge Your Day",
    date: "7 JUN 2023",
    author: "MARK ADAIR",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit.",
    liked: false,
    bookmarked: false,
  },
  {
    image: "https://readymadeui.com/prediction.webp",
    title: "Trends and Predictions",
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit.",
    liked: false,
    bookmarked: false,
  },
  {
    image: "https://readymadeui.com/team-image.webp",
    title: "Innovators Changing the Game",
    date: "10 DEC 2023",
    author: "SIMON KONECKI",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit.",
    liked: false,
    bookmarked: false,
  },
]);

const toggleLike = (index) => {
  blogs.value[index].liked = !blogs.value[index].liked;
};

const toggleBookmark = (index) => {
  blogs.value[index].bookmarked = !blogs.value[index].bookmarked;
};
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div
          v-for="(blog, index) in blogs"
          :key="index"
          class="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-[1.03] transition-all duration-300"
        >
          <div class="h-64 lg:w-full">
            <img
              :src="blog.image"
              :alt="blog.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6 relative">
            <h3 class="text-xl font-bold text-gray-800">{{ blog.title }}</h3>
            <span class="text-sm block text-gray-400 mt-2"
              >{{ blog.date }} | BY {{ blog.author }}</span
            >
            <p class="text-sm text-gray-500 mt-4">{{ blog.description }}</p>
            <a
              href="javascript:void(0);"
              class="mt-4 inline-block text-blue-600 font-semibold text-sm hover:underline"
              >Read More</a
            >
            <!-- Like and Bookmark icons -->
            <div class="absolute top-4 right-4 flex space-x-2">
              <button
                @click="toggleBookmark(index)"
                class="text-gray-500 hover:text-yellow-500"
              >
                <i
                  :class="
                    blog.bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'
                  "
                ></i>
              </button>
              <button
                @click="toggleLike(index)"
                class="text-gray-500 hover:text-red-500 "
              >
                <div
                  class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    class="fill-gray-800 inline-block"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </button>
              <button
                @click="toggleBookmark(index)"
                class="text-gray-500 hover:text-yellow-500  "
              >
                <div
                  class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    class="fill-gray-800 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm-5 14l-5-2.18L12 5v12z"
                    />
                  </svg>
                </div>
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
