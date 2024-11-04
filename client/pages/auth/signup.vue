<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm, ErrorMessage, Field } from "vee-validate";
import * as yup from "yup";


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
  mutation Signup(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
  ) {
    signup(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
    ) {
      id
    }
  }
`;

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  console.log("Submitted values:", values);
  const variables = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    password: values.password,
  };
  console.log("the variables", variables);
  const { mutate } = useMutation(SIGNUP_MUTATION, {
    variables,
    context: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  console.log("the variables", mutate);

  try {
    console.log(variables);
    // Execute the mutation with the variables
    const { data } = await mutate({variables});
    console.log("Mutation response:", data);

    // Redirect to the login page after successful signup
    router.push("/index");
  } catch (err) {
    error.value = "An error occurred during signup";
    console.error("Mutation error:", err);
  }
});
</script>

<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gray-800 overflow-hidden relative"
  >
    <img
      src="../../assets/css/image/image.png"
      alt="Background"
      class="absolute inset-0 object-cover w-full h-full opacity-50"
    />
    <div class="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg z-10">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <h2 class="text-3xl font-bold text-center text-white">
          Create Your Account
        </h2>

        <div
          v-if="error"
          class="text-xl font-semibold text-center text-red-500"
        >
          {{ error }}
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="first_name"
              class="block text-gray-300 text-sm font-bold mb-2"
              >First Name</label
            >
            <Field
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              class="w-full p-3 border border-gray-700 rounded-lg shadow-sm"
            />
            <ErrorMessage
              name="first_name"
              class="text-red-500 text-sm italic"
            />
          </div>

          <div>
            <label
              for="last_name"
              class="block text-gray-300 text-sm font-bold mb-2"
              >Last Name</label
            >
            <Field
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              class="w-full p-3 border border-gray-700 rounded-lg shadow-sm"
            />
            <ErrorMessage
              name="last_name"
              class="text-red-500 text-sm italic"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-gray-300 text-sm font-bold mb-2"
            >Email</label
          >
          <Field
            name="email"
            type="email"
            placeholder="Enter your email"
            class="w-full p-3 border border-gray-700 rounded-lg shadow-sm"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm italic" />
        </div>

        <div>
          <label
            for="password"
            class="block text-gray-300 text-sm font-bold mb-2"
            >Password</label
          >
          <div class="relative">
            <Field
              name="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="w-full p-3 border border-gray-700 rounded-lg shadow-sm"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <span v-if="showPassword">Hide</span>
              <span v-else>Show</span>
            </button>
            <ErrorMessage name="password" class="text-red-500 text-sm italic" />
          </div>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-gray-300 text-sm font-bold mb-2"
            >Confirm Password</label
          >
          <div class="relative">
            <Field
              name="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              class="w-full p-3 border border-gray-700 rounded-lg shadow-sm"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <span v-if="showConfirmPassword">Hide</span>
              <span v-else>Show</span>
            </button>
            <ErrorMessage
              name="confirmPassword"
              class="text-red-500 text-sm italic"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the background image fills the screen */
.relative {
  position: relative;
}

img {
  z-index: -1;
}

.button {
  transition: background-color 0.3s ease;
}
</style>
