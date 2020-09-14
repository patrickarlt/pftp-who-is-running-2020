import React from "react";
import styles from "./CanidateDetails.module.css";
import { ICandidate, IStateData } from "../../utils/requests";

export interface ICanidateDetailsProps {
  candidate: ICandidate;
  state: IStateData;
}

export const CanidateDetails: React.FunctionComponent<ICanidateDetailsProps> = function CanidateDetails({
  children,
  candidate,
}) {
  const { name } = candidate;
  return (
    <div>
      <h1 className={styles.title}>{name}</h1>
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

export default CanidateDetails;
