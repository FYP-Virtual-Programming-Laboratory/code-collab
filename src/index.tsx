import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { apolloClient } from "./apollo-client";
import { store } from "./app/store";
import ProjectFetcher from "./project-fetcher";

export default function CrdtEditor({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: number;
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <ProjectFetcher sessionId={sessionId} userId={userId} />
      </Provider>
    </ApolloProvider>
  );
}
