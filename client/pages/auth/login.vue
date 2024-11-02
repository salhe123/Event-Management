<script setup>
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useApolloClient, gql } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';

const client = useApolloClient();
const router = useRouter();

// GraphQL mutation for login
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// Form validation
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
  }),
});

const { value: email, errorMessage: emailError, handleBlur: handleEmailBlur } = useField('email');
const { value: password, errorMessage: passwordError, handleBlur: handlePasswordBlur } = useField('password');
const loginError = ref('');

// Login function
const handleLogin = async (values) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: values.email,
        password: values.password,
      },
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
  <div class="font-sans min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
      <h3 class="text-2xl font-semibold text-gray-900 text-center mb-6">Welcome Back</h3>
      <p class="text-sm text-center text-gray-700 mb-8">
        Don’t have an account? 
        <nuxt-link to="/auth/signup" class="text-blue-600 font-semibold hover:underline ml-1">Sign up</nuxt-link>
      </p>

      <form @submit.prevent="handleSubmit(handleLogin)" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" @blur="handleEmailBlur" type="text" required class="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" />
          <span v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" @blur="handlePasswordBlur" type="password" required class="w-full mt-1 px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your password" />
          <span v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</span>
        </div>

        <span v-if="loginError" class="text-red-500 text-sm">{{ loginError }}</span>

        <button type="submit" :disabled="isSubmitting" class="w-full mt-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">Sign in</button>
      </form>
    </div>
  </div>
</template>
