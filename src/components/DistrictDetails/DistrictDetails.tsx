import React from "react";

import styles from "./DistrictDetails.module.css";

export interface IDistrictDetailsProps {}

export const DistrictDetails: React.FunctionComponent<IDistrictDetailsProps> = function DistrictDetails({
  children,
}) {
  return (
    <div>
      <h1 className={styles.title}>District Details</h1>
    </div>
  );
};

export default DistrictDetails;
