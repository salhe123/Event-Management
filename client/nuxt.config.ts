import { defineNuxtConfig } from "nuxt/config";
import path from "path";

const __dirname = path.resolve();

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT || "",
    },
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  },

  modules: ["@nuxtjs/apollo", "@nuxt/icon", '@pinia/nuxt'],
  
  imports: {
    dirs: ["./stores"], // Automatically import stores
    autoImport: true, // Automatically import Pinia composables
  },

  devtools: { enabled: true },

  icon: {
    serverBundle: {
      collections: ["uil", "mdi"],
    },
  },

  css: ["~/assets/css/main.css", "@fortawesome/fontawesome-free/css/all.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: ["@/plugins/auth.ts"],

  apollo: {
    clients: {
      default: {
        httpEndpoint:
          process.env.HASURA_GRAPHQL_ENDPOINT ||
          "http://localhost:8080/v1/graphql",

        httpLinkOptions: {
          headers: {
            "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "",
            Authorization: `Bearer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token") || ""
                : ""
            }`,
            "Content-Type": "application/json",
          },
        },
      },
    },
  },

  alias: {
    "@": path.resolve(__dirname, "./"), // Resolve paths relative to __dirname
  },

  compatibilityDate: "2024-08-28",
});
