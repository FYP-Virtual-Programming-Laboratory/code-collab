import { createBrowserRouter, redirect } from "react-router-dom";
import EditorView from "./views/editor";
import HomeView from "./views/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const username = formData.get("username");
      const colour = formData.get("colour");

      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          colour,
        })
      );

      return redirect("/editor");
    },
  },
  {
    path: "/editor",
    element: <EditorView />,
    loader: () => {
      const user = localStorage.getItem("user");

      if (!user) throw redirect("/");

      return JSON.parse(user);
    },
  },
]);

export default router;
