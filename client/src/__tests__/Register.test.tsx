import React from "react";
import Register from "../pages/Register";
import { fireEvent, render, screen } from "../utils/test-utils";

describe("TEST REGISTER USER", () => {
  it("Register Inputs should be rendered", async () => {
    render(<Register />);
    const fields = screen.getAllByTestId("input");
    expect(fields.length).toBe(4);
  });
  it("User should be registered", async () => {
    render(<Register />);

    const fields = screen.getAllByTestId("input");
    fireEvent.change(fields[0], { target: { value: "Wenceslas" } });
    fireEvent.change(fields[1], { target: { value: "Angelo" } });
    fireEvent.change(fields[2], { target: { value: 123456789 } });
    fireEvent.change(fields[3], { target: { value: "123456789" } });

    const registerBtn = screen.getAllByText("inscription");
    fireEvent.click(registerBtn[1]);
  });
});
