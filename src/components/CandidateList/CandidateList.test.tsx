import React from "react";
import { render } from "@testing-library/react";
import CandidateList from "./CandidateList";

test("renders", () => {
  const { getByText } = render(<CandidateList />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
