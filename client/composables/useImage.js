import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage($file: String!, $userId: String!) {
    uploadImage(file: $file, user_id: $userId) {
      url
      message
    }
  }
`;

export function useImage() {
  const uploadImageResult = ref(null);
  const error = ref(null);

  const { mutate: uploadImage, onDone } = useMutation(UPLOAD_IMAGE_MUTATION, {
    variables: {
      file: '',
      userId: '',
    },
  });

  onDone(({ data }) => {
    uploadImageResult.value = data.uploadImage;
  });

  const upload = async (file, userId) => {
    try {
      const response = await uploadImage({
        variables: {
          file,
          userId,
        },
      });
      return response;
    } catch (err) {
      error.value = err.message;
      console.error("Image upload error:", err);
      throw err;
    }
  };

  return {
    upload,
    uploadImageResult,
    error,
  };
}
