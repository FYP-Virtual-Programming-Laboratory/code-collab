import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { KVStore } from "./lib/integration/configure";

const clientMaps: Map<string, ApolloClient<NormalizedCacheObject>> = new Map();

export function getApolloClient() {
  const uri = KVStore.gqlUrl;

  let client = clientMaps.get(uri);

  if (!client) {
    client = new ApolloClient({
      uri,
      cache: new InMemoryCache(),
    });

    clientMaps.set(uri, client);
  }

  return client;
}
