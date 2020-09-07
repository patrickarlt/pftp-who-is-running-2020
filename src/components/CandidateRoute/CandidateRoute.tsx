import React from "react";
import { RouteComponentProps } from "@reach/router";
import CandidateDetails from "../CanidateDetails/CanidateDetails";

import styles from "./CandidateRoute.module.css";

interface ICandidateRouteProps extends RouteComponentProps {
  candidateId?: string;
}

const CandidateRoute: React.FunctionComponent<ICandidateRouteProps> = function CandidateRoute({
  candidateId,
}) {
  return (
    <div className={styles.background}>
      CandidateRoute: {candidateId}
      <CandidateDetails />
    </div>
  );
};

export default CandidateRoute;
