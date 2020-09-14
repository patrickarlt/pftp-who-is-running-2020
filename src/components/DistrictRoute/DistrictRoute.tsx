import React from "react";
import { RouteComponentProps } from "@reach/router";

import DistrictDetails from "../DistrictDetails/DistrictDetails";
import { useDistrictQuery } from "../../hooks/useDistrictQuery";
// import styles from "./DistrictRoute.module.css";
import PanelLoadingIndicator from "../PanelLoadingIndicator/PanelLoadingIndicator";
import PanelError from "../PanelError/PanelError";

interface IDistrictRouteProps extends RouteComponentProps {
  stateId?: string;
  districtId?: string;
}

const DistrictRoute: React.FunctionComponent<IDistrictRouteProps> = function DistrictRoute({
  stateId,
  districtId,
}) {
  const { isLoading, isError, data, error } = useDistrictQuery(
    stateId,
    districtId
  );

  if (isError) {
    return <PanelError error={error} />;
  }

  if (isLoading || !data) {
    return <PanelLoadingIndicator />;
  }

  return (
    <div>
      <DistrictDetails {...data} />
    </div>
  );
};

export default DistrictRoute;
