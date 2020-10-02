import React from "react";
import styles from "./CloseButton.module.css";
import { Link } from "@reach/router";

interface ICloseButtonProps {
  to?: string;
}

const CloseButton: React.FunctionComponent<ICloseButtonProps> = function CloseButton({
  to = "/",
}) {
  return (
    <Link to={to} className={styles.link}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
      >
        <path d="M17.59 5L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
      </svg>
    </Link>
  );
};

export default CloseButton;
