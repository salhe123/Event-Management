import { defineNuxtPlugin } from "nuxt/app";
import { useUserStore } from "../stores/userStore";

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();

  if (process.client) {
    await userStore.fetchUser(); 
  }
});
