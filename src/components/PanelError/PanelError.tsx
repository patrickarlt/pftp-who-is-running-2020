import React from "react";
import styles from "./PanelError.module.css";

interface IPanelErrorProps {
  error: any;
}

const PanelError: React.FunctionComponent<IPanelErrorProps> = function PanelError({
  error,
}) {
  return <div className={styles.container}>{error.toString()}</div>;
};

export default PanelError;
