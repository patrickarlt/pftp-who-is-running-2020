import React from "react";
import { render } from "@testing-library/react";
import All from "./All";

test("renders", () => {
  const { getByText } = render(<All />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
