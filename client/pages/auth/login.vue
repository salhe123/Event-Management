<script setup>
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

// Set up form validation schema with Yup
const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 4 characters")
    .required("Password is required"),
});

// Vee-Validate form setup
const { handleSubmit, errors, reset } = useForm({
  validationSchema: schema,
});

// Use fields from the form
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField("email");
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField("password");

const error = ref("");
const router = useRouter();

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(arg1: { email: $email, password: $password }) {
      id
      token
      message
    }
  }
`;

const {
  mutate,
  loading: mutationLoading,
  error: mutationError,
} = useMutation(LOGIN_MUTATION, {
  context: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await mutate({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    const { token, message } = response.data.login;

    if (token) {
      // Store token in localStorage
      localStorage.setItem("auth_token", token);
      router.push("/"); // Navigate to the home page or dashboard
    } else {
      error.value = message || "Invalid credentials";
    }
  } catch (err) {
    console.error(err);
    error.value = "An error occurred during login. Please try again.";
  }
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 p-4">
    <div class="flex flex-col md:flex-row w-full max-w-4xl bg-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div class="w-full md:w-1/2 p-8">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-3xl font-bold text-center text-white">
            Login to Your Account
          </h2>

          <div v-if="error" class="text-lg font-semibold text-center text-red-500">
            {{ error }}
          </div>

          <!-- Email input -->
          <div class="relative">
            <label for="email" class="block text-gray-600 text-sm font-bold mb-2">Email</label>
            <input
              v-model="email"
              @blur="emailBlur"
              type="email"
              placeholder="Enter your email"
              class="w-full p-2 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
            <span class="text-red-500">{{ emailError }}</span>
          </div>

          <!-- Password input -->
          <div class="relative">
            <label for="password" class="block text-gray-600 text-sm font-bold mb-2">Password</label>
            <input
              v-model="password"
              @blur="passwordBlur"
              type="password"
              placeholder="Enter your password"
              class="w-full p-2 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
            <span class="text-red-500">{{ passwordError }}</span>
          </div>

          <button
            type="submit"
            :disabled="mutationLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            Log In
          </button>

          <div class="text-center mt-4 text-gray-700">
            <nuxt-link to="#" class="text-blue-600 hover:text-blue-800 font-medium">
              Forgot your password? Reset here.
            </nuxt-link>
          </div>

          <div class="text-center mt-4 text-gray-700">
            <nuxt-link to="/auth/signup" class="text-blue-600 hover:text-blue-800 font-medium">
              Don't have an account? Sign up here.
            </nuxt-link>
          </div>
        </form>
      </div>

      <div class="w-full md:w-1/2 hidden md:flex items-center justify-center">
        <img src="../../assets/css/image/logo.png" alt="Login Illustration" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional styling adjustments for your login form */
</style>
