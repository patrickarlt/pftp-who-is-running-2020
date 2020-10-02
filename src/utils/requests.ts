import { queryFeatures } from "@esri/arcgis-rest-feature-layer";
import { startTiming, stopTiming } from "./logger";

import axios from "axios";
const stateBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/State_Boundries_(Census)/FeatureServer/0";
const districtBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/Congressional_District_Boundries_(Census)/FeatureServer/0";

export interface IStateData {
  abbr: string;
  name: string;
  senate: ICandidate[];
  house: ICandidate[];
  houseByDistrict: {};
  battleground: boolean;
  battlegroundDistricts: string[];
}

export interface ICandidate {
  state: string;
  stateAbbr: string;
  district?: string;
  party: string;
  name: string;
  incumbent: boolean;
  campaignUrl?: string;
  facebookUrl?: string;
  twitterHandle?: string;
  instagramHandle?: string;
  image: string;
  campaignPriorities?: string[];
  battleground: boolean;
  woman: boolean;
  bipoc: boolean;
  type: "house" | "senate";
  stateFips?: string;
  slug: string;
}

export function getStateData(stateAbbr: string): Promise<IStateData> {
  const timingLabel = stateAbbr.toUpperCase()
  startTiming(timingLabel);
  return axios
    .get(`/data/${stateAbbr}-data.json`)
    .then(({ data }) => {
      stopTiming(timingLabel, {
        category: "State Data"
      });
      return Object.assign({ senate: [], house: [] }, data)
    });
}

export function getStateDistrictForLatLng(lat: number, lng: number) {
  return Promise.all([
    queryFeatures({
      url: stateBoundriesService,
      where: "1=1",
      outFields: ["STUSPS"],
      inSR: "4326",
      returnGeometry: false,
      geometryType: "esriGeometryPoint",
      geometry: {
        x: lng,
        y: lat,
      } as any,
    }).then((result: any) => {
      return result?.features[0]?.attributes.STUSPS.toLowerCase();
    }),
    queryFeatures({
      url: districtBoundriesService,
      where: "1=1",
      outFields: ["CD116FP"],
      inSR: "4326",
      returnGeometry: false,
      geometryType: "esriGeometryPoint",
      geometry: {
        x: lng,
        y: lat,
      } as any,
    }).then((result: any) => {
      return result?.features[0]?.attributes.CD116FP;
    }),
  ]).then(([state, district]) => {
    if (district === "98" || district === "00") {
      return { state };
    }
    return { state, district };
  });
}

export function getMapData(): Promise<IMapSummary> {
  const timingLabel = "Map Data"
  startTiming("Map Data");
  return axios.get(`/data/summary.json`).then(({ data }) => {
    stopTiming(timingLabel, {
      category: "Map Data"
    });
    return data
  });
}

export interface IMapSummary {
  senate: IMarkers[];
  house: IMarkers[];
}

export interface IMarkers {
  labelPoint: ILabelPoint;
  candidates: IMapSummaryCandidate[];
}

export interface IMapSummaryCandidate {
  stateAbbr: string;
  district: number | null;
  party: string;
  name: string;
  image: string;
  slug: string;
  woman: boolean;
  bipoc: boolean;
}

export interface ILabelPoint {
  state: string;
  district?: string;
  x: number;
  y: number;
}
