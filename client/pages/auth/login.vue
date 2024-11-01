<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useApolloClient } from '@vue/apollo-composable';
import { login } from '@/composables/UseAuth';
const client = useApolloClient();
const router = useRouter();

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
  }),
});

const { value: email, errorMessage: emailError, handleBlur: handleEmailBlur } = useField('email');
const { value: password, errorMessage: passwordError, handleBlur: handlePasswordBlur } = useField('password');
const loginError = ref('');

const handleLogin = async (values) => {
  try {
    const { data } = await login(client, {
      email: values.email,
      password: values.password,
    });
    localStorage.setItem('token', data.login.token);
    router.push('/index');
  } catch (err) {
    loginError.value = 'Login failed. Please check your credentials.';
    console.error('Login error:', err.message);
  }
};
</script>

<template>
  <div class="font-[sans-serif]">
    <div class="min-h-screen flex flex-col items-center justify-center">
      <div class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div class="md:max-w-md w-full px-4 py-4">
          <form @submit.prevent="handleSubmit(handleLogin)">
            <div class="mb-12">
              <h3 class="text-gray-800 text-3xl font-extrabold">Sign in</h3>
              <p class="text-sm mt-4 text-gray-800">
                Don't have an account? <nuxt-link to="/auth/signup" class="text-blue-600 font-semibold hover:underline ml-1">Register here</nuxt-link>
              </p>
            </div>

            <div class="mb-6">
              <label class="text-gray-800 text-xs block mb-2">Email</label>
              <div class="relative flex items-center">
                <input v-model="email" @blur="handleEmailBlur" type="text" required class="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" :class="{ 'border-red-500': emailError, 'border-green-500': !emailError && email }" placeholder="Enter email" />
                <span v-if="emailError" class="text-red-600 text-xs mt-1">{{ emailError }}</span>
              </div>
            </div>

            <div class="mb-6">
              <label class="text-gray-800 text-xs block mb-2">Password</label>
              <div class="relative flex items-center">
                <input v-model="password" @blur="handlePasswordBlur" type="password" required class="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" :class="{ 'border-red-500': passwordError, 'border-green-500': !passwordError && password }" placeholder="Enter password" />
                <span v-if="passwordError" class="text-red-600 text-xs mt-1">{{ passwordError }}</span>
              </div>
            </div>

            <span v-if="loginError" class="text-red-600 text-sm">{{ loginError }}</span>

            <div class="flex items-center justify-between gap-4 mt-6">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-3 text-sm text-gray-800">Remember me</label>
              </div>
              <nuxt-link to="#" class="text-blue-600 font-semibold text-sm hover:underline">Forgot Password?</nuxt-link>
            </div>

            <button type="submit" :disabled="isSubmitting" class="w-full mt-8 shadow-xl py-2.5 px-4 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
