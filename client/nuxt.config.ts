import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT || "",
    },
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  },

  modules: ['@nuxtjs/apollo', '@nuxt/icon'],
  devtools: { enabled: true },
  icon: {
    serverBundle: {
      collections: ['uil', 'mdi'],
    },
  },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.HASURA_GRAPHQL_ENDPOINT || "",
     
      },
    },
  },

  compatibilityDate: '2024-08-28',
});
