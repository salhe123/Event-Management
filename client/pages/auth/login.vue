<script setup>

definePageMeta({
  layout: "empty"
  
});
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from 'yup'; 
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import Eye from "../../assets/icons/Eye.vue";
import event from "../../assets/css/event.jpeg";

import { useRouter } from 'vue-router';
import { getUserIdFromToken } from "../../util/util";
import { LOGIN_MUTATION } from "../../util/queries";

definePageMeta({
  middleware: "after-log"
});

const alertMessage = ref('');
const alertVisible = ref(false);
const alertType = ref('success');
const router = useRouter();
const user = ref({
  email: "",
  password: ""
});

// Form validation schema (using Yup)
const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("The email must not be empty"),
  password: yup
    .string()
    .min(5, "The password must contain at least 5 characters")
    .max(10, "The password can contain at most 10 characters")
    .required("The password must not be empty")
});

// Toggle password visibility
const togglePassword = ref(false);
const showPassword = () => {
  togglePassword.value = !togglePassword.value;
};

const showAlert = (message, type = 'success') => {
  alertMessage.value = message;
  alertType.value = type;
  alertVisible.value = true;
  setTimeout(() => {
    alertVisible.value = false;
  }, 3000); // Adjusted timeout for better visibility
};

const { mutate: loginUser } = useMutation(LOGIN_MUTATION);

// Error handling
const { resetForm } = useForm();

const onSubmit = async () => {
  try {
    const { data } = await loginUser({
      email: user.value.email,
      password: user.value.password,
    });
    console.log(data);

    if (data && data.login && data.login.token) {
      const token = data.login.token;
      console.log(token);
      localStorage.setItem('token', token);
      const userId = getUserIdFromToken(token);
      if (userId) {
        localStorage.setItem('userId', userId);
      } else {
        console.log('Failed to decode user ID from token');
      }

      const redirectPath = localStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        // localStorage.removeItem('redirectAfterLogin');
        router.push(redirectPath);
      } else {
        showAlert('You logged in successfully', 'success');
        setTimeout(() => {
          router.replace("/user");
        }, 2000);
      }
    }
  } catch (error) {
    showAlert("Login failed. Please check your credentials.", 'error');
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100 justify-center items-center bg-cover bg-center" :style="{ backgroundImage: `url(${event})`}">
    <AlertMessage :message="alertMessage" :type="alertType" :visible="alertVisible" />

    <Form @submit="onSubmit" :validation-schema="schema" class="flex flex-col justify-center items-center w-full max-w-lg p-8 bg-white rounded-xl shadow-lg backdrop-blur-md bg-opacity-80">
      <h1 class="font-bold text-3xl mb-6 text-white">Sign in</h1>

      <div class="flex flex-col w-full mb-6">
        <label class="font-semibold text-white mb-2">Email</label>
        <Field 
          type="email" 
          name="email"
          v-model="user.email" 
          placeholder="Enter your email" 
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="flex flex-col w-full mb-8">
        <label class="font-semibold text-white mb-2">Password</label>
        <div class="flex flex-col relative">
          <Field 
            :type="togglePassword ? 'text' : 'password'"
            name="password"
            v-model="user.password" 
            placeholder="Enter your password" 
            class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
          <Eye class="absolute top-3 right-3 cursor-pointer" @click="showPassword" />
        </div>
      </div>

      <button 
        type="submit" 
        class="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Login
      </button>

      <p class="font-semibold mt-4 text-white">
        Don't have an account?
        <NuxtLink to="/auth/signup" class="text-blue-600 hover:text-blue-800">Sign Up</NuxtLink>
      </p>
    </Form>
  </div>
</template>
<style scoped>
/* Custom styles to handle the overlay opacity */
.bg-opacity-80 {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0,0, 0));
  
}
</style>