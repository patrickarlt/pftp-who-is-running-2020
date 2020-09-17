import React from "react";
import styles from "./StateDetails.module.css";
import { IStateData } from "../../hooks/useStateQuery";
import CandidateList from "../CandidateList/CandidateList";
import { If } from "react-extras";

const ordinal = function (i: number | string) {
  const d = typeof i === "string" ? parseInt(i) : i;
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
export interface IStateDetailsProps {
  state: IStateData;
}

export const StateDetails: React.FunctionComponent<IStateDetailsProps> = function StateDetails({
  state,
}) {
  if (!state) {
    return null;
  }

  const { name, house, houseByDistrict, senate } = state;
  console.log({ name, house, houseByDistrict, senate });
  return (
    <div>
      <h1 className={styles.title}>{name}</h1>
      {senate && senate.length > 0 ? (
        <>
          <h2 className={styles.subTitle}>Senate</h2>
          <CandidateList state={state} candidates={senate} />
        </>
      ) : null}

      {house && house.length > 0
        ? Object.keys(houseByDistrict).map((district) => (
            <If condition={parseInt(district) >= 1}>
              <h2 className={styles.subTitle}>
                {district}
                <sup>{ordinal(district)}</sup> District
              </h2>
              <CandidateList
                state={state}
                candidates={houseByDistrict[district]}
              />
            </If>
          ))
        : null}
    </div>
  );
};

export default StateDetails;
