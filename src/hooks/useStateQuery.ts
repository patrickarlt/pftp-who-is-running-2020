import { useQuery } from "react-query";
import { IStateData, getStateData } from "../utils/requests";

export function useStateQuery(stateId?: string) {
  return useQuery<IStateData>(
    ["state", stateId],
    (key, state) => {
      return getStateData(state);
    },
    { enabled: stateId }
  );
}
