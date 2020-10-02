import { useQuery } from "react-query";
import { useStateQuery } from "./useStateQuery";
import { ICandidate, IStateData } from "../utils/requests";

export interface ICandidateQuery {
  candidate: ICandidate;
  state: IStateData;
}

export function useCandidateQuery(
  stateId?: string,
  districtId?: string,
  candidateId?: string
) {
  const stateQuery = useStateQuery(stateId);

  return useQuery<ICandidateQuery>(
    ["candidate", districtId, candidateId, stateQuery.data],
    (key, districtId, candidateId, stateData) => {
      let candidate;
      if (districtId) {
        candidate = stateData.house.find(
          (candidate: ICandidate) =>
            candidate.slug === candidateId &&
            candidate.district + "" === districtId
        );

        if (!candidate || !stateData) {
          throw new Error("Candidate not found.");
        }

        return { candidate, state: stateQuery.data as IStateData };
      }

      candidate = stateData.senate.find(
        (candidate: ICandidate) => candidate.slug === candidateId
      );

      if (!candidate) {
        candidate = stateData.house.find(
          (candidate: ICandidate) => candidate.slug === candidateId
        );
      }

      return {
        candidate,
        state: stateQuery.data as IStateData,
      };
    },
    {
      enabled: stateQuery.data,
    }
  );
}
