export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  if (process.client) {
    // Ensure credentials are loaded from localStorage
    const token = authStore.getToken; // Now it's a computed property
    userStore.loadStoredCredentials(); // Load user credentials before checking them

    const isAuthenticated = token !== null;
    const userRole = userStore.user?.role || null; // Ensure role is checked only after loading

    console.log(`[Auth Middleware] Navigating to: ${to.path}`);
    console.log(`[Auth Middleware] Authenticated: ${isAuthenticated}`);
    console.log(`[Auth Middleware] User Role: ${userRole}`);

    // Always allow public pages (e.g., login and signup)
    const publicPages = ["/auth/login", "/auth/signup"];
    const isPublicPage = publicPages.includes(to.path);

    // Redirect unauthenticated users to login
    if (!isAuthenticated && !isPublicPage) {
      return navigateTo("/auth/login");
    }

    // Redirect authenticated users away from login and signup
    if (isAuthenticated && isPublicPage) {
      return navigateTo("/");
    }

    // Role-based routing
    if (isAuthenticated) {
      // Admin routes
      if (userRole === "admin" && !to.path.startsWith("/admin")) {
        return navigateTo("/admin");
      }

      // Non-admins trying to access admin routes
      if (userRole !== "admin" && to.path.startsWith("/admin")) {
        return navigateTo("/");
      }

      // User-specific routes
      if (userRole === "user" && !to.path.startsWith("/user")) {
        return navigateTo("/user");
      }
    }
  }
});
