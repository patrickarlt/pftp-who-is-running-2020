import { useQuery } from "react-query";
import {
  IStateData as IStateDataResponse,
  getStateData,
  ICandidate,
} from "../utils/requests";
import groupBy from "lodash.groupby";

export interface IStateData extends IStateDataResponse {
  houseByDistrict: {
    [index: string]: ICandidate[];
  };
}

export function useStateQuery(stateId?: string, filters?: any) {
  function candidateFilter(type: "house" | "senate") {
    return function (candidate: ICandidate) {
      return (
        filters[type] === true &&
        filters[candidate.party.toLowerCase()] &&
        (!filters.woman || (filters.woman && candidate.woman)) &&
        (!filters.bipoc || (filters.bipoc && candidate.bipoc))
      );
    };
  }
  const stateQuery = useQuery<IStateData>(
    ["state", stateId],
    (key, state) => {
      return getStateData(state);
    },
    { enabled: stateId }
  );

  return useQuery<IStateData>(
    ["state", stateId, filters, stateQuery.data],
    (key, stateId, filters, stateData: IStateData) => {
      if (filters) {
        stateData.senate = stateData.senate.filter(candidateFilter("senate"));
        stateData.house = stateData.house.filter(candidateFilter("house"));
      }

      return Object.assign(stateData, {
        houseByDistrict: groupBy(stateData.house, "district"),
      });
    },
    { enabled: stateQuery.data }
  );
}
