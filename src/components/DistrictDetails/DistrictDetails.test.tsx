import React from "react";
import { render } from "@testing-library/react";
import DistrictInfo from "./DistrictDetails";

test("renders learn react link", () => {
  const { getByText } = render(<DistrictInfo />);
  const linkElement = getByText(/Find your candidates/i);
  expect(linkElement).toBeInTheDocument();
});
