import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { Router } from "@reach/router";
import * as serviceWorker from "./serviceWorker";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "normalize.css/normalize.css";
import ReactGA from 'react-ga';

ReactGA.initialize('UA-143312627-3', {
  titleCase: false,
  gaOptions: {
    siteSpeedSampleRate: 100
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router id="router">
      <App path="/*" />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
