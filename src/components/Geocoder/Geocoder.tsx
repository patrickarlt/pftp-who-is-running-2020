import React, { useState } from "react";
import { useCombobox } from "downshift";
import {
  suggest,
  geocode,
  IGeocodeResponse,
} from "@esri/arcgis-rest-geocoding";
import styles from "./Geocoder.module.css";
import { usePopper } from "react-popper";
import { classNames } from "react-extras";
import Loader from "react-loader-spinner";
export type GeocodeCandidate = IGeocodeResponse["candidates"][0];

export interface IGeocoderProps {
  disabled: boolean;
  handleGeocode?: (r: GeocodeCandidate) => Promise<any>;
  handleLocation?: () => Promise<any>;
  handleState?: (s: string) => Promise<any>;
}

const statesByAbbr = [
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DC", name: "District of Columbia" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
];

const Geocoder: React.FunctionComponent<IGeocoderProps> = function Geocoder({
  handleGeocode,
  handleLocation,
  handleState,
  disabled,
}) {
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
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => {
      return item?.text;
    },
    onStateChange: (change) => {
      console.log({ change });
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
          offset: [0, -1],
        },
      },
    ],
  });

  function handleItemSelect(selectedItem: any) {
    console.log("handleItemSelect", { selectedItem });
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
          });
        break;
      case "location":
        setInputValue("");
        if (handleLocation) {
          handleLocation().then(() => {
            setBusy(false);
            selectItem(null);
            closeMenu();
          });
        }

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
              onFocus: () => {
                openMenu();
              },
            })}
            disabled={disabled}
            value={inputValue || ""}
            className={styles.input}
            autoComplete="off"
            placeholder="State or address&hellip;"
          />
          <button
            type="submit"
            aria-label="search"
            className={styles.button}
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M28.996 28.29l-9.595-9.596.255-.256a9.3 9.3 0 1 0-1.218 1.218l.256-.255 9.595 9.595zm-11.265-9.34a8.328 8.328 0 1 1 1.156-1.15z" />
              <path fill="none" d="M0 0h32v32H0z" />
            </svg>
          </button>
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
                })}
                key={`${item.magicKey}${index}`}
                {...getItemProps({
                  item,
                  index,
                })}
                onClick={() => {
                  console.log("handleClick", { item });
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
