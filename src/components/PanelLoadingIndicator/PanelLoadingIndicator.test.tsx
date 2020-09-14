import React from "react";
import { render } from "@testing-library/react";
import PanelLoadingIndicator from "./PanelLoadingIndicator";

test("renders", () => {
  const { getByText } = render(<PanelLoadingIndicator />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
