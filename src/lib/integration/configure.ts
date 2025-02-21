export const KVStore = {
  gqlUrl: "http://localhost:3000/graphql",
  wsUrl: "ws://localhost:1234",
  signalUrl: "ws://localhost:4444",
};

export function configure({
  gqlUrl = KVStore.gqlUrl,
  wsUrl = KVStore.wsUrl,
  signalUrl = KVStore.signalUrl,
}: {
  gqlUrl?: string;
  wsUrl?: string;
  signalUrl?: string;
}) {
  KVStore.gqlUrl = gqlUrl;
  KVStore.wsUrl = wsUrl;
  KVStore.signalUrl = signalUrl;
}
