import { useQuery } from "react-query";
import {
  getMapData,
  IMapSummaryCandidate,
  IMapSummary,
} from "../utils/requests";

export function useMapSummaryQuery(filters?: any) {

  function candidateFilter(type: "house" | "senate") {
    return function (candidate: IMapSummaryCandidate) {
      return (
        filters[type] === true &&
        filters[candidate.party.toLowerCase()] &&
        (!filters.woman || (filters.woman && candidate.woman)) &&
        (!filters.bipoc || (filters.bipoc && candidate.bipoc))
      );
    };
  }

  const mapSummaryQuery = useQuery<IMapSummary>("map", () => {
    return getMapData();
  });

  return useQuery<IMapSummary>(
    ["map", filters, mapSummaryQuery.data],
    (key, filters, mapSummaryData: IMapSummary) => {
      mapSummaryData.senate = mapSummaryData.senate.map((marker) => {
        marker.candidates = marker.candidates.filter(candidateFilter("senate"));
        return marker;
      });
      mapSummaryData.house = mapSummaryData.house.map((marker) => {
        marker.candidates = marker.candidates.filter(candidateFilter("house"));
        return marker;
      });
      return mapSummaryData;
    },
    { enabled: mapSummaryQuery.data }
  );
}
