import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import CrdtEditor from ".";
import "./index.css";
import { initLoader } from "./lib/monaco-loader";

initLoader().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <CrdtEditor sessionId="123456" userId={1} />
    </StrictMode>
  );
});
