import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT,
    },
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  },

  modules: ['@nuxtjs/apollo'],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  apollo: {
    defaultClient: {
      httpEndpoint: 'http://localhost:8080', // Ensure this is correct
    },
  },

  compatibilityDate: '2024-08-28',
});
