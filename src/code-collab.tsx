import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { getApolloClient } from "./apollo-client";
import { store } from "./app/store";
import ProjectFetcher from "./project-fetcher";

import { useMemo } from "react";
import "./index.css";
import { getConfig } from "./lib/integration/configure";

export default function CodeCollab({ sessionId }: { sessionId: string }) {
  const user = useMemo(() => getConfig("user"), []);

  return (
    <ApolloProvider client={getApolloClient()}>
      <Provider store={store}>
        <ProjectFetcher sessionId={sessionId} user={user} />
      </Provider>
    </ApolloProvider>
  );
}
