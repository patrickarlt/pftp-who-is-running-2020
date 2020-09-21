import React from "react";
import { RouteComponentProps } from "@reach/router";

import StateDetails from "../StateDetails/StateDetails";
import PanelLoadingIndicator from "../PanelLoadingIndicator/PanelLoadingIndicator";
// import styles from "./StateRoute.module.css";
import { useStateQuery } from "../../hooks/useStateQuery";
import PanelError from "../PanelError/PanelError";
import { useFilterContext } from "../FilterContext/FilterContext";

interface IStateRouteProps extends RouteComponentProps {
  stateId?: string;
}

const StateRoute: React.FunctionComponent<IStateRouteProps> = function StateRoute({
  stateId,
}) {
  const { setFilterValue, ...filters } = useFilterContext();
  const { isLoading, isError, data, error } = useStateQuery(stateId, filters);

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
