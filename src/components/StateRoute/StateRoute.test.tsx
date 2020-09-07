import React from "react";
import { render } from "@testing-library/react";
import StateRoute from "./StateRoute";

test("renders", () => {
  const { getByText } = render(<StateRoute />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
