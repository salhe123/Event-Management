<script setup>
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_USER_BY_HIS_ID } from '../../util/queries';
import { useRouter } from 'vue-router';
import Avater from '../../assets/icons/Avater.vue';
import Toogle from "../../assets/icons/Toogle.vue";

const router = useRouter();
const onhover = ref(false);
const isMobileMenuOpen = ref(false);

const hoverClick = () => {
  onhover.value = !onhover.value;
};

const { result: data, loading, error } = useQuery(GET_USER_BY_HIS_ID);

const userData = computed(() => data.value?.users[0] || null);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const clickLogout = () => {
  console.log('the user clicked the logout button');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('redirectAfterLogin');
  router.replace('/auth/login');
};
</script>

<template>
  <div class="w-full bg-white from-slate-700 to-slate-800 shadow-lg sticky top-0 z-50">
    <div class="flex justify-between items-center px-4 py-4 md:px-8">
      <NuxtLink to="/user" class="text-2xl font-bold text-black hover:bg-gray-300 rounded p-2 transition-colors duration-200">
        TestEvents
      </NuxtLink>
      <button
        @click="toggleMobileMenu"
        class="md:hidden text-white focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <Toogle />
      </button>
      <div class="hidden md:flex items-center space-x-6">
        <NuxtLink to="/user/createEvent" exact class="font-medium px-4 py-2 rounded text-black hover:bg-gray-300 transition duration-300">
          Create Event
        </NuxtLink>
        <NuxtLink to="/user/bookMark" exact class="font-medium px-4 py-2 rounded text-black hover:bg-gray-300 transition duration-300">
          Book Marks
        </NuxtLink>

        <div class="relative flex items-center cursor-pointer" @click="hoverClick">
          <Avater v-if="!userData?.image" />
          <img v-else :src="userData?.image" alt="no image" class="w-10 h-10 rounded-full object-cover shadow-lg" />
          <h3 v-if="loading">Loading...</h3>
          <h3 v-else-if="userData" class="text-white hover:bg-black font-medium ml-2">
            {{ userData?.username }}
          </h3>
          <h3 v-else class="text-red-500">
            {{ error ? 'Error loading user' : 'No user data found' }}
          </h3>

          <div v-if="onhover" class="absolute top-10 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border h-28 border-gray-200 transition-transform transform origin-top-right z-10">
            <NuxtLink
              to="/user/uploadprofile"
              exact
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Profile
            </NuxtLink>
            <button
              @click="clickLogout"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="isMobileMenuOpen"
        class="md:hidden fixed inset-0 bg-opacity-50"
        @click="toggleMobileMenu"
      >
        <div class="absolute top-16 right-2 w-48 flex flex-col bg-white shadow-lg border-t border-gray-200 p-6 rounded-lg">
          <NuxtLink to="/user/createEvent" exact class="text-white hover:bg-black font-medium px-4 py-2 rounded transition duration-300">
            Create Event
          </NuxtLink>
          <NuxtLink to="/user/bookMark" exact class="font-medium px-4 py-2 rounded text-white hover:bg-black transition duration-300">
            Book Marks
          </NuxtLink>

          <div class="relative flex items-center cursor-pointer" @click="hoverClick">
            <Avater v-if="!userData?.image" />
            <img v-else :src="userData?.image" alt="no image" class="w-10 h-10 rounded-full object-cover shadow-lg" />
            <h3 v-if="loading">Loading...</h3>
            <h3 v-else-if="userData" class="text-blue-600 font-medium ml-2">
              {{ userData.username }}
            </h3>
            <h3 v-else class="text-red-500">
              {{ error ? 'Error loading user' : 'No user data found' }}
            </h3>

            <div v-if="onhover" class="absolute top-10 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border h-28 border-gray-200 transition-transform transform origin-top-right z-10">
              <NuxtLink
                to="/user/uploadprofile"
                exact
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Profile
              </NuxtLink>
              <button
                @click="clickLogout"
                exact
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

