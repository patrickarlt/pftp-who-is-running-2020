import React from "react";
import { Router, RouteComponentProps, useMatch } from "@reach/router";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import MapView from "../MapView/MapView";
import StateRoute from "../StateRoute/StateRoute";
import DistrictRoute from "../DistrictRoute/DistrictRoute";
import CandidateRoute from "../CandidateRoute/CandidateRoute";

import { If, classNames } from "react-extras";

import styles from "./App.module.css";

export interface IAppContext {}

export const AppContext: React.Context<IAppContext> = React.createContext({});

export interface IAppProps extends RouteComponentProps {}
console.log(styles);
export const App: React.FunctionComponent<IAppProps> = function App({
  children,
}) {
  const match = useMatch("/state/:stateId/*");
  console.log(match);
  return (
    <AppContext.Provider value={{}}>
      <div
        className={classNames(styles.layout, {
          [styles.layoutResults]: !!match?.stateId,
        })}
      >
        <div className={styles.sidebar}>
          <FilterSidebar />
        </div>
        <div className={styles.map}>
          <MapView />
        </div>
        <If condition={!!match?.stateId}>
          <Router className={styles.results}>
            <StateRoute path="/state/:stateId/*" />
            <CandidateRoute path="/state/:stateId/candidates/:candidateId/" />
            <CandidateRoute path="/state/:stateId/districts/:districtId/candidates/:candidateId/" />
            <DistrictRoute path="/state/:stateId/districts/:districtId/" />
          </Router>
        </If>
      </div>
    </AppContext.Provider>
  );
};

export default App;
