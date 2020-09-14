import { queryFeatures } from "@esri/arcgis-rest-feature-layer";
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
  return axios.get(`/data/${stateAbbr}.json`).then(({ data }) => data);
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
    return { state, district };
  });
}
