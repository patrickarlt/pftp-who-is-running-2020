import React from "react";
import { render } from "@testing-library/react";
import Geocoder from "./StateDropdown";

test("renders", () => {
  const { getByText } = render(<Geocoder />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
