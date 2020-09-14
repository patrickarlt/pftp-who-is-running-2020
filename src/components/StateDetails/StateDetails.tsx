import React from "react";
import styles from "./StateDetails.module.css";
import { Link } from "@reach/router";
import { IStateData } from "../../hooks/useStateQuery";

import { If } from "react-extras";

const ordinal = function (i: number | string) {
  const d = typeof i === "string" ? parseInt(i) : i;
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
export interface IStateDetailsProps {
  state: IStateData;
}

export const StateDetails: React.FunctionComponent<IStateDetailsProps> = function StateDetails({
  state,
}) {
  if (!state) {
    return null;
  }

  const { name, house, houseByDistrict, senate } = state;
  return (
    <div>
      <h1 className={styles.title}>{name}</h1>
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

      {house && house.length > 0
        ? Object.keys(houseByDistrict).map((district) => (
            <If condition={parseInt(district) >= 1}>
              <h2>
                {district}
                <sup>{ordinal(district)}</sup> District
              </h2>
              <ul>
                {houseByDistrict[district].map((candidate, index) => (
                  <li key={candidate.slug}>
                    <Link
                      to={`/state/${state.abbr}/districts/${candidate.district}/candidates/${candidate.slug}/`}
                    >
                      {candidate.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </If>
          ))
        : null}

      <button
        onClick={() => {
          window.history.back();
        }}
      >
        Back
      </button>
    </div>
  );
};

export default StateDetails;
