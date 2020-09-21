import React from "react";
import { RouteComponentProps } from "@reach/router";

import DistrictDetails from "../DistrictDetails/DistrictDetails";
import { useDistrictQuery } from "../../hooks/useDistrictQuery";
import PanelLoadingIndicator from "../PanelLoadingIndicator/PanelLoadingIndicator";
import PanelError from "../PanelError/PanelError";
import { useFilterContext } from "../FilterContext/FilterContext";
interface IDistrictRouteProps extends RouteComponentProps {
  stateId?: string;
  districtId?: string;
}

const DistrictRoute: React.FunctionComponent<IDistrictRouteProps> = function DistrictRoute({
  stateId,
  districtId,
}) {
  const { setFilterValue, ...filters } = useFilterContext();
  const { isLoading, isError, data, error } = useDistrictQuery(
    stateId,
    districtId,
    filters
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
