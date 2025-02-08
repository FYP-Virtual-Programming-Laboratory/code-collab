import { ApolloProvider } from "@apollo/client";
import { random } from "@ctrl/tinycolor";
import { Provider } from "react-redux";
import { apolloClient } from "./apollo-client";
import { store } from "./app/store";
import ProjectFetcher from "./project-fetcher";

const profile = localStorage.getItem("profile");

if (!profile) {
  const colour = random().toHexString();
  const username = generateRandomName();
  localStorage.setItem(
    "profile",
    JSON.stringify({
      username,
      colour,
    })
  );
}

function generateRandomName() {
  return "user-" + Math.random().toString(36).substring(2, 9);
}

export default function CrdtEditor() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <ProjectFetcher sessionId="123456" />
      </Provider>
    </ApolloProvider>
  );
}
