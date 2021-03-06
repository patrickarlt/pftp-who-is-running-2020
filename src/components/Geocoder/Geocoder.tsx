import React, { useState, useRef } from "react";
import { useCombobox } from "downshift";
import {
  suggest,
  geocode,
  reverseGeocode,
  IGeocodeResponse,
} from "@esri/arcgis-rest-geocoding";
import styles from "./Geocoder.module.css";
import { usePopper } from "react-popper";
import { classNames } from "react-extras";
import Loader from "react-loader-spinner";
import { statesByAbbr } from "../../utils/states";
import { getStateDistrictForLatLng } from "../../utils/requests";
import { logger } from "../../utils/logger";

export type GeocodeCandidate = IGeocodeResponse["candidates"][0];

export interface IGeocoderProps {
  disabled: boolean;
  handleGeocode?: (r: GeocodeCandidate) => Promise<any>;
  handleLocation?: (s: string, d: string) => Promise<any>;
  handleState?: (s: string) => Promise<any>;
}

const Geocoder: React.FunctionComponent<IGeocoderProps> = function Geocoder({
  handleGeocode,
  handleLocation,
  handleState,
  disabled,
}) {
  const inputRef = useRef<HTMLInputElement>();

  const [busy, setBusy] = useState<boolean>(false);
  const locationItem = {
    type: "location",
    magicKey: "GEOCODE",
    text: "Use current location",
  };
  const [inputItems, setInputItems] = useState<any[]>([locationItem]);
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    openMenu,
    closeMenu,
    inputValue,
    setInputValue,
    reset,
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => {
      return item?.text;
    },
    onStateChange: (change) => {
      if (
        change.type === useCombobox.stateChangeTypes.InputKeyDownEnter &&
        change.selectedItem
      ) {
        handleItemSelect(change.selectedItem);
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        suggest(inputValue, {
          params: {
            category: "Address",
            countryCode: "USA",
          },
        }).then((response) => {
          const states = statesByAbbr
            .filter(
              ({ name }) =>
                name.toLowerCase().indexOf(inputValue?.toLowerCase()) === 0
            )
            .map((s) => {
              return {
                type: "state",
                text: s.name,
                magicKey: s.abbr,
              };
            });
          const suggestions = response.suggestions.map((s) => {
            return Object.assign({}, s, { type: "address" });
          });
          setInputItems([locationItem, ...states.slice(0, 3), ...suggestions]);
        });
      }
    },
  });

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const popper = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 1],
        },
      },
    ],
  });

  function handleItemSelect(selectedItem: any) {
    setBusy(true);
    switch (selectedItem.type) {
      case "address":
        geocode({
          singleLine: selectedItem.text,
          magicKey: selectedItem.magicKey,
        })
          .then((response) => {
            if (handleGeocode && response?.candidates[0]) {
              setInputValue(selectedItem.text);
              return handleGeocode(response.candidates[0]);
            }
          })
          .then(() => {
            setBusy(false);
            closeMenu();
          })
          .catch((e) => {
            setBusy(false);
          });
        break;
      case "location":
        setBusy(true);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position && position.coords) {

              getStateDistrictForLatLng(
                position.coords.latitude,
                position.coords.longitude
              ).then(({ state, district }) => {
                if (handleLocation) {
                  handleLocation(state, district).then(() => {
                    setBusy(false);
                    selectItem(null);
                    closeMenu();
                  });
                }
              }).then(() => {
                return reverseGeocode({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              }).then((response) => {
                setInputValue(response.address.LongLabel);
                setBusy(false);
              }).catch(() => {
                setBusy(false);
              });
            } else {
              setBusy(false);
            }
          },
          () => {
            setBusy(false);
          }
        );

        break;
      case "state":
        if (handleState) {
          handleState(selectedItem.magicKey).then(() => {
            setInputValue(selectedItem.text);
            setBusy(false);
            closeMenu();
          });
        }
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        {...getComboboxProps()}
      >
        <div className={styles.grid} ref={setReferenceElement as any}>
          <input
            {...getInputProps({
              ref: inputRef as any,
              onFocus: () => {
                if (popper && popper.update) {
                  popper.update();
                }

                openMenu();
              },
            })}
            disabled={disabled}
            value={inputValue || ""}
            className={styles.input}
            autoComplete="off"
            placeholder="State or address&hellip;"
          />
          {inputValue && inputValue.length ? (
            <button
              tabIndex={0}
              type="button"
              aria-label="clear"
              className={classNames(styles.button, styles.clearButton)}
              disabled={(disabled ? true : null) as any}
              onClick={() => {
                logger("clear")
                reset();
                setInputValue("");
                setInputItems([locationItem]);
                openMenu();
                inputRef.current?.focus();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 24 24"
              >
                <defs />
                <defs>
                  <mask
                    id="a"
                    width="24"
                    height="24"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <path fill="#fff" d="M0 0h24v24H0z" />
                  </mask>
                </defs>
                <g mask="url(#a)">
                  <path d="M17.59 5L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </g>
              </svg>
            </button>
          ) : (
              <button
                tabIndex={0}
                type="submit"
                aria-label="search"
                className={classNames(styles.button, styles.searchButton)}
                disabled={disabled ? true : undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                >
                  <defs />
                  <defs>
                    <mask
                      id="a"
                      width="24"
                      height="24"
                      x=".21"
                      y=".7"
                      maskUnits="userSpaceOnUse"
                    >
                      <path fill="#fff" d="M.21.7h24v24h-24z" />
                    </mask>
                  </defs>
                  <g mask="url(#a)">
                    <path
                      fillRule="evenodd"
                      d="M14.59 13.17a6 6 0 10-1.42 1.42l5.72 5.71 1.41-1.41-5.71-5.72zm-2.06-6.3a4 4 0 11-5.66 0 4 4 0 015.66 0z"
                    />
                  </g>
                </svg>
              </button>
            )}
        </div>

        <label {...getLabelProps()} className={styles.label}>
          Search for a state or address
        </label>
      </form>
      <div
        ref={setPopperElement as any}
        className={styles.menuContainer}
        style={{
          ...popper.styles.popper,
          display: isOpen ? "block" : "none",
          width: (referenceElement as any)?.offsetWidth,
        }}
        {...popper.attributes.popper}
      >
        {isOpen && busy && (
          <Loader
            type="Oval"
            color="#eec041"
            height={45}
            width={45}
            className={styles.loader}
          />
        )}

        <ul {...getMenuProps()} className={styles.menu}>
          {isOpen &&
            !busy &&
            inputItems.map((item, index) => (
              <li
                className={classNames(styles.menuItem, {
                  [styles.menuItemSelected]: highlightedIndex === index,
                  [styles.locationIcon]: item.magicKey === "GEOCODE",
                })}
                key={`${item.magicKey}${index}`}
                {...getItemProps({
                  item,
                  index,
                })}
                onClick={() => {
                  handleItemSelect(item);
                }}
              >
                {item.text}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Geocoder;
