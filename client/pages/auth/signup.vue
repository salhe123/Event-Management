<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm, ErrorMessage, Field } from "vee-validate";
import * as yup from "yup";
import { useMutation } from "@vue/apollo-composable";
// import gql from 'graphql-tag';

// Validation schema
const schema = yup.object({
  first_name: yup
    .string()
    .min(3, "First name must be at least 3 characters")
    .required("Please enter your first name"),
  last_name: yup
    .string()
    .min(3, "Last name must be at least 3 characters")
    .required("Please enter your last name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const error = ref("");
const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: first_name } = useField("first_name");
const { value: last_name } = useField("last_name");
const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: confirmPassword } = useField("confirmPassword");

// Define the GraphQL mutation
const SIGNUP_MUTATION = gql`
  mutation (
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
  ) {
    insert_users_one(
      object: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
      }
    ) {
      id
    }
  }
`;

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  console.log("Submitted values:", values);

  // Prepare the variables to match the input structure defined in the mutation
  const variables = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    password: values.password,
  };

  const { mutate } = useMutation(SIGNUP_MUTATION, {
    variables,
    context: {
      Headers: {
        "Content-Type": "application/json",
      },
    },
  });

  try {
    const { data } = await mutate(variables);
    console.log("Mutation response:", data);
    router.push("/auth/login"); // Redirect after successful signup
  } catch (err) {
    if (err.graphQLErrors && err.graphQLErrors[0]) {
      error.value = err.graphQLErrors[0].message; // Display specific GraphQL error message
    } else {
      error.value = "An error occurred during signup";
    }
  }
});
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
            Create Your Account
          </h2>

          <div
            v-if="error"
            class="text-lg font-semibold text-center text-red-500"
          >
            {{ error }}
          </div>

          <!-- First and Last Name Row -->
          <div class="flex gap-4">
            <div class="relative w-1/2">
              <label
                for="first_name"
                class="block text-gray-600 text-sm font-bold mb-2"
                >First Name</label
              >
              <Field
                name="first_name"
                type="text"
                placeholder="First name"
                class="w-full p-1 pl-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 text-gray-800"
              />
              <ErrorMessage
                name="first_name"
                class="text-red-500 text-sm italic"
              />
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i class="fas fa-user text-gray-400"></i>
              </span>
            </div>

            <div class="relative w-1/2">
              <label
                for="last_name"
                class="block text-gray-600 text-sm font-bold mb-2"
                >Last Name</label
              >
              <Field
                name="last_name"
                type="text"
                placeholder="Last name"
                class="w-full p-1 pl-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 text-gray-800"
              />
              <ErrorMessage
                name="last_name"
                class="text-red-500 text-sm italic"
              />
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i class="fas fa-user text-gray-400"></i>
              </span>
            </div>
          </div>

          <div class="relative">
            <label
              for="email"
              class="block text-gray-600 text-sm font-bold mb-2"
              >Email</label
            >
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              class="w-full p-1 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm italic" />
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i class="fas fa-envelope text-gray-400"></i>
            </span>
          </div>

          <div class="relative">
            <label
              for="password"
              class="block text-gray-600 text-sm font-bold mb-2"
              >Password</label
            >
            <Field
              name="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="w-full p-1 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
            <ErrorMessage name="password" class="text-red-500 text-sm italic" />
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i class="fas fa-lock text-gray-400"></i>
            </span>
          </div>

          <div class="relative">
            <label
              for="confirmPassword"
              class="block text-gray-600 text-sm font-bold mb-2"
              >Confirm Password</label
            >
            <Field
              name="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              class="w-full p-3 pl-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
            >
              <i
                :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              ></i>
            </button>
            <ErrorMessage
              name="confirmPassword"
              class="text-red-500 text-sm italic"
            />
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i class="fas fa-lock text-gray-400"></i>
            </span>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </button>

          <!-- Already have an account? -->
          <div class="text-center mt-4 text-gray-700">
            <nuxt-link
              to="/auth/login"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Already have an account? Log in here.
            </nuxt-link>
          </div>
        </form>
      </div>

      <!-- Image Section -->
      <div
        class="w-full md:w-1/2 hidden md:flex items-center justify-center bg-gray-200"
      >
        <img
          src="../../assets/css/image/logo.png"
          alt="Create Account Illustration"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling here if necessary */
</style>
