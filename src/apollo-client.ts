import { ApolloClient, InMemoryCache } from "@apollo/client";
import { KVStore } from "./lib/integration/configure";

export function getApolloClient() {
  return new ApolloClient({
    uri: KVStore.gqlUrl,
    cache: new InMemoryCache(),
  });
}
