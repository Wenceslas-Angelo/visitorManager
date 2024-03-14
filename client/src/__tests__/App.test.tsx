import React from "react";
import App from "../App";
import { render, screen } from "../utils/test-utils";

it("The title should be rendered", () => {
  render(<App />);
  const title = screen.getByText("App");
  expect(title).toBeDefined();
});
