import React from "react";
import { render } from "@testing-library/react";
import CandidateRoute from "./CandidateRoute";

test("renders", () => {
  const { getByText } = render(<CandidateRoute />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
