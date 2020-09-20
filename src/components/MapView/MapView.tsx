import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./MapView.module.css";
import { setDefaultOptions, loadModules } from "esri-loader";
import { useMatch, navigate } from "@reach/router";
import { useQuery } from "react-query";
import { getMapData, IMapSummary } from "../../utils/requests";
import { createPopper } from "@popperjs/core";
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

function initMarkerLayer({ BaseLayerView2D, Layer }: any) {
  const pt: number[] = [];
  const MarkerLayerView = BaseLayerView2D.createSubclass({
    attach() {
      this.el = document.createElement("div");
      this.el.style.width = "100%";
      this.el.style.height = "100%";
      this.el.style.pointerEvents = "none";
      this.view.ui.add(this.el, "manual");
      this.layer.watch("markers", () => this.requestRender());
      // this.el.addEventListener("click", (e: MouseEvent) => {
      //   navigate((e.target as HTMLAnchorElement).href);
      //   e.preventDefault();
      // });
      // const tooltip = document.createElement("div");
      // document.body.appendChild(tooltip);

      // const popperInstance = createPopper(this.el, tooltip, {
      //   placement: "top",
      // });

      // this.el.addEventListener(
      //   "mouseenter",
      //   (e: any) => {
      //     tooltip.style.display = "block";
      //     tooltip.textContent = e.target.href;

      //     popperInstance.state.elements.reference = e.target;
      //     popperInstance.update();
      //   },
      //   true
      // );

      // this.el.addEventListener(
      //   "mouseout",
      //   (e: any) => {
      //     console.log(e.target);
      //     tooltip.style.display = "none";
      //   },
      //   true
      // );
      // console.log(this.el);
    },
    detach() {
      this.view.ui.remove(this.el);
      this.el = null;
    },
    render({ state }: any) {
      for (const marker of this.layer.markers) {
        let [x, y] = state.toScreen(pt, marker.point.x, marker.point.y);
        x = Math.round(x) / window.devicePixelRatio;
        y = Math.round(y) / window.devicePixelRatio;

        marker.node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (!marker.node.parentElement) {
          this.el.appendChild(marker.node);
        }
      }
    },
  });

  const MarkerLayer = Layer.createSubclass({
    createLayerView(view: any) {
      return new MarkerLayerView({ view, layer: this });
    },
  });

  return {
    MarkerLayer,
    MarkerLayerView,
  };
}

export const ElectionMap: React.FunctionComponent<IMapViewProps> = function MapView({
  children,
}) {
  const map = useRef<any>();
  const mapView = useRef<any>(null);
  const stateLayer = useRef<any>();
  const districtLayer = useRef<any>(null);
  const markerLayerRef = useRef<any>();
  const [mapViewReady, setMapViewReady] = useState(false);
  const [
    [
      Map,
      MapView,
      Basemap,
      VectorTileLayer,
      FeatureLayer,
      Layer,
      BaseLayerView2D,
      Point,
    ],
    setModulesLoaded,
  ] = useState<any[]>([]);
  const stateMatch = useMatch("/state/:stateId/");
  const districtMatch = useMatch("/state/:stateId/districts/:districtId/*");
  const { stateId, districtId } = Object.assign({}, stateMatch, districtMatch);
  const viewRef = useRef(null);
  const mapData = useQuery<IMapSummary>("map", () => {
    return getMapData();
  });

  useEffect(() => {
    if (
      !mapViewReady ||
      mapData.isLoading ||
      mapData.isError ||
      !mapData.data ||
      markerLayerRef.current
    ) {
      return;
    }
    const { MarkerLayer } = initMarkerLayer({
      Layer,
      BaseLayerView2D,
    });

    const markerLayer = new MarkerLayer();
    console.log(mapData.data);
    const senateMarkers = mapData.data.senate
      .map(({ candidates, labelPoint }) => {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.classList.add(styles.marker);
        container.classList.add(styles.senateMarker);
        const containerInner = document.createElement("div");
        containerInner.className = styles.markerInner;
        container.appendChild(containerInner);
        switch (candidates.length) {
          case 1:
            containerInner.style.maxWidth = `calc(42px * 1)`;
            break;
          case 2:
            containerInner.style.maxWidth = `calc(42px * 2)`;
            break;
          case 3:
            containerInner.style.maxWidth = `calc(42px * 2)`;
            break;
          case 4:
            containerInner.style.maxWidth = `calc(42px * 2)`;
            break;
          case 5:
            containerInner.style.maxWidth = `calc(42px * 3)`;
            break;
          case 6:
            containerInner.style.maxWidth = `calc(42px * 3)`;
            break;
          case 7:
            containerInner.style.maxWidth = `calc(42px * 3)`;
            break;
          case 8:
            containerInner.style.maxWidth = `calc(42px * 3)`;
            break;
          case 9:
            containerInner.style.maxWidth = `calc(42px * 3)`;
            break;
          default:
            containerInner.style.maxWidth = `calc(42px * 4)`;
            break;
        }
        candidates.forEach((candidate) => {
          const image = document.createElement("div");
          image.style.backgroundImage = `url(${candidate.image})`;
          image.classList.add(styles.image);
          const wrapper = document.createElement("a");
          wrapper.dataset.image = candidate.image;
          wrapper.dataset.name = candidate.name;
          wrapper.dataset.party = candidate.party;
          wrapper.dataset.stateAbbr = candidate.stateAbbr;
          wrapper.dataset.district = candidate.district + "";
          const href = `/state/${candidate.stateAbbr}/candidates/${candidate.slug}/`;
          wrapper.id = candidate.slug;
          wrapper.href = href;
          wrapper.title = candidate.name;
          wrapper.classList.add(styles.imageWrapper);
          wrapper.classList.add(styles[candidate.party.toLowerCase()]);
          wrapper.appendChild(image);
          containerInner.appendChild(wrapper);

          const tooltip = document.createElement("div");
          tooltip.textContent = candidate.name;
          tooltip.style.display = "none";
          document.body.appendChild(tooltip);
        });
        return {
          point: new Point({
            latitude: labelPoint.y,
            longitude: labelPoint.x,
            spatialReference: mapView.current.spatialReference,
          }),
          node: container,
        };
      })
      .flat();
    const houseMarkers = mapData.data.house
      .map(({ candidates, labelPoint }) => {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.className = styles.marker;
        const containerInner = document.createElement("div");
        containerInner.className = styles.markerInner;
        container.appendChild(containerInner);
        switch (candidates.length) {
          case 1:
            containerInner.style.maxWidth = `calc(15px * 1)`;
            break;
          case 2:
            containerInner.style.maxWidth = `calc(15px * 2)`;
            break;
          case 3:
            containerInner.style.maxWidth = `calc(15px * 2)`;
            break;
          case 4:
            containerInner.style.maxWidth = `calc(15px * 2)`;
            break;
          case 5:
            containerInner.style.maxWidth = `calc(15px * 3)`;
            break;
          case 6:
            containerInner.style.maxWidth = `calc(15px * 3)`;
            break;
          case 7:
            containerInner.style.maxWidth = `calc(15px * 3)`;
            break;
          case 8:
            containerInner.style.maxWidth = `calc(15px * 3)`;
            break;
          case 9:
            containerInner.style.maxWidth = `calc(15px * 3)`;
            break;
          default:
            containerInner.style.maxWidth = `calc(15px * 4)`;
            break;
        }
        candidates.forEach((candidate) => {
          const wrapper = document.createElement("a");
          const href = `/state/${candidate.stateAbbr}/district/${candidate.district}/candidates/${candidate.slug}/`;
          wrapper.href = href;
          wrapper.title = candidate.name;
          wrapper.classList.add(styles.dot);
          wrapper.classList.add(styles[candidate.party.toLowerCase()]);
          containerInner.appendChild(wrapper);
        });
        return {
          point: new Point({
            latitude: labelPoint.y,
            longitude: labelPoint.x,
            spatialReference: mapView.current.spatialReference,
          }),
          node: container,
        };
      })
      .flat();
    markerLayer.markers = [...houseMarkers, ...senateMarkers];
    map.current.layers.add(markerLayer);
    markerLayerRef.current = markerLayer;
  }, [Layer, BaseLayerView2D, Point, mapView, map, mapViewReady, mapData]);

  /**
   * Query the query and refocus to extent when stateId or districtId change.
   */
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

  /**
   * Setup the onClick handler for map layers.
   */
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

  /**
   * Apply layer effects based on stateId and districtId
   */
  useEffect(() => {
    applyStateEffect(mapView, stateLayer, stateId, districtId);
  }, [stateLayer, stateId, districtId, mapView, mapViewReady]);

  useEffect(() => {
    applyDistrictEffect(mapView, districtLayer, stateId, districtId);
  }, [districtLayer, stateId, districtId, mapView, mapViewReady]);

  /**
   * Create map, map view and layers
   */
  useEffect(() => {
    if (map.current) {
      return;
    }
    if (MapView && Map && viewRef) {
      stateLayer.current = new FeatureLayer({
        url: stateBoundriesService,
        outFields: ["FID", "NAME", "BATTLEGROUND", "STUSPS"],
        // blendMode: "multiply",
        renderer: {
          type: "unique-value",
          field: "BATTLEGROUND",
          uniqueValueInfos: [
            {
              label: "False",
              symbol: {
                type: "simple-fill",
                color: null,
                outline: {
                  type: "simple-line",
                  color: [145, 113, 32, 255],
                  width: 2,
                  style: "solid",
                },
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
                        // light blue outline around the polygon
                        type: "CIMSolidStroke",
                        enable: true,
                        width: 2,
                        color: [145, 113, 32, 255],
                      },
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
                              width: 3 * window.devicePixelRatio,
                              color: [0, 0, 0, 20],
                            },
                          ],
                        },
                        rotation: 0, // rotation of the lines
                        separation: 6 * window.devicePixelRatio, // distance between lines in hatch fill
                      },
                      {
                        // solid blue fill background
                        type: "CIMSolidFill",
                        enable: true,
                        color: [145, 113, 32, 20],
                        effects: [
                          {
                            type: "CIMGeometricEffectOffsetHatch",

                            length: 6 * window.devicePixelRatio,
                            size: 6 * window.devicePixelRatio,
                          },
                        ],
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

      districtLayer.current = new FeatureLayer({
        url: districtBoundriesService,
        outFields: ["FID", "CD116FP", "STATEUSPS", "BATTLEGROUND"],
        renderer: {
          type: "unique-value",
          field: "BATTLEGROUND",
          uniqueValueInfos: [
            {
              label: "False",
              symbol: {
                type: "cim",
                data: {
                  type: "CIMSymbolReference",
                  symbol: {
                    // CIM polygon symbol
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        // white dashed layer at center of the line
                        type: "CIMSolidStroke",
                        effects: [
                          {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [2, 4], // width of dashes and spacing between the dashes
                          },
                        ],
                        enable: true, // must be set to true in order for the symbol layer to be visible
                        capStyle: "Butt",
                        joinStyle: "Round",
                        width: 1,
                        color: [145, 113, 32, 255],
                      },
                    ],
                  },
                },
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
                        // white dashed layer at center of the line
                        type: "CIMSolidStroke",
                        effects: [
                          {
                            type: "CIMGeometricEffectDashes",
                            dashTemplate: [2, 4], // width of dashes and spacing between the dashes
                          },
                        ],
                        enable: true, // must be set to true in order for the symbol layer to be visible
                        capStyle: "Butt",
                        joinStyle: "Round",
                        width: 1,
                        color: [145, 113, 32, 255],
                      },
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
                              width: 3 * window.devicePixelRatio,
                              color: [0, 0, 0, 20],
                            },
                          ],
                        },
                        rotation: 0, // rotation of the lines
                        separation: 6 * window.devicePixelRatio, // distance between lines in hatch fill
                      },
                      {
                        // solid blue fill background
                        type: "CIMSolidFill",
                        enable: true,
                        color: [145, 113, 32, 20],
                        effects: [
                          {
                            type: "CIMGeometricEffectOffsetHatch",

                            length: 6 * window.devicePixelRatio,
                            size: 6 * window.devicePixelRatio,
                          },
                        ],
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

      map.current = new Map({
        basemap: new Basemap({
          baseLayers: [
            new VectorTileLayer({
              url: humanGeographyBaseStyle,
            }),
            // new VectorTileLayer({
            //   url: humanGeographyDetailStyle,
            //   opacity: 0.25,
            // }),
          ],
          referenceLayers: [
            new VectorTileLayer({
              url: humanGeographyLabelsStyle,
            }),
          ],
        }),
        layers: [districtLayer.current, stateLayer.current],
      });

      if (stateId || (stateId && districtId)) {
        queryExtent(stateId, districtId, stateLayer, districtLayer).then(
          (result: any) => {
            mapView.current = new MapView({
              map: map.current,
              resizeAlign: "left",
              container: viewRef.current,
              extent: result.extent,
              constraints: {
                maxZoom: 10,
              },
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
          constraints: {
            maxZoom: 10,
          },
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

  /**
   * Set and reset map view padding.
   */
  useEffect(() => {
    // if (stateId && mapView?.current) {
    //   mapView.current.ui.padding.right = 320;
    // } else if (mapView?.current) {
    //   mapView.current.ui.padding.right = 0;
    // }
  }, [mapView, stateId]);

  /**
   * Load modules
   */
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
      "esri/layers/Layer",
      "esri/views/2d/layers/BaseLayerView2D",
      "esri/geometry/Point",
    ]).then((modules) => {
      setModulesLoaded(modules);
    });
  }, []);

  return <div className={styles.map} ref={viewRef}></div>;
};

export default ElectionMap;
