<script setup>

definePageMeta({
  middleware: "auth-log",
  layout:"user",
});


import { onMounted, ref } from 'vue';
import { GET_USER_BY_HIS_ID, Update_Event_ById, DELETE_EVENT_BY_ID } from "../../util/queries";
import { useQuery, useMutation } from '@vue/apollo-composable';

const show = ref(false);
const popup = ref(false);
const selectedEventId = ref(null);
const { result, loading, error, refetch } = useQuery(GET_USER_BY_HIS_ID);
const { mutate: updateEvent } = useMutation(Update_Event_ById);
const { mutate: deleteEvent } = useMutation(DELETE_EVENT_BY_ID);

const formData = ref({
  title: '',
  description: '',
  images: [],
  venue: '',
  address: '',
  price: 'free',
  specificPrice: '',
  date: '',
  categories: '',
  tags: ''
});

const handleEdit = (item) => {
  formData.value = {
    title: item.title,
    description: item.description,
    venue: item.venue,
    address: item.address,
    price: item.price === "paid" ? "paid" : "free",
    specificPrice: item.price === "paid" ? item.specific_Price : null,
    date: item.date,
    categories: item.categories,
    tags: item.tags,
    id: item.id
  };
  show.value = true;
};

const handleCancel = () => {
  show.value = false;
};

const cancelAction = () => {
  popup.value = false;
};

const handleDelete = (id) => {
  selectedEventId.value = id; 
  popup.value = true;
};

const confirmDelete = async () => {
  if (selectedEventId.value !== null) {
    try {
      await deleteEvent({ id: String(selectedEventId.value) });
      console.log("Event deleted successfully");
      await refetch();
      popup.value = false; 
    } catch (error) {
      console.log("Cannot delete the event:", error);
    }
  }
};

const onSubmit = async (id) => {
  try {
    const response = await updateEvent({
      id: String(id) || null,
      title: formData.value.title || null,
      description: formData.value.description || null,
      venue: formData.value.venue || null,
      address: formData.value.address || null,
      price: formData.value.price || 'free',
      specificPrice: formData.value.price === 'paid' ? formData.value.specific_Price : 0,
      date: formData.value.date || null,
      categories: formData.value.categories || null,
      tags: formData.value.tags
    });
    show.value = false;
    console.log('Event updated successfully:', response.data.update_events.returning);
  } catch (error) {
    console.log('Error updating event:', error);
  }
};

onMounted(() => {
  refetch();
});
</script>

<template>
  <div class="p-6 mt-20">
    <div v-if="show === false">
      <div v-if="popup" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
          <h1 class="text-xl font-semibold text-gray-800 mb-4">Hello</h1>
          <p class="text-gray-600 mb-6">Are you sure you want to delete?</p>
          <div class="flex justify-center gap-4">
            <button 
              class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors" 
              @click="confirmDelete">
              Delete
            </button>
            <button 
              class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors" 
              @click="cancelAction">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr class="w-full bg-gray-100 border-b">
              <th class="px-6 py-3 text-left text-gray-600 font-semibold uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-gray-600 font-semibold uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-gray-600 font-semibold uppercase tracking-wider">Address</th>
              <th class="px-6 py-3 text-left text-gray-600 font-semibold uppercase tracking-wider">Price</th>
              <th class="px-6 py-3 text-left text-gray-600 font-semibold uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-gray-600 font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading" class="text-center">
              <td colspan="6" class="px-6 py-4">Loading...</td>
            </tr>
            <tr v-else-if="error" class="text-center">
              <td colspan="6" class="px-6 py-4">Error: {{ error.message }}</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in result?.users[0]?.events"
              :key="index"
              class="hover:bg-gray-50 transition duration-300 ease-in-out"
            >
              <td class="px-6 py-4 border-b text-gray-800">{{ item.title }}</td>
              <td class="px-6 py-4 border-b text-gray-800">{{ item.date }}</td>
              <td class="px-6 py-4 border-b text-gray-800">{{ item.address }}</td>
              <td class="px-6 py-4 border-b text-gray-800">{{ item.price }}</td>
              <td class="px-6 py-4 border-b text-gray-800">{{ item.categories }}</td>
              <td class="px-6 py-4 border-b text-gray-800">
                <div class="flex flex-row gap-4">
                  <button
                    @click="handleEdit(item)"
                    class="text-lime-400 hover:text-lime-500 hover:underline transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="handleDelete(item.id)"
                    class="text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="show === true" class="flex flex-col mt-10 w-full">
      <h1 class="text-3xl text-center mb-8 font-semibold text-gray-700">Edit The Event</h1>
      <form
        @submit.prevent="onSubmit(formData.id)"
        class="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-8 bg-white shadow-lg rounded-lg"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mb-6">
            <label for="title" class="block text-gray-600 text-sm font-medium mb-2">Title</label>
            <input
              v-model="formData.title"
              name="title"
              type="text"
              placeholder="Event Title"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div class="mb-6">
            <label for="venue" class="block text-gray-600 text-sm font-medium mb-2">Venue</label>
            <input
              v-model="formData.venue"
              name="venue"
              type="text"
              placeholder="Venue Name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div class="mb-6">
            <label for="preparationDate" class="block text-gray-600 text-sm font-medium mb-2">Preparation Date</label>
            <input
              v-model="formData.preparationDate"
              name="preparationDate"
              type="date"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div class="mb-6">
            <label for="category" class="block text-gray-600 text-sm font-medium mb-2">Category</label>
            <select
              v-model="formData.category"
              name="category"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="Food">Food</option>
              <option value="Tech">Tech</option>
              <option value="Education">Education</option>
              <option value="Music">Music</option>
            </select>
          </div>

          <div class="mb-6">
            <label for="tags" class="block text-gray-600 text-sm font-medium mb-2">Tags</label>
            <input
              v-model="formData.tags"
              name="tags"
              type="text"
              placeholder="Event Tags"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>

        <div class="text-center mt-6">
          <button
            type="submit"
            class="text-white bg-blue-500 hover:bg-blue-700 transition-colors py-2 px-6 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
