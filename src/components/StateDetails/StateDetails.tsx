import React from "react";
import styles from "./StateDetails.module.css";
import { IStateData } from "../../hooks/useStateQuery";
import CandidateList from "../CandidateList/CandidateList";
import { If } from "react-extras";
import CloseButton from "../CloseButton/CloseButton";

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

  const {
    name,
    house,
    houseByDistrict,
    senate,
    battleground,
    battlegroundDistricts,
  } = state;
  console.log(houseByDistrict);
  // debugger;
  return (
    <div>
      <CloseButton />

      <h1 className={styles.title}>{name}</h1>
      {senate && senate.length > 0 ? (
        <>
          <h2 className={styles.subTitle}>
            Senator
            {battleground ? (
              <mark className={styles.battleground}>Battleground</mark>
            ) : null}
          </h2>
          <CandidateList state={state} candidates={senate} />
        </>
      ) : null}

      {house && house.length > 0
        ? Object.keys(houseByDistrict).map((district) => (
            <React.Fragment key={district}>
              <h2 className={styles.subTitle}>
                Representative - <If condition={district === "0"}>At Large</If>
                <If condition={district !== "0"}>
                  {district}
                  <sup>{ordinal(district)}</sup> District
                </If>
                {battlegroundDistricts.includes(district) ? (
                  <mark className={styles.battleground}>Battleground</mark>
                ) : null}
              </h2>
              <CandidateList
                state={state}
                candidates={houseByDistrict[district]}
              />
            </React.Fragment>
          ))
        : null}
    </div>
  );
};

export default StateDetails;
