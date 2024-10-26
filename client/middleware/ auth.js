// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const token = process.client ? localStorage.getItem('token') : null;

  if (!token) {
    return navigateTo('/auth/login'); // Redirect to login if no token
  }
});
