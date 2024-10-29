
import gql from 'graphql-tag';

export const signup = async (client, data) => {
  return client.mutate({
    mutation: gql`
      mutation Signup($data: SignupInput!) {
        signup(data: $data) {
          token
          user {
            id
            first_name
            last_name
            email
          }
        }
      }
    `,
    variables: { data },
  });
};

export const login = async (client, data) => {
  return client.mutate({
    mutation: gql`
      mutation Login($data: LoginInput!) {
        login(data: $data) {
          token
          user {
            id
            first_name
            last_name
            email
          }
        }
      }
    `,
    variables: { data },
  });
};
