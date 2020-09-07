import React from "react";
import { render } from "@testing-library/react";
import CanidateInfo from "./CanidateDetails";

test("renders learn react link", () => {
  const { getByText } = render(<CanidateInfo />);
  const linkElement = getByText(/Find your candidates/i);
  expect(linkElement).toBeInTheDocument();
});
