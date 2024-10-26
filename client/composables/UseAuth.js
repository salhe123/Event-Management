import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
    insert_users(objects: { first_name: $first_name, last_name: $last_name, email: $email, password: $password }) {
      returning {
        id
        first_name
        last_name
        password
        email
      }
    }
  }
`;
export function useAuth() {
  const apolloClient = useApolloClient();
  console.log(apolloClient)
  const router = useRouter();
  const user = ref(null);
  const error = ref(null);

  const clearError = () => (error.value = null);

  const loginUser = async (email, password) => {
    clearError();
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      });
      if (data?.login?.token) {
        localStorage.setItem('token', data.login.token);
        user.value = { email };
        await router.push('/profile/index');
      }
    } catch (e) {
      error.value = e.message;
    }
  };

  const signupUser = async (first_name, last_name, email, password) => {
    clearError();
    try {
      const { data } = await apolloClient.mutate({
        mutation: SIGNUP_MUTATION,
        variables: { first_name, last_name, email, password },
      });
      if (data?.signup?.token) {
        localStorage.setItem('token', data.signup.token);
        user.value = { first_name, email };
        await router.push('/profile/index');
      }
    } catch (e) {
      error.value = e.message;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    user.value = null;
    router.push('/auth/login');
  };

  const isAuthenticated = () => !!localStorage.getItem('token');

  return {
    user,
    error,
    loginUser,
    signupUser,
    logoutUser,
    isAuthenticated,
  };
}
