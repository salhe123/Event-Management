import { ref } from 'vue';
import { useApolloClient } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';

export function useAuth() {
    const client = useApolloClient().client;
    const router = useRouter();
    const loading = ref(false);
    const error = ref(null);
    const token = ref(localStorage.getItem('token') || null);

    const LOGIN_MUTATION = gql`
        mutation login($email: String!, $password: String!) {
            login(args: { email: $email, password: $password }) {
                token
            }
        }
    `;

    const SIGNUP_MUTATION = gql`
        mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
            signup(
                args: {
                    first_name: $firstName
                    last_name: $lastName
                    email: $email
                    password: $password
                }
            ) {
                message
            }
        }
    `;

    // Login function
    const login = async (email, password) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await client.mutate({
                mutation: LOGIN_MUTATION,
                variables: { email, password },
            });
            const userToken = response.data.login.token;
            token.value = userToken;
            localStorage.setItem('token', userToken);
            client.resetStore(); // Reset Apollo cache
            await router.push('/'); // Redirect to homepage or dashboard after login
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    // Signup function
    const signup = async (firstName, lastName, email, password) => {
        loading.value = true;
        error.value = null;

        try {
            await client.mutate({
                mutation: SIGNUP_MUTATION,
                variables: { firstName, lastName, email, password },
            });
            await login(email, password); // Auto-login after signup
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    // Logout function
    const logout = async () => {
        token.value = null;
        localStorage.removeItem('token');
        await client.resetStore(); // Clear Apollo cache
        await router.push('/login');
    };

    return {
        loading,
        error,
        token,
        login,
        signup,
        logout,
    };
}
