import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CodeCollab, configure } from "./index";

const user =
  new URLSearchParams(window.location.search).get("user") || "farayolaj";
console.log(user);

configure({
  sessionId: "123456",
  user,
}).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <CodeCollab />
    </StrictMode>
  );
});
