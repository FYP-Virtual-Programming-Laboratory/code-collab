import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CodeCollab, configure } from "./index";

const user =
  new URLSearchParams(window.location.search).get("user") || "farayolaj";

configure({
  user,
}).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <CodeCollab
        sessionId="123456"
        getDisplayName={(user) =>
          ({
            farayolaj: "Joshua Farayola",
            johndoe: "John Doe",
          }[user] || user)
        }
      />
    </StrictMode>
  );
});
