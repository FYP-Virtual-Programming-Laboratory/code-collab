import { ApolloClient, InMemoryCache } from "@apollo/client";

export function getApolloClient({ url }: { url: string }) {
  return new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });
}
