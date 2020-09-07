import React from "react";
import { render } from "@testing-library/react";
import FilterSidebar from "./FilterSidebar";

test("renders learn react link", () => {
  const { getByText } = render(<FilterSidebar />);
  const linkElement = getByText(/Find your candidates/i);
  expect(linkElement).toBeInTheDocument();
});
