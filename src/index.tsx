import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { apolloClient } from "./apollo-client";
import { store } from "./app/store";
import YObjectsProvider from "./components/y-objects-provider";
import ProjectFetcher from "./project-fetcher";

export default function CrdtEditor() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <YObjectsProvider>
          <ProjectFetcher sessionId="123456" />
        </YObjectsProvider>
      </Provider>
    </ApolloProvider>
  );
}
