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

export function useStateQuery(stateId?: string) {
  return useQuery<IStateData>(
    ["state", stateId],
    (key, state) => {
      return getStateData(state).then((stateData) => {
        return Object.assign({}, stateData, {
          houseByDistrict: groupBy(stateData.house, "district"),
        });
      });
    },
    { enabled: stateId }
  );
}
