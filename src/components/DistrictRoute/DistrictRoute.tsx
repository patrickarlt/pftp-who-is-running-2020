import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import CandidateRoute from "../CandidateRoute/CandidateRoute";
import DistrictDetails from "../DistrictDetails/DistrictDetails";

import styles from "./DistrictRoute.module.css";

interface IDistrictRouteProps extends RouteComponentProps {
  districtId?: string;
}

const DistrictRoute: React.FunctionComponent<IDistrictRouteProps> = function DistrictRoute({
  districtId,
}) {
  return (
    <div className={styles.background}>
      DistrictRoute: {districtId}
      <DistrictDetails />
      <Router className={styles.panel}>
        <CandidateRoute path="candidates/:candidateId" />
      </Router>
    </div>
  );
};

export default DistrictRoute;
