import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT || "",
    },
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  },

  modules: [
    "@nuxtjs/apollo",
    "@nuxt/icon",
    // "@pinia/nuxt",
    // "vuetify-nuxt-module",
    // "@vueuse/core",
  ],

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

  compatibilityDate: "2024-08-28",
});
