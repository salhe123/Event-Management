<template>
    <div class="font-sans bg-white p-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">
            Checkout
          </h2>
        </div>
  
        <div class="mt-12">
          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <h3 class="text-3xl font-bold text-gray-300">01</h3>
              <h3 class="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
            </div>
  
            <div class="md:col-span-2">
              <form @submit.prevent="handlePersonalDetailsSubmit">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      v-model="firstName"
                      type="text"
                      placeholder="First name"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      v-model="lastName"
                      type="text"
                      placeholder="Last name"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      v-model="email"
                      type="email"
                      placeholder="Email address"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      v-model="phoneNumber"
                      type="number"
                      placeholder="Phone number"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
  
          <div class="grid md:grid-cols-3 gap-4 mt-12">
            <div>
              <h3 class="text-3xl font-bold text-gray-300">02</h3>
              <h3 class="text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
            </div>
  
            <div class="md:col-span-2">
              <form @submit.prevent="handleAddressSubmit">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      v-model="streetAddress"
                      type="text"
                      placeholder="Street address"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      v-model="city"
                      type="text"
                      placeholder="City"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      v-model="state"
                      type="text"
                      placeholder="State"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      v-model="zipCode"
                      type="number"
                      placeholder="Zip Code"
                      class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
  
          <div class="grid md:grid-cols-3 gap-4 mt-12">
            <div>
              <h3 class="text-3xl font-bold text-gray-300">03</h3>
              <h3 class="text-xl font-bold text-gray-800 mt-1">Payment method</h3>
            </div>
  
            <div class="md:col-span-2">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="flex items-center">
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    class="w-5 h-5 cursor-pointer"
                    id="card"
                    value="card"
                    checked
                  />
                  <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                    <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
                    <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
                    <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
                  </label>
                </div>
  
                <div class="flex items-center">
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    class="w-5 h-5 cursor-pointer"
                    id="paypal"
                    value="paypal"
                  />
                  <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
                    <img src="https://readymadeui.com/images/paypal.webp" class="w-20" alt="paypalCard" />
                  </label>
                </div>
              </div>
  
              <div class="grid sm:grid-cols-4 gap-4 mt-4">
                <div class="col-span-2">
                  <input
                    v-model="cardNumber"
                    type="number"
                    placeholder="Card number"
                    class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    v-model="expDate"
                    type="text"
                    placeholder="EXP."
                    class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    v-model="cvv"
                    type="number"
                    placeholder="CVV"
                    class="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
  
          <div class="flex flex-wrap justify-end gap-4 mt-12">
            <button
              type="button"
              class="px-6 py-3 text-sm font-semibold tracking-wide bg-transparent border-2 text-gray-800 rounded-md hover:bg-gray-100"
              @click="payLater"
            >
              Pay later
            </button>
            <button
              type="button"
              class="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700"
              @click="payNow"
            >
              Pay now
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const phoneNumber = ref('');
  const streetAddress = ref('');
  const city = ref('');
  const state = ref('');
  const zipCode = ref('');
  const cardNumber = ref('');
  const expDate = ref('');
  const cvv = ref('');
  const paymentMethod = ref('card');
  
  const handlePersonalDetailsSubmit = () => {
    // Handle personal details submission
    console.log('Personal Details:', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
    });
  };
  
  const handleAddressSubmit = () => {
    // Handle address submission
    console.log('Address:', {
      streetAddress: streetAddress.value,
      city: city.value,
      state: state.value,
      zipCode: zipCode.value,
    });
  };
  
  const payLater = () => {
    // Handle "Pay later" action
    console.log('Pay later option selected');
  };
  
  const payNow = () => {
    // Handle "Pay now" action
    console.log('Pay now option selected');
  };
  </script>
  
  <style scoped>
  /* Add any specific styles here */
  </style>
  