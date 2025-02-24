import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { getApolloClient } from "./apollo-client";
import { store } from "./app/store";
import ProjectFetcher from "./project-fetcher";

import "./index.css";

type CodeCollabProps = {
  sessionId: string;
  userId: number;
};

export default function CodeCollab({ sessionId, userId }: CodeCollabProps) {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Provider store={store}>
        <ProjectFetcher sessionId={sessionId} userId={userId} />
      </Provider>
    </ApolloProvider>
  );
}
