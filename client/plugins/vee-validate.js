// plugins/vee-validate.js
import { defineNuxtPlugin } from '#app';
import { configure } from 'vee-validate';

export default defineNuxtPlugin(() => {
  configure({
    // Your VeeValidate configuration
  });
});
