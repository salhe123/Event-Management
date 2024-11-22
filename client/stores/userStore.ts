import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { gql } from "@apollo/client/core";

export const useUserStore = defineStore("auth", () => {
  const router = useRouter();

  // State
  const token = ref<string | null>(null);
  const user = ref<{ id: number; role: string } | null>(null);

  // GraphQL Query
  const FETCH_USER_QUERY = gql`
    query GetUser($id: Int!) {
      users(where: { id: { _eq: $id } }) {
        id
        username
        email
        role
      }
    }
  `;

  // Actions
  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem("auth_token", newToken); // Save token in localStorage for persistence
  }

  function setUser(userData: { id: number; role: string }) {
    user.value = userData;
    localStorage.setItem("auth_user", JSON.stringify(userData)); // Save user data in localStorage
  }

  async function fetchUser() {
    const storedUser = localStorage.getItem("auth_user");
  
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    } else {
      const storedToken = localStorage.getItem("auth_token");
  
      if (!storedToken) {
        console.warn("No token found");
        return;
      }
  
      const userId = parseToken(storedToken); // Extract user ID from the token
  
      try {
        const apollo = useApollo(); // Access Apollo clients
  
        // Check if the clients object exists and contains the 'default' client
        if (apollo?.clients?.default) {
          const client = apollo.clients.default;
  
          const { data } = await client.query({
            query: FETCH_USER_QUERY,
            variables: { id: userId },
          });
  
          if (data.users.length > 0) {
            setUser(data.users[0]); // Set the first user's data
          } else {
            console.warn("User not found");
          }
        } else {
          console.error("Apollo client is not configured correctly.");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
  }
  
  

  function loadStoredCredentials() {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    if (storedToken) token.value = storedToken;
    if (storedUser) user.value = JSON.parse(storedUser);
  }

  function clearAuth() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    router.push("/auth/login"); // Redirect to login page
  }

  // Getters
  const isAuthenticated = () => !!token.value;

  return {
    token,
    user,
    setToken,
    setUser,
    fetchUser,
    loadStoredCredentials,
    clearAuth,
    isAuthenticated,
  };
});

// Helper function to parse the token and extract user ID
function parseToken(token: string): number {
  const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  return payload.user_id; // Adjust to match your JWT structure
}
