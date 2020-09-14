import React from "react";
import { Router, RouteComponentProps } from "@reach/router";

import CandidateRoute from "../CandidateRoute/CandidateRoute";
import DistrictRoute from "../DistrictRoute/DistrictRoute";
import StateDetails from "../StateDetails/StateDetails";
import PanelLoadingIndicator from "../PanelLoadingIndicator/PanelLoadingIndicator";
import styles from "./StateRoute.module.css";
import { useStateQuery } from "../../hooks/useStateQuery";
import PanelError from "../PanelError/PanelError";

interface IStateRouteProps extends RouteComponentProps {
  stateId?: string;
}

const StateRoute: React.FunctionComponent<IStateRouteProps> = function StateRoute({
  stateId,
}) {
  const { isLoading, isError, data, error } = useStateQuery(stateId);

  if (isError) {
    return <PanelError error={error} />;
  }

  if (isLoading || !data) {
    return <PanelLoadingIndicator />;
  }

  return (
    <div>
      <StateDetails state={data} />
    </div>
  );
};

export default StateRoute;
