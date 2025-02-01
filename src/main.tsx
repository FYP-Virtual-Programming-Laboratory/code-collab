import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store } from "./app/store";
import router from "./router";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo-client";
import "./index.css";
import { initLoader } from "./lib/monaco-loader";

initLoader().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ApolloProvider>
    </StrictMode>
  );
});
