import React from "react";
import { render } from "@testing-library/react";
import DistrictRoute from "./DistrictRoute";

test("renders", () => {
  const { getByText } = render(<DistrictRoute />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
