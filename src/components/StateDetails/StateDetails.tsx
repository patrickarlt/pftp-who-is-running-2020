import React from "react";
import styles from "./StateDetails.module.css";
import { Link } from "@reach/router";
import { IStateData } from "../../utils/requests";
export interface IStateDetailsProps {
  state: IStateData;
}

export const StateDetails: React.FunctionComponent<IStateDetailsProps> = function StateDetails({
  state,
}) {
  if (!state) {
    return null;
  }

  const { name, house, senate } = state;
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
      </button>
    </div>
  );
};

export default StateDetails;
