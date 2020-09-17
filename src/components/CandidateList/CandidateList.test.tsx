import React from "react";
import { render } from "@testing-library/react";
import CandidateListItem from "./CandidateList";

test("renders", () => {
  const { getByText } = render(<CandidateListItem />);
  const textElement = getByText(/Test/i);
  expect(textElement).toBeInTheDocument();
});
