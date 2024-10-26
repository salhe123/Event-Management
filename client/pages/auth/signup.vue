<script setup>
import { ref } from 'vue';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';

const router = useRouter();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

// Signup mutation
const SIGNUP_MUTATION = gql`
  mutation Signup($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
    insert_users(objects: { first_name: $first_name, last_name: $last_name, email: $email, password: $password }) {
      returning {
        id
        first_name
        last_name
        email
      }
    }
  }
`;

const { mutate: signup } = useMutation(SIGNUP_MUTATION);

const handleSignup = async () => {
  try {
    const response = await signup({
      variables: {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
      },
    });
    if (response.data.insert_users.returning.length) {
      alert('User created successfully!');
      router.push('/profile/index');
    }
  } catch (error) {
    alert('Error creating user: ' + error.message);
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-center">Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="space-y-4">
          <div>
            <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="first_name"
              v-model="firstName"
              placeholder="Enter your first name"
              class="p-3 mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="last_name"
              v-model="lastName"
              placeholder="Enter your last name"
              class="p-3 mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              class="p-3 mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="p-3 mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              required
            />
          </div>
          <button          
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p class="text-center text-sm text-gray-600">
        Already have an account? <nuxt-link to="/auth/login" class="text-blue-600 hover:underline">Log in</nuxt-link>
      </p>
    </div>
  </div>
</template>
