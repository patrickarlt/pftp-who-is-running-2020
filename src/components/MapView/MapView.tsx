import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./MapView.module.css";
import { setDefaultOptions, loadModules } from "esri-loader";
import { useMatch, navigate } from "@reach/router";
import { createPopper } from "@popperjs/core";
import { statesByAbbr } from "../../utils/states";
import { useMapSummaryQuery } from "../../hooks/useMapSummaryQuery";
import { useFilterContext } from "../FilterContext/FilterContext";

export interface IMapViewProps {}

const stateBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/State_Boundries_(Census)/FeatureServer/0";
const districtBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/Congressional_District_Boundries_(Census)/FeatureServer/0";
const humanGeographyBaseStyle =
  "https://ourcommunity.maps.arcgis.com/sharing/rest/content/items/d7397603e9274052808839b70812be50/resources/styles/root.json";
// const humanGeographyDetailStyle =
//   "https://ourcommunity.maps.arcgis.com/sharing/rest/content/items/ee63d0411e274a25bfaf3c9be10a88c6/resources/styles/root.json";
const humanGeographyLabelsStyle =
  "https://ourcommunity.maps.arcgis.com/sharing/rest/content/items/769db83429944e00b8c0e72b7945559c/resources/styles/root.json";

function padWithZeros(num: number | string, size: number) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

// https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/State_Boundries_(Census)/FeatureServer/0/query?where=(STUSPS+%3D+%27CA%27)+OR+(STUSPS+%3D+%27FL%27)+OR+(STUSPS+%3D+%27ME%27)+or+(STUSPS+%3D+%27WA%27)&returnGeometry=true&returnExtentOnly=true&f=pjson&outSr=4326
const initialExtentJSON = {
  xmin: -124.84898942267459,
  ymin: 24.396312300244087,
  xmax: -66.88544332942061,
  ymax: 49.002437700125355,
  spatialReference: {
    wkid: 4326,
    latestWkid: 4326,
  },
};

function calculateSizeHouse(zoom: number) {
  const minZoom = 2;
  const maxZoom = 10;
  const minSize = 1;
  const maxSize = 18;
  const result = Math.round(
    ((zoom - minZoom) / (maxZoom - minZoom)) * (maxSize - minSize) + minSize
  );
  return result;
}

function calculateSizeSenate(zoom: number) {
  const minZoom = 2;
  const maxZoom = 10;
  const minSize = 8;
  const maxSize = 56;
  const result = Math.round(
    ((zoom - minZoom) / (maxZoom - minZoom)) * (maxSize - minSize) + minSize
  );
  return result;
}

function calculateGap(zoom: number) {
  const minZoom = 1;
  const maxZoom = 10;
  const minGap = 2;
  const maxGap = 4;
  const result = Math.round(
    ((zoom - minZoom) / (maxZoom - minZoom)) * (maxGap - minGap) + minGap
  );
  return result;
}

function calculateColumns(items: number) {
  switch (items) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 2;
    case 4:
      return 2;
    case 5:
      return 3;
    case 6:
      return 3;
    case 7:
      return 4;
    case 8:
      return 4;
    case 9:
      return 3;
    case 10:
      return 5;
    case 11:
      return 3;
    case 12:
      return 4;
    case 13:
      return 4;
    case 14:
      return 3;
    case 15:
      return 5;
    case 16:
      return 4;
    case 17:
      return 4;
    case 18:
      return 6;
    case 19:
      return 4;
    case 20:
      return 5;
    default:
      return 3;
  }
}

function getOffice(district: any) {
  if (district === "null") {
    return "Senate";
  }
  if (district === "0") {
    return "House Representative - At Large";
  }
  return `${district}${ordinal(district)} District`;
}

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

function applyMarkerEffect(
  mapView: any,
  layer: any,
  stateId: string,
  districtId: string
) {
  if (!mapView?.current) {
    return;
  }
  mapView.current.whenLayerView(layer.current).then((layerView: any) => {
    layer.current.state = stateId;
    layer.current.district = districtId;
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
}

function initMarkerLayer({ BaseLayerView2D, Layer }: any) {
  const pt: number[] = [];
  const MarkerLayerView = BaseLayerView2D.createSubclass({
    attach() {
      this.el = document.createElement("div");
      this.el.style.width = "100%";
      this.el.style.height = "100%";
      this.el.style.pointerEvents = "none";
      this.el.style.zIndex = -1;
      this.view.ui.add(this.el, "manual");
      this.layer.watch("markers", () => this.requestRender());
      this.layer.watch("state", () => this.requestRender());
      this.layer.watch("district", () => this.requestRender());
      this.view.on("wheel", () => {
        this.tooltip.style.display = "none";
      });
      this.el.addEventListener("click", (e: MouseEvent) => {
        if ((e.target as HTMLElement).matches("a")) {
          navigate((e.target as HTMLAnchorElement).href);
          e.preventDefault();
        }
      });
      this.tooltip = document.createElement("div");
      this.tooltip.style.zIndex = "1";
      this.tooltip.style.pointerEvents = "all";
      this.tooltip.classList.add(styles.tooltipWrapper);
      this.el.appendChild(this.tooltip);
      this.tooltip.innerHTML = `
        <div class="${styles.arrow}" data-popper-arrow></div>
      `;
      this.tooltipContent = document.createElement("div");
      this.tooltip.appendChild(this.tooltipContent);
      this.tooltip.addEventListener("click", (e: MouseEvent) => {
        const link: HTMLAnchorElement = this.tooltip.querySelector("a");
        if (link) {
          navigate(link.href);
        }

        e.preventDefault();
      });
      this.popperInstance = createPopper(this.el, this.tooltip, {
        placement: "top",
        modifiers: [
          { name: "arrow" },
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "flip",

            options: {
              fallbackPlacements: ["top", "right", "bottom", "left"],

              padding: 16,
            },
          },
          {
            name: "preventOverflow",
            options: {
              padding: 16,
            },
          },
        ],
      });
      this.insideTooltip = false;
      this.tooltip.addEventListener(
        "mouseenter",
        () => {
          this.insideTooltip = true;
        },
        true
      );
      this.tooltip.addEventListener(
        "mouseout",
        (e: any) => {
          if ((e.target as HTMLElement).matches("a")) {
            this.insideTooltip = false;
            this.currentTooltip = null;
            this.tooltip.style.display = "none";
          }
        },
        true
      );
      this.el.addEventListener(
        "mouseenter",
        (e: any) => {
          if ((e.target as HTMLElement).matches(`a[id]`)) {
            this.currentTooltip = e.target.href;
            this.tooltip.style.display = "block";
            const {
              image,
              name,
              district,
              stateAbbr,
              party,
            } = e.target.dataset;

            this.tooltipContent.innerHTML = `
              <a href="${e.target.href}" class="${styles.tooltip}">
                <div class="${styles.imageWrapper} ${
              styles[party.toLowerCase()]
            }">
                  <div style="background-image: url('${
                    image ||
                    "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mp&s=250"
                  }');" class="${styles.image}"></div>
                </div>
                <div class="${styles.tooltipContent}">
                  <h5 class="${styles.tooltipHeader}">${name}</h5>
                  <p class="${styles.infoLine}"><span class="${styles.dot} ${
              styles[party.toLowerCase()]
            }"></span>${party}</p>
                  <p class="${styles.infoLine}">
                  ${
                    statesByAbbr.find((s) => s.abbr === stateAbbr.toUpperCase())
                      ?.name
                  } - ${getOffice(district)}
                  </p>
                </div>
              </a>
              `;
            this.popperInstance.state.elements.reference = e.target;
            this.popperInstance.update();
          }
        },
        true
      );

      this.el.addEventListener(
        "mouseout",
        (e: any) => {
          setTimeout(() => {
            if (
              (e.target as HTMLElement).matches("a") &&
              !this.insideTooltip &&
              this.currentTooltip === e.target.href
            ) {
              this.tooltip.style.display = "none";
            }
          }, 500);
        },
        true
      );
    },
    detach() {
      this.view.ui.remove(this.el);
      this.el = null;
    },
    render({ state }: any) {
      const extentChanged =
        !this.previousExtent ||
        state.extent.xmin !== this.previousExtent.xmin ||
        state.extent.ymin !== this.previousExtent.ymin ||
        state.extent.xmax !== this.previousExtent.xmax ||
        state.extent.ymax !== this.previousExtent.ymax;

      const scaleChanged = this.previousScale !== state.scale;
      const stateChanged = this.layer.state !== this.previousState;
      const districtChanged = this.layer.district !== this.previousDistrict;

      if (scaleChanged) {
        console.log("scaleChanged");
        this.previousScale = state.scale;

        for (const marker of this.layer.markers) {
          const items = marker.candidates;
          const size =
            marker.type === "senate"
              ? calculateSizeSenate(this.view.zoom)
              : calculateSizeHouse(this.view.zoom);
          const gap = calculateGap(this.view.zoom);

          const innerWrapper = marker.node.childNodes[0];

          innerWrapper.style.gridTemplateColumns = `repeat(auto-fill, minmax(${size}px, 1fr))`;
          innerWrapper.style.gridTemplateRows = `repeat(auto-fill, minmax(${size}px, 1fr))`;
          innerWrapper.style.gridGap = `${gap}px`;

          const columns = calculateColumns(items);
          const remainder = items % columns;

          innerWrapper.className = `
              ${styles.markerInner}
              ${styles[`remainder${remainder}`]} 
              ${styles[`columns${columns}`]}
            `;

          innerWrapper.style.width = `${
            columns * size + (columns - 1) * gap
          }px`;
        }
      }
      if (extentChanged) {
        console.log("extentChanged");

        this.previousExtent = state.extent;
        for (const marker of this.layer.markers) {
          let [x, y] = state.toScreen(pt, marker.point.x, marker.point.y);
          x = Math.round(x) / window.devicePixelRatio;
          y = Math.round(y) / window.devicePixelRatio;
          marker.node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          if (!marker.node.parentElement) {
            this.el.appendChild(marker.node);
          }
        }
        this.popperInstance.update();
      }

      if (stateChanged || districtChanged) {
        console.log("district/state changed");

        this.previousState = this.layer.state;
        this.previousDistrict = this.layer.district;
        for (const marker of this.layer.markers) {
          if (this.layer.state && !this.layer.district) {
            if (marker.state !== this.layer.state) {
              marker.node.style.opacity = "0.35";
            } else {
              marker.node.style.opacity = "1";
            }
          }

          if (this.layer.state && this.layer.district) {
            if (
              marker.state !== this.layer.state &&
              marker.district !== this.layer.district
            ) {
              marker.node.style.opacity = "0.35";
            } else {
              marker.node.style.opacity = "1";
            }
          }

          if (!this.layer.state && !this.layer.district) {
            marker.node.style.opacity = "1";
          }

          if (!marker.node.parentElement) {
            this.el.appendChild(marker.node);
          }
        }
      }
    },
  });

  const MarkerLayer = Layer.createSubclass({
    createLayerView(view: any) {
      this.scrollingSurface = view.container.querySelector(
        ".esri-view-surface"
      );
      return new MarkerLayerView({ view, layer: this });
    },
  });

  return {
    MarkerLayer,
    MarkerLayerView,
  };
}

const ordinal = function (d: number) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

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
      Home,
      Extent,
    ],
    setModulesLoaded,
  ] = useState<any[]>([]);
  const stateMatch = useMatch("/state/:stateId/*");
  const districtMatch = useMatch("/state/:stateId/districts/:districtId/*");
  const { stateId, districtId } = Object.assign({}, stateMatch, districtMatch);
  const viewRef = useRef(null);
  const { setFilterValue, ...filters } = useFilterContext();
  const mapQuery = useMapSummaryQuery(filters);
  const setupView = useCallback(() => {
    var homeWidget = new Home({
      view: mapView.current,
      viewpoint: new Extent(initialExtentJSON),
    });

    // adds the home widget to the top left corner of the MapmapView.current
    mapView.current.ui.add(homeWidget, "top-left");
    mapView?.current?.when(() => {
      setMapViewReady(true);
    });
  }, [Home, mapView, Extent]);

  /**
   * Build marker nodes
   */
  useEffect(() => {
    if (
      !mapViewReady ||
      mapQuery.isLoading ||
      mapQuery.isError ||
      !mapQuery.data ||
      !markerLayerRef
    ) {
      return;
    }
    if (markerLayerRef.current) {
      map.current.layers.remove(markerLayerRef.current);
      markerLayerRef.current = null;
    }
    const { MarkerLayer } = initMarkerLayer({
      Layer,
      BaseLayerView2D,
    });

    const markerLayer = new MarkerLayer();
    const senateMarkers = mapQuery.data.senate
      .map(({ candidates, labelPoint }) => {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.classList.add(styles.marker);
        container.classList.add(styles.senateMarker);
        const containerInner = document.createElement("div");
        containerInner.className = styles.markerInner;
        container.appendChild(containerInner);
        candidates.forEach((candidate) => {
          const image = document.createElement("div");
          image.style.backgroundImage = `url(${
            candidate.image ||
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mp&s=250"
          })`;
          image.classList.add(styles.image);

          const wrapper = document.createElement("a");
          wrapper.dataset.image = candidate.image;
          wrapper.dataset.name = candidate.name;
          wrapper.dataset.party = candidate.party;
          wrapper.dataset.stateAbbr = candidate.stateAbbr;
          wrapper.dataset.district = candidate.district + "" || "null";
          const href = `/state/${candidate.stateAbbr}/candidates/${candidate.slug}/`;
          wrapper.id = `senate-${candidate.slug}`;
          wrapper.href = href;
          wrapper.title = candidate.name;
          wrapper.classList.add(styles.imageWrapper);
          wrapper.classList.add(styles[candidate.party.toLowerCase()]);
          wrapper.appendChild(image);
          containerInner.appendChild(wrapper);
          wrapper.addEventListener("wheel", (e: any) => {
            const eventClone = new e.constructor(e.type, e);
            markerLayer.scrollingSurface.dispatchEvent(eventClone);
          });
        });
        return {
          state: labelPoint.state,
          district: labelPoint.district,
          type: "senate",
          candidates: candidates.length,
          point: new Point({
            latitude: labelPoint.y,
            longitude: labelPoint.x,
            spatialReference: mapView.current.spatialReference,
          }),
          node: container,
        };
      })
      .flat();
    const houseMarkers = mapQuery.data.house
      .map(({ candidates, labelPoint }) => {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.className = styles.marker;
        const containerInner = document.createElement("div");
        containerInner.className = styles.markerInner;
        container.appendChild(containerInner);
        candidates.forEach((candidate) => {
          const wrapper = document.createElement("a");
          const href = `/state/${candidate.stateAbbr}/districts/${candidate.district}/candidates/${candidate.slug}/`;
          wrapper.href = href;
          wrapper.dataset.image =
            candidate.image ||
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mp&s=250";
          wrapper.dataset.name = candidate.name;
          wrapper.dataset.party = candidate.party;
          wrapper.dataset.stateAbbr = candidate.stateAbbr;
          wrapper.dataset.district = candidate.district + "";
          wrapper.title = candidate.name;
          wrapper.id = `house-${candidate.slug}`;
          wrapper.classList.add(styles.dot);
          wrapper.classList.add(styles[candidate.party.toLowerCase()]);
          containerInner.appendChild(wrapper);
          wrapper.addEventListener("wheel", (e: any) => {
            const eventClone = new e.constructor(e.type, e);
            markerLayer.scrollingSurface.dispatchEvent(eventClone);
          });
        });
        return {
          state: labelPoint.state,
          district: labelPoint.district,
          candidates: candidates.length,
          type: "house",
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
  }, [Layer, BaseLayerView2D, Point, mapView, map, mapViewReady, mapQuery]);

  /**
   * Query the query and refocus to extent when stateId or districtId change.
   */
  useEffect(() => {
    if (
      (stateId || (stateId && districtId)) &&
      stateLayer?.current &&
      districtLayer?.current
    ) {
      queryExtent(stateId, districtId, stateLayer, districtLayer).then(
        (result: any) => {
          if (result.extent) {
            mapView.current.goTo(result.extent);
          }
        }
      );
    } else if (mapView?.current) {
      mapView.current.goTo(new Extent(initialExtentJSON));
    }
  }, [
    stateId,
    districtId,
    stateLayer,
    districtLayer,
    mapViewReady,
    mapView,
    Extent,
  ]);

  /**
   * Setup the onClick handler for map layers.
   */
  useEffect(() => {
    if (mapView.current) {
      mapView.current.on("pointer-move", (e: any) => {
        mapView.current.hitTest(e).then((hitResult: any) => {
          const results = hitResult.results
            .map((r: any) => ({
              attributes: r.graphic.attributes,
              layer: r.graphic.layer,
            }))
            .filter((r: any) => r.layer.type === "feature");

          mapView.current.container.style.cursor = results?.length
            ? "pointer"
            : "default";
        });
      });
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
            if (district === 98 || district === 0) {
              navigate(`/state/${state}/`);
            } else {
              navigate(`/state/${state}/districts/${district}/`);
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

  useEffect(() => {
    applyMarkerEffect(mapView, markerLayerRef, stateId, districtId);
  }, [markerLayerRef, stateId, districtId, mapView, mapViewReady]);

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
        definitionExpression: "TERRITORY = 0",
        outFields: ["FID", "NAME", "BATTLEGROUND", "STUSPS", "TERRITORY"],
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
                  width: 1,
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

      districtLayer.current = new FeatureLayer({
        url: districtBoundriesService,
        definitionExpression: "TERRITORY = 0",
        outFields: ["FID", "CD116FP", "STATEUSPS", "BATTLEGROUND", "TERRITORY"],
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
                        width: 0.5,
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
                            dashTemplate: [1, 2], // width of dashes and spacing between the dashes
                          },
                        ],
                        enable: true, // must be set to true in order for the symbol layer to be visible
                        capStyle: "Butt",
                        joinStyle: "Round",
                        width: 0.5,
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
              // resizeAlign: "left",
              container: viewRef.current,
              extent: result.extent,
              constraints: {
                maxZoom: 10,
              },
            });
            setupView();
          }
        );
      } else {
        mapView.current = new MapView({
          map: map.current,
          // resizeAlign: "left",
          container: viewRef.current,
          extent: new Extent(initialExtentJSON),
          constraints: {
            maxZoom: 10,
          },
        });
        setupView();
      }
    }
  }, [
    Map,
    MapView,
    Basemap,
    VectorTileLayer,
    FeatureLayer,
    Extent,
    Home,
    viewRef,
    districtId,
    stateId,
    setupView,
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
      "esri/widgets/Home",
      "esri/geometry/Extent",
    ]).then((modules) => {
      setModulesLoaded(modules);
    });
  }, []);

  return <div className={styles.map} ref={viewRef}></div>;
};

export default ElectionMap;
