import React from "react";
import { Router, RouteComponentProps, useMatch } from "@reach/router";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import MapView from "../MapView/MapView";
import StateRoute from "../StateRoute/StateRoute";
import DistrictRoute from "../DistrictRoute/DistrictRoute";
import CandidateRoute from "../CandidateRoute/CandidateRoute";
import FilterContext from "../FilterContext/FilterContext";
import Logo from "../Logo/Logo";

import { If, classNames } from "react-extras";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import styles from "./App.module.css";
import All from "../All/All";
import { Helmet } from "react-helmet";

export interface IAppProps extends RouteComponentProps {}

export const App: React.FunctionComponent<IAppProps> = function App({
  children,
}) {
  const match = useMatch("/state/:stateId/*");
  const allMatch = useMatch("/all/");

  return (
    <FilterContext>
      {!match && !allMatch ? (
        <Helmet title="Who is Running? | People for the People" />
      ) : null}
      <div
        className={classNames(styles.layout, {
          [styles.layoutResults]: !!match?.stateId || !!allMatch,
        })}
      >
        <Logo className={styles.logo} />
        <OverlayScrollbarsComponent
          className={styles.shadow}
          options={{ className: classNames("os-theme-light", styles.sidebar) }}
        >
          <FilterSidebar />
        </OverlayScrollbarsComponent>
        <div className={styles.map}>
          <MapView />
        </div>
        <If condition={!!match?.stateId || !!allMatch}>
          <OverlayScrollbarsComponent
            className={styles.shadow}
            options={{
              className: classNames("os-theme-light", styles.results),
            }}
          >
            <Router>
              <All path="/all/" />
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
