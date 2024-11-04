// plugins/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.HASURA_GRAPHQL_ENDPOINT || '', // Your Hasura GraphQL endpoint
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || '',
    Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''}`,
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
