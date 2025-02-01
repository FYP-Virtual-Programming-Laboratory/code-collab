import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_BASE_URL as string,
  cache: new InMemoryCache(),
});
