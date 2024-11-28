import { Form } from "react-router-dom";

export default function HomeView() {
  return (
    <Form method="post" action="/">
      <div>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
      </div>
      <div>
        <label htmlFor="colour">Colour</label>
        <input type="color" name="colour" id="colour" />
      </div>
      <button type="submit">Login</button>
    </Form>
  );
}
