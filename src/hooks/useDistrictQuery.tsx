import { useQuery } from "react-query";
import { useStateQuery } from "./useStateQuery";
import { ICandidate, IStateData } from "../utils/requests";

export interface IDistrictQuery {
  house: ICandidate[];
  senate: ICandidate[];
  state: IStateData;
  district: number;
}

export function useDistrictQuery(
  stateId?: string,
  districtId?: string,
  filters?: any
) {
  const stateQuery = useStateQuery(stateId, filters);
  return useQuery<IDistrictQuery>(
    ["candidate", districtId, stateQuery.data],
    (key, districtId, stateData) => {
      districtId = parseInt(districtId);
      return {
        state: stateQuery.data as IStateData,
        district: parseInt(districtId, 10),
        senate:
          stateData.senate?.filter(
            (candidate: ICandidate) => candidate.stateAbbr === stateId
          ) || [],
        house:
          stateData.house.filter(
            (candidate: ICandidate) =>
              (candidate.district === districtId &&
                candidate.stateAbbr === stateId) ||
              (candidate.stateAbbr === stateId && districtId === "0")
          ) || [],
      };
    },
    {
      enabled: stateQuery.data,
    }
  );
}
