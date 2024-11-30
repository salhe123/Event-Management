export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`Navigating to: ${to.path}`);
  
  if (process.client) {
    const token = localStorage.getItem("token");

    if (token) {
      if (to.path === '/auth/login' || to.path === '/auth/signup') {
        return navigateTo('/user'); // Redirect authenticated users
      }
    }
  }
});
