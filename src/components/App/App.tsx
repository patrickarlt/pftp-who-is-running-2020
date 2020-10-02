import React from "react";
import { Router, RouteComponentProps, useMatch } from "@reach/router";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import MapView from "../MapView/MapView";
import StateRoute from "../StateRoute/StateRoute";
import DistrictRoute from "../DistrictRoute/DistrictRoute";
import CandidateRoute from "../CandidateRoute/CandidateRoute";
import FilterContext from "../FilterContext/FilterContext";
import SiteHeader from "../SiteHeader/SiteHeader";

import { If, classNames } from "react-extras";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import styles from "./App.module.css";
import All from "../All/All";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../hooks/useAnalytics";

export interface IAppProps extends RouteComponentProps { }

export const App: React.FunctionComponent<IAppProps> = function App({
  children,
}) {
  useAnalytics();
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
        <div
          className={classNames(styles.header)}
        >
          <SiteHeader />
        </div>
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
        <div
          className={classNames(styles.footer)}
        >
          <ul className={styles.footerLinks}>
            <li>
              #PeopleForThePeople ©&nbsp;2020
            </li>
            <li>
              <a href="mailto:blackgirlsmapp@esri.com">
                Contact Us
              </a>
            </li>
            <li>
              <a href="https://bgmapp.org/" target="_blank" rel="noreferrer noopener">
                B.G.M.A.P.P.
              </a>
            </li>
            <li>
              <a href="https://instagram.com/blackgirlsmapp" target="_blank" rel="noreferrer noopener">
                <img className="footer-link-image" src="https://dl.airtable.com/.attachments/b4915f865eb96dee5753e7dadef0a3dc/6206869c/instagram.svg" alt="Instagram Icon" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/BlackGirlsMapp" target="_blank" rel="noreferrer noopener">
                <img className="footer-link-image" src="https://dl.airtable.com/.attachments/bc8be89f8e8f12ac834ec3c3347c56d2/74eab36c/twitter.svg" alt="Twitter Icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>

    </FilterContext>
  );
};

export default App;
