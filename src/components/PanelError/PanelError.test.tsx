import React from "react";
import { render } from "@testing-library/react";
import PanelError from "./PanelError";

test("renders", () => {
  const { getByText } = render(<PanelError />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
