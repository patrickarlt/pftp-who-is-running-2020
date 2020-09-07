import React, { useEffect, useState, useRef } from "react";
import styles from "./MapView.module.css";
import { setDefaultOptions, loadModules } from "esri-loader";
import { useMatch } from "@reach/router";

export interface IMapViewProps {}

export const ElectionMap: React.FunctionComponent<IMapViewProps> = function MapView({
  children,
}) {
  const map = useRef<any>();
  const mapView = useRef<any>(null);
  const [mapViewReady, setMapViewReady] = useState(false);
  const [[Map, MapView, WebMap], setModulesLoaded] = useState<any[]>([]);
  const stateMatch = useMatch("/state/:stateId/");
  const candidateMatch = useMatch("/state/:stateId/candidates/:candidateId/");
  const districtMatch = useMatch(
    "/state/:stateId/districts/:districtId/candidates/:candidateId/"
  );

  const { stateId, districtId, candidateId } = Object.assign(
    {},
    stateMatch,
    districtMatch,
    candidateMatch
  );

  useEffect(() => {
    console.log({ stateId, districtId, candidateId, map, mapView });
  }, [stateId, districtId, candidateId, mapViewReady]);

  const viewRef = useRef(null);

  useEffect(() => {
    if (MapView && WebMap && viewRef) {
      map.current = new WebMap({
        portalItem: {
          id: "d01934971aa645909df21c134352656b",
        },
      });

      mapView.current = new MapView({
        map: map.current,
        container: viewRef.current,
      });

      mapView?.current?.when(() => {
        setMapViewReady(true);
      });
    }
  }, [Map, MapView, WebMap, viewRef]);

  useEffect(() => {
    setDefaultOptions({
      css: "https://js.arcgis.com/4.16/esri/themes/dark/main.css",
    });

    loadModules(["esri/Map", "esri/views/MapView", "esri/WebMap"]).then(
      ([Map, MapView, WebMap]) => {
        setModulesLoaded([Map, MapView, WebMap]);
      }
    );
  }, []);

  return <div className={styles.map} ref={viewRef}></div>;
};

export default ElectionMap;
