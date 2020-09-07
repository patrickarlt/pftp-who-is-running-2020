import React from "react";

import styles from "./CanidateDetails.module.css";

export interface ICanidateDetailsProps {}

export const CanidateDetails: React.FunctionComponent<ICanidateDetailsProps> = function CanidateDetails({
  children,
}) {
  return (
    <div>
      <h1 className={styles.title}>Canidate Details</h1>
    </div>
  );
};

export default CanidateDetails;
