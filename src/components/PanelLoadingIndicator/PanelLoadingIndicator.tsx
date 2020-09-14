import React from "react";
import styles from "./PanelLoadingIndicator.module.css";
import Loader from "react-loader-spinner";
interface IPanelLoadingIndicatorProps {
  text?: string;
}

const PanelLoadingIndicator: React.FunctionComponent<IPanelLoadingIndicatorProps> = function PanelLoadingIndicator({
  text = "Loading…",
}) {
  return (
    <div className={styles.container}>
      <Loader type="Oval" color="#eec041" height={65} width={65} />
      {text}
    </div>
  );
};

export default PanelLoadingIndicator;
