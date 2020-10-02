import React from "react";
import styles from "./CandidateList.module.css";
import { ICandidate, IStateData } from "../../utils/requests";
import CandidateListItem from "../CandidateListItem/CandidateListItem";

export interface ICandidateListProps {
  candidates: ICandidate[];
  state: IStateData;
}

const CandidateList: React.FunctionComponent<ICandidateListProps> = function CandidateList({
  candidates,
  state,
}) {
  return (
    <>
      <ul className={styles.list}>
        {candidates.map((candidate, index) => (
          <CandidateListItem
            key={candidate.slug}
            candidate={candidate}
            state={state}
          />
        ))}
      </ul>
    </>
  );
};

export default CandidateList;
