<script setup>
import { useAuthStore } from '~/stores/authStore';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

// Define schema
const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

// Define state and router
const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const error = ref('');
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

// Field definitions
const { value: email } = useField('email');
const { value: password } = useField('password');

// GraphQL mutation for login
const LOGIN_MUTATION = gql`
  mutation MyMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      role
    }
  }
`;

const { mutate: login } = useMutation(LOGIN_MUTATION, {
  context: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});

// Login handler
const onSubmit = handleSubmit(async (values) => {
  try {
    // Execute mutation
    const { data } = await login({
      email: values.email,
      password: values.password,
    });

    if (!data || !data.login) {
      throw new Error('Invalid response from server');
    }

    const { token, role, id } = data.login;

    // Set token and user in the auth store
    authStore.setToken(token);
    authStore.setUser({ user_id: id, role });

    console.log('Login successful:', authStore.user);

    // Redirect based on role
    if (role === 'user') {
      router.push('/');
    } else if (role === 'admin') {
      router.push('/dashboard'); // Adjust to your admin route
    } else {
      router.push('/auth/signup'); // Fallback route
    }
  } catch (err) {
    error.value = err.graphQLErrors?.[0]?.message || 'An unexpected error occurred.';

  }
});

</script>



<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300 p-4">
    <div class="flex flex-col md:flex-row w-full max-w-4xl bg-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div class="w-full md:w-1/2 p-8">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-3xl font-bold text-center text-white">Login to Your Account</h2>

          <div v-if="error" class="text-lg font-semibold text-center text-red-500">
            {{ error }}
          </div>

          <!-- Email input -->
          <div class="relative">
            <label for="email" class="block text-gray-600 text-sm font-bold mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full p-2 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm italic" />

          </div>

          <!-- Password input -->
          <div class="relative">
            <label for="password" class="block text-gray-600 text-sm font-bold mb-2">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter your password"
              class="w-full p-2 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
            <button type="button" @click="showPassword = !showPassword" class="absolute top-2 right-3 text-gray-500 hover:text-gray-700">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
            <span class="text-red-500"><ErrorMessage name="password" /></span>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            Log In
          </button>

          <div class="text-center mt-4 text-gray-700">
            <nuxt-link to="#" class="text-blue-600 hover:text-blue-800 font-medium">Forgot your password? Reset here.</nuxt-link>
          </div>

          <div class="text-center mt-4 text-gray-700">
            <nuxt-link to="/auth/signup" class="text-blue-600 hover:text-blue-800 font-medium">Don't have an account? Sign up here.</nuxt-link>
          </div>
        </form>
      </div>

      <div class="w-full md:w-1/2 hidden md:flex items-center justify-center">
        <img src="../../assets/css/image/logo.png" alt="Login Illustration" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>




