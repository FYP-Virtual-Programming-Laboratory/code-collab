import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CodeCollab, configure } from "./index";

configure({
  sessionId: "123456",
  user: "farayolaj",
}).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <CodeCollab />
    </StrictMode>
  );
});
