<script setup>
definePageMeta({
    middleware: "auth-log",
    layout : "empty"
});

import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';  // Importing Yup for schema validation
import { useMutation, useQuery } from '@vue/apollo-composable';
import { insert_event_mutation, upload_image_action, insert_image_imageTable, GET_USER_BY_HIS_ID, insert_event } from "../../util/queries";
import AlertMessage from "../../components/AlertMessage.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const userid = ref(localStorage.getItem("userId"));

const alertMessage = ref('');
const alertVisible = ref(false);
const alertType = ref('success');
const loadings = ref(false);
const { result, loading, error, refetch } = useQuery(GET_USER_BY_HIS_ID);
const { mutate: insertImage } = useMutation(insert_image_imageTable);
const { mutate: uploadBase64Image } = useMutation(upload_image_action);

const onFileChange = (event) => {
  selectedImages.value = Array.from(event.target.files);
};

const formData = ref({
  title: '',
  description: '',
  venue: '',
  address: '',
  date: '',
  categories: 'Food',
  tags: '',
  price: 'free',
  specificPrice: 0,
});

const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  venue: Yup.string().required('Venue is required'),
  address: Yup.string().required('Address is required'),
  price: Yup.string().oneOf(['free', 'paid'], 'Invalid price option'),
  specificPrice: Yup.number().optional(),
  date: Yup.string().required('Preparation date is required'),
  categories: Yup.string().oneOf(['Food', 'Tech', 'Education', 'Entertainment', 'Sport'], 'Invalid category'),
  tags: Yup.string()
    .transform(val => val.split(',').map(tag => tag.replace(/"/g, '').trim())) // remove any quotes and trim spaces
    .required('Tags are required')
});

const selectedImages = ref([]);
const imageUrls = ref([]);

// Set uploaded image URLs from child component
const setImageUrls = (urls) => {
  imageUrls.value = urls;
};

// Mutation for inserting the event
const { mutate: insertEvent } = useMutation(insert_event);

const showAlert = (message, type = 'success') => {
  alertMessage.value = message;
  alertType.value = type;
  alertVisible.value = true;
  setTimeout(() => {
    alertVisible.value = false;
  }, 4000);
};

const onSubmit = async (values) => {
  loading.value = true;
  try {
    if (selectedImages.value.length === 0) {
      showAlert('Please select images to upload.', 'error');
      return;
    }

    // Ensure tags are in array format before submitting
    const tagsArray = values.tags.split(',').map(tag => tag.trim());

    const uploadPromises = selectedImages.value.map(async (file) => {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64String = await base64Promise;
      const { data } = await uploadBase64Image({ base64_str: base64String });

      if (data && data.uploadBase64Image && data.uploadBase64Image.url) {
        return data.uploadBase64Image.url;
      } else {
        showAlert('Image upload failed', 'error');
      }
    });

    imageUrls.value = await Promise.all(uploadPromises);
    console.log('Uploaded Image URLs:', imageUrls.value);

    const response = await insertEvent({
      title: values.title,
      description: values.description,
      venue: values.venue,
      address: values.address,
      price: values.price,
      specific_Price: values.price === 'paid' ? values.specificPrice : 0,
      date: values.date,
      categories: values.categories,
      cover_photo: imageUrls.value[0],
      tags: tagsArray,  // Ensure tags are passed as an array
    });

    const eventId = ref(response.data.insert_events.returning[0].id);
    console.log(eventId);

    const imagePromises = imageUrls.value.map(url =>
      insertImage({
        url: url,
        event_id: String(eventId.value)
      })
    );

    await Promise.all(imagePromises);

    showAlert('Event created successfully!', 'success');

    await refetch();
    router.replace("/user");
    console.log('Event ID:', eventId);
  } catch (err) {
    console.error('Error creating event:', err);
    showAlert('Failed to create event.', 'error');
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <div class="flex flex-col mt-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-semibold text-center mb-8">Create an Event</h1>
    <p v-if="loading" class="text-center text-gray-500">Loading...</p>
    <div v-else>
      <AlertMessage :message="alertMessage" :type="alertType" :visible="alertVisible" />

      <Form @submit="onSubmit" :validation-schema="schema" class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
        <!-- Title Field -->
        <div class="mb-4">
          <label for="title" class="block text-sm font-semibold text-gray-700">Event Title</label>
          <Field
            v-model="formData.title"
            name="title"
            type="text"
            placeholder="Enter event title"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ErrorMessage name="title" class="text-sm text-red-500 mt-1" />
        </div>

        <!-- Description Field -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-semibold text-gray-700">Event Description</label>
          <Field
            v-model="formData.description"
            name="description"
            as="textarea"
            placeholder="Enter event description"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ErrorMessage name="description" class="text-sm text-red-500 mt-1" />
        </div>

        <!-- Venue and Address Fields -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="venue" class="block text-sm font-semibold text-gray-700">Venue</label>
            <Field
              v-model="formData.venue"
              name="venue"
              type="text"
              placeholder="Venue Name"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage name="venue" class="text-sm text-red-500 mt-1" />
          </div>

          <div class="mb-4">
            <label for="address" class="block text-sm font-semibold text-gray-700">Address</label>
            <Field
              v-model="formData.address"
              name="address"
              type="text"
              placeholder="Venue Address"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage name="address" class="text-sm text-red-500 mt-1" />
          </div>
        </div>

        <!-- Price Field -->
        <div class="mb-4">
          <label for="price" class="block text-sm font-semibold text-gray-700">Price</label>
          <Field
            as="select"
            v-model="formData.price"
            name="price"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </Field>
          <ErrorMessage name="price" class="text-sm text-red-500 mt-1" />
          <Field
            v-if="formData.price === 'paid'"
            v-model="formData.specificPrice"
            name="specificPrice"
            type="number"
            placeholder="Specify Amount"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ErrorMessage name="specificPrice" class="text-sm text-red-500 mt-1" />
        </div>

        <!-- Event Date Field -->
        <div class="mb-4">
          <label for="date" class="block text-sm font-semibold text-gray-700">Event Date</label>
          <Field
            v-model="formData.date"
            name="date"
            type="date"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ErrorMessage name="date" class="text-sm text-red-500 mt-1" />
        </div>

        <!-- Categories and Tags -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="categories" class="block text-sm font-semibold text-gray-700">Category</label>
            <Field
              as="select"
              v-model="formData.categories"
              name="categories"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Food">Food</option>
              <option value="Tech">Tech</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sport">Sport</option>
            </Field>
            <ErrorMessage name="categories" class="text-sm text-red-500 mt-1" />
          </div>

          <div class="mb-6">
        <label for="tags" class="block text-gray-700 text-sm font-bold mb-2">Tags</label>
        <Field
          v-model="formData.tags"
          name="tags"
          type="text"
          placeholder="Comma-separated tags"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ErrorMessage name="tags" class="text-red-500 text-sm"/>
      </div>

        </div>

        <!-- Image Upload -->
        <div class="mb-4">
          <label for="image" class="block text-sm font-semibold text-gray-700">Upload Event Images</label>
          <input
            type="file"
            multiple
            @change="onFileChange"
            class="w-full py-2 px-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Submit Button -->
        <div class="mb-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Event
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
