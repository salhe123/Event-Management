<script setup>
definePageMeta({
  middleware: "after-log",
  layout: "empty",
});

import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import Eye from "../../assets/icons/Eye.vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { REGISTER_USER_MUTATION } from "../../util/queries";

// Import background image
import BackgroundImage from "../../assets/css/event.jpeg";

const router = useRouter();
const { resetForm, setErrors } = useForm();

// Validation schema using yup
const schema = yup.object({
  username: yup.string().required("User name is required"),
  email: yup.string().required("The email must not be empty").email("Invalid email address"),
  password: yup
    .string()
    .required("The password is required")
    .min(5, "The password must contain at least 5 characters")
    .max(10, "The password can contain at most 10 characters")
});

const alertMessage = ref("");
const alertVisible = ref(false);
const alertType = ref("success");

const showAlert = (message, type = "success") => {
  alertMessage.value = message;
  alertType.value = type;
  alertVisible.value = true;

  setTimeout(() => {
    alertVisible.value = false;
  }, 2000);
};

const { mutate: registerUser } = useMutation(REGISTER_USER_MUTATION);

const userData = ref({
  email: "",
  password: "",
  username: "",
});

const togglePassword = ref(false);
const successMessage = ref("");

const showPassword = () => {
  togglePassword.value = !togglePassword.value;
};

const signupRegister = async () => {
  try {
    const { data } = await registerUser({
      email: userData.value.email,
      password: userData.value.password,
      username: userData.value.username
    });

    if (data && data.signup) {
      successMessage.value = data.signup.message;
      showAlert(data.signup.message, "success");
      resetForm();
      router.push("/auth/login");
    } else {
      console.error("No response from server");
    }
  } catch (error) {
    showAlert("Registration Error", "error");
  }
};
</script>

<template>
  <div 
    class="flex flex-col min-h-screen bg-cover bg-center justify-center items-center"
    :style="{ backgroundImage: `url(${BackgroundImage})` }"
  >
    <AlertMessage :message="alertMessage" :type="alertType" :visible="alertVisible" />

    <Form @submit="signupRegister" :validation-schema="schema" class="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
      <h1 class="font-bold text-3xl mb-6 text-white">Sign up</h1>

      <div class="flex flex-col w-full mb-4">
        <label class="font-semibold text-white mb-2">User Name</label>
        <Field 
          type="text" 
          name="username"
          v-model="userData.username" 
          placeholder="Enter your username" 
          class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <ErrorMessage name="username" class="text-red-500 text-sm" />
      </div>

      <div class="flex flex-col w-full mb-4">
        <label class="font-semibold text-white mb-2">Email</label>
        <Field 
          type="text" 
          name="email"
          v-model="userData.email" 
          placeholder="Enter your email" 
          class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <ErrorMessage name="email" class="text-red-500 text-sm" />
      </div>

      <div class="flex flex-col w-full mb-6 relative">
        <label class="font-semibold text-white mb-2">Password</label>
        <Field 
          :type="togglePassword ? 'text' : 'password'"
          name="password"
          v-model="userData.password" 
          placeholder="Enter your password" 
          class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <ErrorMessage name="password" class="text-red-500 text-sm" />
        <Eye class="absolute top-10 right-3 cursor-pointer" @click="showPassword">
          {{ togglePassword ? 'Hide' : 'Show' }}
        </Eye>
      </div>

      <button 
        type="submit" 
        class="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Sign Up
      </button>

      <p class="font-semibold text-center mt-4 text-white">
        Already have an account? 
        <NuxtLink to="/auth/login" class="text-blue-600">Login</NuxtLink>
      </p>
    </Form>
  </div>
</template>

<style scoped>
/* Additional Styling */
.bg-opacity-80 {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0,0, 0));
}

button:hover {
  background-color: #5a67d8;
}
</style>
