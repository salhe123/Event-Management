<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable'; // Import useMutation
import { gql } from '@apollo/client/core'; // Import gql to define the mutation

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

// Define the login mutation
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(arg1: { email: $email, password: $password }) { 
      id
      token
      message
    }
  }
`;

// Use the useMutation hook to set up the mutation
const { mutate, loading: mutationLoading, error: mutationError, data } = useMutation(LOGIN_MUTATION);

// Bind loading state to the mutation
loading.value = mutationLoading;

// Handle form submission
const onSubmit = async () => {
  error.value = '';

  try {
    // Call the mutation
    const response = await mutate({
      email: email.value,
      password: password.value,
    });

    const { token } = response.data.login; // Access the result from response.data.login

    if (token) {
      // Save the JWT token (in localStorage, Vuex, etc.)
      localStorage.setItem('auth_token', token);

      // Redirect to a protected page (e.g., dashboard)
      router.push('/');
    } else {
      error.value = 'Invalid credentials';
    }
  } catch (err) {
    console.error(err);
    error.value = 'An error occurred during login. Please try again.';
  }
};
</script>


<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 p-4"
  >
    <div
      class="flex flex-col md:flex-row w-full max-w-4xl bg-gray-200 rounded-lg shadow-lg overflow-hidden"
    >
      <!-- Form Section -->
      <div class="w-full md:w-1/2 p-8">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-3xl font-bold text-center text-white">
            Login to Your Account
          </h2>

          <!-- Error Message -->
          <div v-if="error" class="text-lg font-semibold text-center text-red-500">
            {{ error }}
          </div>

          <!-- Email Field -->
          <div class="relative">
            <label for="email" class="block text-gray-600 text-sm font-bold mb-2">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full p-2 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
          </div>

          <!-- Password Field -->
          <div class="relative">
            <label for="password" class="block text-gray-600 text-sm font-bold mb-2">
              Password
            </label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full p-2 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            Log In
          </button>

          <!-- Forgot Password Link -->
          <div class="text-center mt-4 text-gray-700">
            <nuxt-link
              to="#"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Forgot your password? Reset here.
            </nuxt-link>
          </div>

          <!-- No account? Sign Up Link -->
          <div class="text-center mt-4 text-gray-700">
            <nuxt-link
              to="/auth/signup"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Don't have an account? Sign up here.
            </nuxt-link>
          </div>
        </form>
      </div>

      <!-- Image Section (Hidden on smaller screens) -->
      <div
        class="w-full md:w-1/2 hidden md:flex items-center justify-center btemplate00"
      >
        <img
          src="../../assets/css/image/logo.png"
          alt="Login Illustration"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional styling adjustments for your login form */
</style>
