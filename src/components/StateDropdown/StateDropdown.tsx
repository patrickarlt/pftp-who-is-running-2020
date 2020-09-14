import React, { useState } from "react";
import { useCombobox } from "downshift";

// import styles from "./StateDropdown.module.css";
import { Link, navigate } from "@reach/router";

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

export interface IStateDropdownProps {}

const StateDropdown: React.FunctionComponent<IStateDropdownProps> = function StateDropdown() {
  const [inputItems, setInputItems] = useState<any[]>(statesByAbbr);
  const [focused, setFocused] = useState(false);

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
    openMenu,
    closeMenu,
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => {
      return item?.name || "";
    },
    onSelectedItemChange: (change) => {
      console.log({ change });
      closeMenu();
      setInputItems(statesByAbbr);
      selectItem(null);
      if (change.selectedItem) {
        navigate(`/state/${change.selectedItem.abbr.toLowerCase()}/`);
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        console.log(
          statesByAbbr.filter(
            ({ name }) =>
              name.toLowerCase().indexOf(inputValue?.toLowerCase()) >= 0
          )
        );
        setInputItems(
          statesByAbbr.filter(
            ({ name }) =>
              name.toLowerCase().indexOf(inputValue?.toLowerCase()) >= 0
          )
        );
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
      <label {...getLabelProps()}>State</label>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            onFocus: () => {
              openMenu();
              setFocused(true);
            },
            onBlur: () => {
              setFocused(false);
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
      <ul
        {...getMenuProps()}
        style={{ display: isOpen || focused ? "block" : "none" }}
      >
        {inputItems.map((item, index) => (
          <li
            style={
              highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
            }
            key={`${item.abbr}${index}`}
            {...getItemProps({ item, index })}
          >
            <Link to={`/state/${item.abbr.toLowerCase()}/`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <input type="submit" />
    </form>
  );
};

export default StateDropdown;
