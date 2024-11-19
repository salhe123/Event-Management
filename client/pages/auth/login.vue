<script setup>
import { ref } from 'vue';
import { useField, useForm, ErrorMessage, Field } from 'vee-validate';
import * as yup from 'yup';


const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Please enter your email address'),
  password: yup.string().min(5).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, 'Please create a stronger password').required('Please enter a password'),
});

const router = useRouter();
const showPassword = ref(false);
const error = ref('');
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});




const { value: email } = useField('email');
const { value: password } = useField('password');

const { setToken } = useAuthStore();
const { setUser } = useUserStore();


// Define the GraphQL mutation with correct variable type
const LOGIN_MUTATION = gql`
   mutation MyMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)  {
      id
      token
      role
    }
  }
`;

// Handle form submission
const onSubmit = handleSubmit(async (values) => {
  // Prepare variables to be passed to the mutation
  const variables = {
    object: {
      email: values.email,
      password: values.password,
    },
  };

  console.log("variables:", variables);

  //Initialize the mutation
  // const { mutate } = useMutation(LOGIN_MUTATION);

  // Initialize the mutation with headers
  const { mutate } = useMutation(LOGIN_MUTATION, {
    context: {
      headers: {
        'Content-Type': 'application/json', // Specify content type if necessary
        // Include Authorization header if using tokens
        // 'Authorization': 'Bearer <your_token_if_needed>', // Replace with the token if you need to send it
      },
    },
  });
  // Initialize the mutation with headers

  try {
    // Execute the mutation with the variables
    const { data } = await mutate(variables);
    // Extract token and user_id from the response
    // const { user_id, token,role } = data.userLogin;
    // setToken(token);
    // setUser({ user_id, role });
        const { user_id, token, role, name, email } = data.login;
        console.log("kkkkkkkkkkkkkkkk",data.userLogin);

    setToken(token);
    setUser({ user_id, role, name, email }); // Store the complete user info

    // Optionally, store user info in local storage
    // localStorage.setItem('user', JSON.stringify({ user_id, role, name, email }));
    

    console.log('Mutation response:', data);

   
  

   // Redirect based on user role after successful login
    if (role === 'users') {
      router.push('/');
    } else {
      router.push('/login');
    }
  } catch (err) {
    error.value = 'An error occurred during login';
    console.error('Mutation error:', err);
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
      <div class="w-full md:w-1/2 p-8">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-3xl font-bold text-center text-white">
            Login to Your Account
          </h2>

          <div
            v-if="error"
            class="text-lg font-semibold text-center text-red-500"
          >
            {{ error }}
          </div>

          <!-- Email input -->
          <div class="relative">
            <label
              for="email"
              class="block text-gray-600 text-sm font-bold mb-2"
              >Email</label
            >
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
            <label
              for="password"
              class="block text-gray-600 text-sm font-bold mb-2"
              >Password</label
            >
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
            <nuxt-link
              to="#"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Forgot your password? Reset here.
            </nuxt-link>
          </div>

          <div class="text-center mt-4 text-gray-700">
            <nuxt-link
              to="/auth/signup"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Don't have an account? Sign up here.
            </nuxt-link>
          </div>
        </form>
      </div>

      <div class="w-full md:w-1/2 hidden md:flex items-center justify-center">
        <img
          src="../../assets/css/image/logo.png"
          alt="Login Illustration"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>



