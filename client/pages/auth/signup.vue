<script setup>
import { useApolloClient } from '@vue/apollo-composable';
import { signup } from '@/composables/UseAuth';
import * as yup from 'yup';
import { useField, Form, Field, ErrorMessage } from 'vee-validate';
import { useRouter } from '#imports'; // Use Nuxt's useRouter composable

// Yup validation schema
const signupSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

// Apollo Client and error state
const error = ref(null);
const client = useApolloClient();
const router = useRouter(); // Use Nuxt router for navigation

// Signup function
const handleSignup = async (values) => {
  try {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    };
    const response = await signup(client, data);
    console.log('Signup successful:', response);

    // Redirect to dashboard on successful signup
    router.push('/index');
  } catch (err) {
    error.value = err.message || 'Signup failed';
  }
};
</script>

<template>
  <div class="font-[sans-serif]">
    <div class="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[160px] sm:p-6 p-4">
      <h4 class="sm:text-3xl text-2xl font-bold text-white">Create your free account</h4>
    </div>

    <div class="mx-4 mb-4 -mt-16">
      <Form :validation-schema="signupSchema" @submit="handleSignup" class="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
        <div class="grid md:grid-cols-2 gap-8">
          <button type="button" class="w-full px-6 py-3 flex items-center justify-center rounded-md text-gray-800 text-sm tracking-wider font-semibold bg-gray-100 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="22px" fill="#fff" class="inline shrink-0 mr-4" viewBox="0 0 512 512">
              <!-- SVG path for Google icon -->
            </svg>
            Continue with Google
          </button>
          <button type="button" class="w-full px-6 py-3 flex items-center justify-center rounded-md text-white text-sm tracking-wider font-semibold bg-black hover:bg-[#333]">
            <svg xmlns="http://www.w3.org/2000/svg" width="22px" fill="#fff" class="inline shrink-0 mr-4" viewBox="0 0 22.773 22.773">
              <!-- SVG path for Github icon -->
            </svg>
            Continue with Github
          </button>
        </div>

        <div class="my-8 flex items-center">
          <p class="mx-4 text-center">Or</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <label class="text-gray-800 text-sm mb-2 block">First Name</label>
            <Field name="firstName" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter name" />
            <ErrorMessage name="firstName" class="text-red-600 text-sm mt-1" />
          </div>
          <div>
            <label class="text-gray-800 text-sm mb-2 block">Last Name</label>
            <Field name="lastName" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter last name" />
            <ErrorMessage name="lastName" class="text-red-600 text-sm mt-1" />
          </div>
          <div>
            <label class="text-gray-800 text-sm mb-2 block">Email</label>
            <Field name="email" type="email" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter email" />
            <ErrorMessage name="email" class="text-red-600 text-sm mt-1" />
          </div>
          <div>
            <label class="text-gray-800 text-sm mb-2 block">Password</label>
            <Field name="password" type="password" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter password" />
            <ErrorMessage name="password" class="text-red-600 text-sm mt-1" />
          </div>
          <div>
            <label class="text-gray-800 text-sm mb-2 block">Confirm Password</label>
            <Field name="confirmPassword" type="password" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Confirm password" />
            <ErrorMessage name="confirmPassword" class="text-red-600 text-sm mt-1" />
          </div>
        </div>

        <button type="submit" class="mt-10 w-full px-6 py-3 rounded-md text-white text-sm tracking-wider font-semibold bg-blue-600 hover:bg-blue-500">
          Sign up
        </button>

        <p class="text-sm mt-4 text-center">Already have an account? <a href="/login" class="text-blue-600">Login here</a></p>
      </Form>
    </div>
  </div>
</template>
