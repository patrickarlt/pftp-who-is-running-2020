import React, { useState } from "react";
import styles from "./FilterSidebar.module.css";
import { navigate } from "@reach/router";
import { getStateDistrictForLatLng } from "../../utils/requests";

import { default as Geocoder, GeocodeCandidate } from "../Geocoder/Geocoder";
import { linkSync } from "fs";

const statesByAbbr: { [index: string]: string } = {
  AZ: "Arizona",
  AL: "Alabama",
  AK: "Alaska",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export interface IFilterSidebarProps {}

export const FilterSidebar: React.FunctionComponent<IFilterSidebarProps> = function FilterSidebar({
  children,
}) {
  const [disabled, setDisabled] = useState(false);
  function handleOnClick() {
    navigate("/state/ca/");
  }
  function handleGeocode(result: GeocodeCandidate) {
    getStateDistrictForLatLng(result.location.y, result.location.x).then(
      ({ state, district }) => {
        navigate(`/state/${state}/districts/${district}/`);
      }
    );
  }
  function handleOnSelect(e: React.ChangeEvent) {
    navigate(`/state/${(e.target as HTMLSelectElement).value.toLowerCase()}/`);
  }
  function handleLocation() {
    setDisabled(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position && position.coords) {
          getStateDistrictForLatLng(
            position.coords.latitude,
            position.coords.longitude
          ).then(({ state, district }) => {
            navigate(`/state/${state}/districts/${district}/`);
          });
        } else {
          setDisabled(false);
        }
      },
      () => {
        setDisabled(false);
      }
    );
  }
  return (
    <div>
      <h1 className={styles.title}>Find your candidates</h1>
      <Geocoder handleGeocode={handleGeocode} />

      <hr />

      <button onClick={handleLocation} disabled={disabled}>
        Use my location
      </button>

      <hr />

      <select onChange={handleOnSelect} defaultValue="">
        <option disabled value="">
          Select a state
        </option>
        {Object.keys(statesByAbbr).map((abbr) => {
          return (
            <option value={abbr} key={abbr}>
              {statesByAbbr[abbr]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterSidebar;
