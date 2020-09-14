import React from "react";
import { ICandidate, IStateData } from "../../utils/requests";
import { Link } from "@reach/router";
import { If } from "react-extras";

import styles from "./DistrictDetails.module.css";

export interface IDistrictDetailsProps {
  house: ICandidate[];
  senate: ICandidate[];
  state: IStateData;
  district: number;
}

const ordinal = function (d: number) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const DistrictDetails: React.FunctionComponent<IDistrictDetailsProps> = function DistrictDetails({
  house,
  senate,
  state,
  district,
}) {
  return (
    <div>
      <h1 className={styles.title}>
        {state.name}
        <If condition={district >= 1}>
          {" "}
          - {district}
          <sup>{ordinal(district)}</sup> District
        </If>
      </h1>
      {senate && senate.length > 0 ? (
        <>
          <h2>Senate</h2>
          <ul>
            {senate.map((candidate, index) => (
              <li key={candidate.slug}>
                <Link to={`/state/${state.abbr}/candidates/${candidate.slug}/`}>
                  {candidate.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {house && house.length > 0 ? (
        <>
          <h2>House</h2>
          <ul>
            {house.map((candidate, index) => (
              <li key={candidate.slug}>
                <Link
                  to={`/state/${state.abbr}/districts/${candidate.district}/candidates/${candidate.slug}/`}
                >
                  {candidate.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <button
        onClick={() => {
          window.history.back();
        }}
      >
        Back
      </button>{" "}
    </div>
  );
};

export default DistrictDetails;
