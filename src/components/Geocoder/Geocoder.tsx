import React, { useState } from "react";
import { useCombobox } from "downshift";
import {
  suggest,
  geocode,
  IGeocodeResponse,
} from "@esri/arcgis-rest-geocoding";
// import styles from "./Geocoder.module.css";

export type GeocodeCandidate = IGeocodeResponse["candidates"][0];

export interface IGeocoderProps {
  handleGeocode?: (r: GeocodeCandidate) => void;
}

const Geocoder: React.FunctionComponent<IGeocoderProps> = function Geocoder({
  handleGeocode,
}) {
  const [inputItems, setInputItems] = useState<any[]>([]);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
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
        geocode({
          singleLine: change.selectedItem.text,
          magicKey: change.selectedItem.magicKey,
        }).then((response) => {
          if (handleGeocode && response?.candidates[0]) {
            handleGeocode(response.candidates[0]);
          }
        });
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        suggest(inputValue).then(({ suggestions }) => {
          setInputItems(suggestions);
        });
      }
    },
  });

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label {...getLabelProps()}>Address</label>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            onBlur: () => {
              selectItem(null);
            },
          })}
          autoComplete="off"
        />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label={"toggle menu"}
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item.magicKey}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.text}
            </li>
          ))}
      </ul>
      <input type="submit" />
    </form>
  );
};

export default Geocoder;
