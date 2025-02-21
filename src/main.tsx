import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CodeCollab } from "./index";
import { initLoader } from "./lib/monaco-loader";

initLoader().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <CodeCollab
        sessionId="123456"
        userId={1}
        serverUrl={import.meta.env.VITE_BASE_URL as string}
      />
    </StrictMode>
  );
});
