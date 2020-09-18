import React from "react";
import { ICandidate, IStateData } from "../../utils/requests";
import { If } from "react-extras";
import CandidateList from "../CandidateList/CandidateList";

import styles from "./DistrictDetails.module.css";

export interface IDistrictDetailsProps {
  house: ICandidate[];
  senate: ICandidate[];
  state: IStateData;
  district: number;
}

const ordinal = function (d: number) {
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

export const DistrictDetails: React.FunctionComponent<IDistrictDetailsProps> = function DistrictDetails({
  house,
  senate,
  state,
  district,
}) {
  const { battleground, battlegroundDistricts } = state;
  return (
    <div>
      <h1 className={styles.title}>
        {state.name}
        <If condition={district >= 1}>
          {" "}
          - {district}
          <sup>{ordinal(district)}</sup> District
        </If>
      </h1>
      {senate && senate.length > 0 ? (
        <>
          <h2 className={styles.subTitle}>
            Senate
            {battleground ? (
              <mark className={styles.battleground}>Battleground</mark>
            ) : null}
          </h2>
          <CandidateList state={state} candidates={senate} />
        </>
      ) : null}
      {house && house.length > 0 ? (
        <>
          <h2 className={styles.subTitle}>
            House{" "}
            {battlegroundDistricts.includes((district as unknown) as string) ? (
              <mark className={styles.battleground}>Battleground</mark>
            ) : null}
          </h2>
          <CandidateList state={state} candidates={house} />
        </>
      ) : null}
    </div>
  );
};

export default DistrictDetails;
