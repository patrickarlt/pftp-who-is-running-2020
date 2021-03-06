import React from "react";
import { render } from "@testing-library/react";
import Template from "./CloseButton";

test("renders", () => {
  const { getByText } = render(<Template />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
