import React, { useEffect, useState, useRef } from "react";
import styles from "./MapView.module.css";
import { setDefaultOptions, loadModules } from "esri-loader";
import { useMatch, navigate } from "@reach/router";

export interface IMapViewProps {}

const majorCitiesService =
  "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Major_Cities/FeatureServer/0";
const stateBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/State_Boundries_(Census)/FeatureServer/0";
const districtBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/Congressional_District_Boundries_(Census)/FeatureServer/0";
const humanGeographyDetailStyle =
  "https://ourcommunity.maps.arcgis.com/sharing/rest/content/items/1ddbb25aa29c4811aaadd94de469856a/resources/styles/root.json?f=pjson";
const humanGeographyBaseStyle =
  "https://ourcommunity.maps.arcgis.com/sharing/rest/content/items/d7397603e9274052808839b70812be50/resources/styles/root.json?f=pjson";

function padWithZeros(num: number | string, size: number) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export const ElectionMap: React.FunctionComponent<IMapViewProps> = function MapView({
  children,
}) {
  const map = useRef<any>();
  const mapView = useRef<any>(null);
  const stateLayer = useRef<any>();
  const districtLayer = useRef<any>(null);
  const [mapViewReady, setMapViewReady] = useState(false);
  const [
    [Map, MapView, Basemap, VectorTileLayer, FeatureLayer],
    setModulesLoaded,
  ] = useState<any[]>([]);
  const stateMatch = useMatch("/state/:stateId/");
  const districtMatch = useMatch("/state/:stateId/districts/:districtId/*");

  const { stateId, districtId } = Object.assign({}, stateMatch, districtMatch);
  useEffect(() => {
    if (mapView.current) {
      /**
       * Setup hit test
       */
      mapView.current.on("click", (e: any) => {
        mapView.current.hitTest(e).then((hitResult: any) => {
          const results = hitResult.results.map((r: any) => ({
            attributes: r.graphic.attributes,
            layer: r.graphic.layer,
          }));

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
      /*
       * Setup district effects
       */
      mapView.current
        .whenLayerView(districtLayer.current)
        .then((districtLayerView: any) => {
          if (districtId && stateId) {
            districtLayerView.effect = {
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
            districtLayerView.effect = undefined;

            districtLayerView.effect = {
              filter: {
                where: `(STATEUSPS = '${stateId.toUpperCase()}')`,
              },
              excludedEffect: "grayscale(50%) opacity(20%)",
            };
          } else {
            districtLayerView.effect = undefined;
          }
        });
      /*
       * Setup state effects
       */
      mapView.current
        .whenLayerView(stateLayer.current)
        .then((stateLayerView: any) => {
          if (stateId && !districtId) {
            stateLayerView.effect = {
              filter: {
                where: `STUSPS = '${stateId.toUpperCase()}'`,
              },
              excludedEffect: "grayscale(50%) opacity(20%)",
            };
          } else if (districtId) {
            stateLayerView.effect = {
              filter: {
                where: `1 = 0`,
              },
              excludedEffect: "grayscale(50%) opacity(20%)",
            };
          }
        });

      if (stateId && !districtId) {
        const query = {
          where: `STUSPS = '${stateId.toUpperCase()}'`,
        };

        stateLayer.current
          .queryExtent(query)
          .then((result: any) => {
            if (result.extent) {
              mapView.current.ui.padding.right = 320;

              mapView.current.goTo(result.extent);
            }
          })
          .catch(console.error.bind(console));
      }

      if (stateId && districtId) {
        const query = {
          where: `(CD116FP = '${padWithZeros(
            districtId,
            2
          )}') AND (STATEUSPS = '${stateId.toUpperCase()}')`,
        };
        console.log(query);
        districtLayer.current
          .queryExtent(query)
          .then((result: any) => {
            console.log({ serverDistrictExtent: result.extent });
            if (result.extent) {
              mapView.current.ui.padding.right = 320;

              mapView.current.goTo(result.extent);
            }
          })
          .catch(console.error.bind(console));
      }
    }
  }, [stateId, districtId, stateLayer, districtLayer, mapViewReady, mapView]);

  const viewRef = useRef(null);

  useEffect(() => {
    if (MapView && Map && viewRef) {
      stateLayer.current = new FeatureLayer({
        url: stateBoundriesService,
        outFields: ["*"],
        labelingInfo: [
          {
            labelExpression: "[NAME]",
            labelExpressionInfo: { expression: '$feature["NAME"]' },
            labelPlacement: "center-center",
            maxScale: 288895,
            minScale: 0,
            symbol: {
              type: "text",
              color: [166, 155, 136, 255],
              font: { family: "Arial", size: 10.5 },
              haloColor: [43, 43, 43, 255],
              haloSize: 1,
            },
          },
        ],
        renderer: {
          type: "simple",
          visualVariables: [
            {
              type: "size",
              valueExpression: "$view.scale",
              stops: [
                { size: 3, value: 3245803 },
                { size: 2, value: 10143134 },
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
        outFields: ["*"],
        labelingInfo: [
          {
            labelExpressionInfo: {
              expression: `
                var num = Number($feature["CD116FP"])
                
                if(num == 0) {
                  return "";
                }

                if(num == 1) {
                  return "1st District"
                }
                
                if(num == 2) {
                  return "2nd District"
                }
                
                return num + "th District"
              `,
            },
            labelPlacement: "center-center",
            maxScale: 72223,
            minScale: 6000000,
            symbol: {
              type: "text",
              color: [151, 144, 132, 255],
              font: { family: "Arial", size: 9 },
              haloColor: [43, 43, 43, 255],
              haloSize: 1,
            },
          },
        ],
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
              style: "short-dot",
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
            new FeatureLayer({
              url: majorCitiesService,
              definitionExpression: "POP_CLASS >= 7",
              renderer: {
                type: "simple",
                symbol: {
                  type: "simple-marker",
                  color: null,
                  size: 0,
                },
              },
              labelingInfo: [
                {
                  symbol: {
                    type: "text",
                    color: [135, 132, 128, 255],
                    font: {
                      family: "Arial",
                      size: 7.5,
                    },
                    haloColor: [43, 43, 43, 255],
                    haloSize: 1,
                  },
                  labelExpression: "[NAME]",
                  labelExpressionInfo: { expression: '$feature["NAME"]' },
                  labelPlacement: "center-center",
                },
              ],
            }),
          ],
        }),
        layers: [districtLayer.current, stateLayer.current],
      });

      mapView.current = new MapView({
        map: map.current,
        container: viewRef.current,
        extent: {
          xmin: -13898125.928586934,
          ymin: 2801775.3891951442,
          xmax: -7445653.4929134594,
          ymax: 6275275.0308375666,
          spatialReference: { wkid: 102100, latestWkid: 3857 },
        },
      });

      mapView?.current?.when(() => {
        setMapViewReady(true);
      });
    }
  }, [Map, MapView, Basemap, VectorTileLayer, FeatureLayer, viewRef]);

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
