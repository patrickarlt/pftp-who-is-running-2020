import React from "react";
import { render } from "@testing-library/react";
import MapView from "./MapView";

test("renders learn react link", () => {
  const { getByText } = render(<MapView />);
  const linkElement = getByText(/Find your candidates/i);
  expect(linkElement).toBeInTheDocument();
});
