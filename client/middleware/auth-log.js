export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("token");

    // Define protected routes
    const protectedRoutes = [
      "/user",
      "/user/createEvent",
      "/user/bookMark",
      "/user/ticketView",
      "/user/uploadprofile",
    ];

    if (!token && protectedRoutes.includes(to.path)) {
      return navigateTo("/auth/login");
    }
  }
});
