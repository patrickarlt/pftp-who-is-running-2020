import React from "react";
import { render } from "@testing-library/react";
import StateDetails from "./StateDetails";

test("renders learn react link", () => {
  const { getByText } = render(<StateDetails />);
  const linkElement = getByText(/Find your candidates/i);
  expect(linkElement).toBeInTheDocument();
});
