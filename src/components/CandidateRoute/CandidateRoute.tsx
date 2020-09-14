import React from "react";
import { RouteComponentProps } from "@reach/router";
import CandidateDetails from "../CanidateDetails/CanidateDetails";
import { useCandidateQuery } from "../../hooks/useCandidateQuery";
import styles from "./CandidateRoute.module.css";

import PanelLoadingIndicator from "../PanelLoadingIndicator/PanelLoadingIndicator";
import PanelError from "../PanelError/PanelError";

interface ICandidateRouteProps extends RouteComponentProps {
  candidateId?: string;
  stateId?: string;
  districtId?: string;
}

const CandidateRoute: React.FunctionComponent<ICandidateRouteProps> = function CandidateRoute({
  candidateId,
  stateId,
  districtId,
}) {
  const { isLoading, isError, data, error } = useCandidateQuery(
    stateId,
    districtId,
    candidateId
  );

  if (isError) {
    return <PanelError error={error} />;
  }

  if (isLoading || !data) {
    return <PanelLoadingIndicator />;
  }

  return (
    <div className={styles.panel}>
      <CandidateDetails {...data} />
    </div>
  );
};

export default CandidateRoute;
