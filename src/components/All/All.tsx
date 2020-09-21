import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { statesByAbbr } from "../../utils/states";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./All.module.css";

interface IAllProps extends RouteComponentProps {}

const All: React.FunctionComponent<IAllProps> = function All({ children }) {
  return (
    <div>
      <CloseButton />

      <h1 className={styles.title}>Candidates by State</h1>
      <ul className={styles.list}>
        {statesByAbbr.map(({ abbr, name }) => (
          <li key={abbr}>
            <Link
              to={`/state/${abbr.toLowerCase()}/`}
              className={styles.subTitle}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default All;
