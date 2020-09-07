import React from "react";
import { Router, RouteComponentProps, useMatch } from "@reach/router";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import MapView from "../MapView/MapView";
import StateRoute from "../StateRoute/StateRoute";
import { If } from "react-extras";

import styles from "./App.module.css";

export interface IAppContext {}

export const AppContext: React.Context<IAppContext> = React.createContext({});

export interface IAppProps extends RouteComponentProps {}

export const App: React.FunctionComponent<IAppProps> = function App({
  children,
}) {
  const match = useMatch("state/:stateId/*");

  return (
    <AppContext.Provider value={{}}>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <FilterSidebar />
        </div>
        <div className={styles.map}>
          <MapView />
          <If condition={!!match?.stateId}>
            <Router className={styles.results}>
              <StateRoute path="state/:stateId/*" />
            </Router>
          </If>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
