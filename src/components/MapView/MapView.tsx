import React, { useEffect, useState, useRef } from "react";
import styles from "./MapView.module.css";
import { setDefaultOptions, loadModules } from "esri-loader";
import { useMatch, navigate } from "@reach/router";

export interface IMapViewProps {}

const stateBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/State_Boundries_(Census)/FeatureServer/0";
const districtBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/Congressional_District_Boundries_(Census)/FeatureServer/0";
const humanGeographyBaseStyle =
  "https://ourcommunity.maps.arcgis.com/sharing/rest/content/items/d7397603e9274052808839b70812be50/resources/styles/root.json";
const humanGeographyDetailStyle =
  "https://ourcommunity.maps.arcgis.com/sharing/rest/content/items/ee63d0411e274a25bfaf3c9be10a88c6/resources/styles/root.json";
const humanGeographyLabelsStyle =
  "https://ourcommunity.maps.arcgis.com/sharing/rest/content/items/769db83429944e00b8c0e72b7945559c/resources/styles/root.json";

function padWithZeros(num: number | string, size: number) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

const initialExtent = {
  xmin: -13898125.928586934,
  ymin: 2801775.3891951442,
  xmax: -7445653.4929134594,
  ymax: 6275275.0308375666,
  spatialReference: { wkid: 102100, latestWkid: 3857 },
};

function applyDistrictEffect(
  mapView: any,
  layer: any,
  stateId: string,
  districtId: string
) {
  if (!mapView?.current) {
    return;
  }
  mapView.current.whenLayerView(layer.current).then((layerView: any) => {
    if (districtId && stateId) {
      layerView.effect = {
        filter: {
          where: `(CD116FP = '${padWithZeros(
            districtId,
            2
          )}') AND (STATEUSPS = '${stateId.toUpperCase()}')`,
        },
        excludedEffect: "grayscale(50%) opacity(20%)",
        includedEffect: "brightness(150%) saturate(150%)",
      };
    } else if (stateId) {
      layerView.effect = {
        filter: {
          where: `(STATEUSPS = '${stateId.toUpperCase()}')`,
        },
        excludedEffect: "grayscale(50%) opacity(20%)",
      };
    } else {
      layerView.effect = undefined;
    }
  });
}

function applyStateEffect(
  mapView: any,
  layer: any,
  stateId: string,
  districtId: string
) {
  if (!mapView?.current) {
    return;
  }
  mapView.current.whenLayerView(layer.current).then((layerView: any) => {
    if (stateId && !districtId) {
      layerView.effect = {
        filter: {
          where: `STUSPS = '${stateId.toUpperCase()}'`,
        },
        excludedEffect: "grayscale(50%) opacity(20%)",
      };
    } else if (districtId) {
      layerView.effect = {
        filter: {
          where: `1 = 0`,
        },
        excludedEffect: "grayscale(50%) opacity(20%)",
      };
    } else {
      layerView.effect = undefined;
    }
  });
}

function queryExtent(
  stateId: string,
  districtId: string,
  stateLayer: any,
  districtLayer: any
) {
  if (stateId && !districtId && stateLayer.current) {
    return stateLayer.current
      .queryExtent({
        where: `STUSPS = '${stateId.toUpperCase()}'`,
      })
      .catch(console.error.bind(console));
  }
  if (stateId && districtId && districtLayer.current) {
    return districtLayer.current
      .queryExtent({
        where: `(CD116FP = '${padWithZeros(
          districtId,
          2
        )}') AND (STATEUSPS = '${stateId.toUpperCase()}')`,
      })
      .catch(console.error.bind(console));
  }
  return Promise.resolve(initialExtent);
}

export const ElectionMap: React.FunctionComponent<IMapViewProps> = function MapView({
  children,
}) {
  const map = useRef<any>();
  const mapView = useRef<any>(null);
  const stateLayer = useRef<any>();
  const districtLayer = useRef<any>(null);
  const stateLayerOutlines = useRef<any>();
  const districtLayerOutlines = useRef<any>(null);
  const [mapViewReady, setMapViewReady] = useState(false);
  const [
    [Map, MapView, Basemap, VectorTileLayer, FeatureLayer],
    setModulesLoaded,
  ] = useState<any[]>([]);
  const stateMatch = useMatch("/state/:stateId/");
  const districtMatch = useMatch("/state/:stateId/districts/:districtId/*");
  const { stateId, districtId } = Object.assign({}, stateMatch, districtMatch);
  const viewRef = useRef(null);

  useEffect(() => {
    if (stateId || (stateId && districtId)) {
      queryExtent(stateId, districtId, stateLayer, districtLayer).then(
        (result: any) => {
          if (result.extent) {
            mapView.current.ui.padding.right = 320;

            mapView.current.goTo(result.extent);
          }
        }
      );
    }
  }, [stateId, districtId, stateLayer, districtLayer, mapViewReady, mapView]);

  useEffect(() => {
    if (mapView.current) {
      mapView.current.on("click", (e: any) => {
        mapView.current.hitTest(e).then((hitResult: any) => {
          const results = hitResult.results
            .map((r: any) => ({
              attributes: r.graphic.attributes,
              layer: r.graphic.layer,
            }))
            .filter((r: any) => r.layer.type === "feature");

          if (!results?.length) {
            navigate("/");
          }
          const stateResult = results.find(
            (r: any) => r.layer.id === stateLayer.current.id
          );

          if (stateResult) {
            const state = stateResult.attributes.STUSPS.toLowerCase();
            navigate(`/state/${state}/`);
          }

          const districtResult = results.find(
            (r: any) => r.layer.id === districtLayer.current.id
          );

          if (districtResult) {
            const state = districtResult.attributes.STATEUSPS.toLowerCase();
            const district = parseInt(districtResult.attributes.CD116FP);
            if (district > 0) {
              navigate(`/state/${state}/districts/${district}/`);
            } else {
              navigate(`/state/${state}/`);
            }
          }
        });
      });
    }
  }, [mapView, mapViewReady]);

  useEffect(() => {
    applyStateEffect(mapView, stateLayer, stateId, districtId);
  }, [stateLayer, stateId, districtId, mapView, mapViewReady]);

  useEffect(() => {
    applyStateEffect(mapView, stateLayerOutlines, stateId, districtId);
  }, [stateLayerOutlines, stateId, districtId, mapView, mapViewReady]);

  useEffect(() => {
    applyDistrictEffect(mapView, districtLayer, stateId, districtId);
  }, [districtLayer, stateId, districtId, mapView, mapViewReady]);

  useEffect(() => {
    applyDistrictEffect(mapView, districtLayerOutlines, stateId, districtId);
  }, [districtLayerOutlines, stateId, districtId, mapView, mapViewReady]);

  useEffect(() => {
    if (map.current) {
      return;
    }
    if (MapView && Map && viewRef) {
      stateLayer.current = new FeatureLayer({
        url: stateBoundriesService,
        outFields: ["FID", "NAME", "BATTLEGROUND", "STUSPS"],
        blendMode: "multiply",
        renderer: {
          type: "unique-value",
          field: "BATTLEGROUND",
          uniqueValueInfos: [
            {
              label: "False",
              symbol: {
                type: "simple-fill",
                color: null,
                outline: null,
                style: "solid",
              },
              value: "0",
            },
            {
              label: "True",
              symbol: {
                type: "cim",

                data: {
                  type: "CIMSymbolReference",

                  symbol: {
                    // CIM polygon symbol
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        // light blue hatch fill
                        type: "CIMHatchFill",

                        enable: true,
                        lineSymbol: {
                          type: "CIMLineSymbol", // CIM line symbol that makes up the line inside the hatch fill

                          symbolLayers: [
                            {
                              type: "CIMSolidStroke",
                              enable: true,
                              width: 3,
                              color: [145, 113, 32, 85],
                            },
                          ],
                        },
                        rotation: 0, // rotation of the lines
                        separation: 6, // distance between lines in hatch fill
                      },
                    ],
                  },
                },
              },
              value: "1",
            },
          ],
        },
      });

      stateLayerOutlines.current = new FeatureLayer({
        url: stateBoundriesService,
        outFields: ["FID", "NAME", "BATTLEGROUND", "STUSPS"],
        renderer: {
          type: "simple",
          visualVariables: [
            {
              type: "size",
              valueExpression: "$view.scale",
              stops: [
                { size: 2.5, value: 3245803 },
                { size: 1.75, value: 10143134 },
                { size: 1, value: 40572534 },
                { size: 0, value: 81145069 },
              ],
              target: "outline",
            },
          ],
          symbol: {
            type: "simple-fill",
            color: null,
            outline: {
              type: "simple-line",
              color: [145, 113, 32, 255],
              width: 1.33,
              style: "solid",
            },
            style: "solid",
          },
        },
      });

      districtLayer.current = new FeatureLayer({
        url: districtBoundriesService,
        outFields: ["FID", "CD116FP", "STATEUSPS", "BATTLEGROUND"],
        blendMode: "multiply",
        renderer: {
          type: "unique-value",
          field: "BATTLEGROUND",
          uniqueValueInfos: [
            {
              label: "False",
              symbol: {
                type: "simple-fill",
                color: null,
                outline: null,
              },
              value: "0",
            },
            {
              label: "True",
              symbol: {
                type: "cim",
                data: {
                  type: "CIMSymbolReference",
                  symbol: {
                    // CIM polygon symbol
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        // light blue hatch fill
                        type: "CIMHatchFill",
                        enable: true,
                        lineSymbol: {
                          type: "CIMLineSymbol", // CIM line symbol that makes up the line inside the hatch fill
                          symbolLayers: [
                            {
                              type: "CIMSolidStroke",
                              enable: true,
                              width: 3,
                              color: [145, 113, 32, 85],
                            },
                          ],
                        },
                        rotation: 0, // rotation of the lines
                        separation: 6, // distance between lines in hatch fill
                      },
                    ],
                  },
                },
              },
              value: "1",
            },
          ],
        },
      });

      districtLayerOutlines.current = new FeatureLayer({
        url: districtBoundriesService,
        outFields: ["FID", "CD116FP", "STATEUSPS", "BATTLEGROUND"],
        renderer: {
          type: "simple",
          visualVariables: [
            {
              type: "size",
              valueExpression: "$view.scale",
              stops: [
                { size: 1, value: 3245803 },
                { size: 0.66, value: 10143134 },
                { size: 0.33, value: 40572534 },
                { size: 0, value: 81145069 },
              ],
              target: "outline",
            },
          ],
          symbol: {
            type: "simple-fill",
            color: null,
            outline: {
              type: "simple-line",
              color: [116, 92, 45, 255],
              width: 1,
              style: "dot",
            },
          },
        },
      });

      map.current = new Map({
        basemap: new Basemap({
          baseLayers: [
            new VectorTileLayer({
              url: humanGeographyBaseStyle,
            }),
            new VectorTileLayer({
              url: humanGeographyDetailStyle,
              opacity: 0.25,
            }),
          ],
          referenceLayers: [
            new VectorTileLayer({
              url: humanGeographyLabelsStyle,
            }),
          ],
        }),
        layers: [
          stateLayer.current,
          districtLayer.current,
          districtLayerOutlines.current,
          stateLayerOutlines.current,
        ],
      });

      if (stateId || (stateId && districtId)) {
        queryExtent(stateId, districtId, stateLayer, districtLayer).then(
          (result: any) => {
            mapView.current = new MapView({
              map: map.current,
              resizeAlign: "left",
              container: viewRef.current,
              ui: {
                padding: {
                  right: 320,
                },
              },
              extent: result.extent,
            });

            mapView?.current?.when(() => {
              setMapViewReady(true);
            });
          }
        );
      } else {
        mapView.current = new MapView({
          map: map.current,
          resizeAlign: "left",
          container: viewRef.current,
          extent: initialExtent,
        });
        mapView?.current?.when(() => {
          setMapViewReady(true);
        });
      }
    }
  }, [
    Map,
    MapView,
    Basemap,
    VectorTileLayer,
    FeatureLayer,
    viewRef,
    districtId,
    stateId,
  ]);

  useEffect(() => {
    if (stateId && mapView?.current) {
      mapView.current.ui.padding.right = 320;
    } else if (mapView?.current) {
      mapView.current.ui.padding.right = 0;
    }
  }, [mapView, stateId]);

  useEffect(() => {
    setDefaultOptions({
      css: "https://js.arcgis.com/4.16/esri/themes/dark/main.css",
    });

    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Basemap",
      "esri/layers/VectorTileLayer",
      "esri/layers/FeatureLayer",
    ]).then((modules) => {
      setModulesLoaded(modules);
    });
  }, []);

  return <div className={styles.map} ref={viewRef}></div>;
};

export default ElectionMap;
