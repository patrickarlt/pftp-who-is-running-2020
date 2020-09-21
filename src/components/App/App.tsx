import React from "react";
import { Router, RouteComponentProps, useMatch } from "@reach/router";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import MapView from "../MapView/MapView";
import StateRoute from "../StateRoute/StateRoute";
import DistrictRoute from "../DistrictRoute/DistrictRoute";
import CandidateRoute from "../CandidateRoute/CandidateRoute";
import FilterContext from "../FilterContext/FilterContext";
import { If, classNames } from "react-extras";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import styles from "./App.module.css";

export interface IAppProps extends RouteComponentProps {}

export const App: React.FunctionComponent<IAppProps> = function App({
  children,
}) {
  const match = useMatch("/state/:stateId/*");
  return (
    <FilterContext>
      <div
        className={classNames(styles.layout, {
          [styles.layoutResults]: !!match?.stateId,
        })}
      >
        <OverlayScrollbarsComponent
          className={styles.shadow}
          options={{ className: "os-theme-light" }}
        >
          <div className={styles.sidebar}>
            <FilterSidebar />
          </div>
        </OverlayScrollbarsComponent>
        <div className={styles.map}>
          <MapView />
        </div>
        <If condition={!!match?.stateId}>
          <OverlayScrollbarsComponent
            className={styles.shadow}
            options={{ className: "os-theme-light" }}
          >
            <Router className={styles.results}>
              <StateRoute path="/state/:stateId/*" />
              <CandidateRoute path="/state/:stateId/candidates/:candidateId/" />
              <CandidateRoute path="/state/:stateId/districts/:districtId/candidates/:candidateId/" />
              <DistrictRoute path="/state/:stateId/districts/:districtId/" />
            </Router>
          </OverlayScrollbarsComponent>
        </If>
      </div>
    </FilterContext>
  );
};

export default App;
