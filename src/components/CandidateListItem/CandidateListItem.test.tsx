import React from "react";
import { render } from "@testing-library/react";
import CandidateListItem from "./CandidateListItem";

test("renders", () => {
  const { getByText } = render(<CandidateListItem />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
