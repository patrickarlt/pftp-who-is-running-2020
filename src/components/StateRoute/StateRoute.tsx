import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import CandidateRoute from "../CandidateRoute/CandidateRoute";
import DistrictRoute from "../DistrictRoute/DistrictRoute";
import StateDetails from "../StateDetails/StateDetails";

import styles from "./StateRoute.module.css";

interface IStateRouteProps extends RouteComponentProps {
  stateId?: string;
}

const StateRoute: React.FunctionComponent<IStateRouteProps> = function StateRoute({
  stateId,
}) {
  return (
    <div className={styles.panel}>
      StateRoute: {stateId}
      <StateDetails />
      <Router className={styles.panel}>
        <CandidateRoute path="candidates/:candidateId" />
        <DistrictRoute path="districts/:districtId/*" />
      </Router>
    </div>
  );
};

export default StateRoute;
