import { random } from "@ctrl/tinycolor";
import { Form } from "react-router";

export default function HomeView() {
  const colour = random().toHexString();

  return (
    <Form method="post" action="/">
      <div>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
      </div>
      <div>
        <label htmlFor="colour">Colour</label>
        <input type="color" name="colour" id="colour" value={colour} readOnly />
      </div>
      <button type="submit">Login</button>
    </Form>
  );
}
