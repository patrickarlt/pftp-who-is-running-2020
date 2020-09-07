import React from "react";
import {} from "@reach/router";
import styles from "./StateDetails.module.css";

export interface IStateDetailsProps {
  state?: string;
}

export const StateDetails: React.FunctionComponent<IStateDetailsProps> = function StateDetails({
  state,
}) {
  return (
    <div>
      <h1 className={styles.title}>State Details</h1>
    </div>
  );
};

export default StateDetails;
