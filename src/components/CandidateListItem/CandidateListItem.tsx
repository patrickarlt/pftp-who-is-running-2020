import React from "react";
import styles from "./CandidateListItem.module.css";
import { ICandidate, IStateData } from "../../utils/requests";
import { Link } from "@reach/router";
import { classNames, If } from "react-extras";
export interface ICandidateListItemProps {
  candidate: ICandidate;
  state: IStateData;
}

const CandidateListItem: React.FunctionComponent<ICandidateListItemProps> = function CandidateListItem({
  children,
  candidate,
  state,
}) {
  const tags = [];
  if (candidate.woman) {
    tags.push("Woman");
  }
  if (candidate.bipoc) {
    tags.push("BIPOC");
  }
  return (
    <li className={styles.wrapper}>
      <Link
        to={
          candidate.district
            ? `/state/${state.abbr}/districts/${candidate.district}/candidates/${candidate.slug}/`
            : `/state/${state.abbr}/candidates/${candidate.slug}/`
        }
        className={styles.link}
      >
        <div
          className={classNames(
            styles.imageWrapper,
            styles[candidate.party.toLowerCase()]
          )}
        >
          <div
            style={{
              backgroundImage: `url("${
                candidate.image ||
                "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mp&s=250"
              }")`,
            }}
            className={classNames(styles.image)}
          />
        </div>
        <div className={styles.content}>
          <h4 className={styles.title}>{candidate.name}</h4>
          <p className={styles.infoLine}>
            <span
              className={classNames(
                styles.dot,
                styles[candidate.party.toLowerCase()]
              )}
            ></span>
            {candidate.party},{" "}
            {candidate.incumbent ? "Incumbent" : "Challenger"}
          </p>
          <If condition={tags.length > 0}>
            <p className={styles.infoLine}>{tags.join(", ")}</p>
          </If>
          <span className={styles.moreInfo}>more info</span>
        </div>
      </Link>
    </li>
  );
};

export default CandidateListItem;
