import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
    const CLOUDINARY_NAME = "dhby9hll1"; 
    const UPLOAD_PRESET = "image"; // Use the preset you've created in Cloudinary
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', file); // Add the file to the form data
    formData.append('upload_preset', UPLOAD_PRESET); // Add the upload preset

    try {
        const response = await axios.post(url, formData); // Send the request to Cloudinary
        return response.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};
