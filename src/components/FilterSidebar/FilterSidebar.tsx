import React, { useState } from "react";
import styles from "./FilterSidebar.module.css";
import { navigate } from "@reach/router";
import { getStateDistrictForLatLng } from "../../utils/requests";
import { Accordion } from "react-accessible-accordion";
import AccordionItem from "../AccordionItem/AccordionItem";

import { default as Geocoder, GeocodeCandidate } from "../Geocoder/Geocoder";

export interface IFilterSidebarProps {}

export const FilterSidebar: React.FunctionComponent<IFilterSidebarProps> = function FilterSidebar() {
  const [disabled, setDisabled] = useState(false);

  function handleGeocode(result: GeocodeCandidate) {
    setDisabled(true);
    return getStateDistrictForLatLng(result.location.y, result.location.x).then(
      ({ state, district }) => {
        setDisabled(false);
        navigate(`/state/${state}/districts/${district}/`);
      }
    );
  }

  function handleState(state: string) {
    navigate(`/state/${state.toLowerCase()}/`);
    return Promise.resolve();
  }

  function handleLocation() {
    setDisabled(true);
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position && position.coords) {
            getStateDistrictForLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(({ state, district }) => {
              navigate(`/state/${state}/districts/${district}/`);
              resolve();
            });
          } else {
            setDisabled(false);
            resolve();
          }
        },
        () => {
          setDisabled(false);
          resolve();
        }
      );
    });
  }
  return (
    <div>
      <h1 className={styles.title}>Find your candidates</h1>
      <Accordion
        allowMultipleExpanded
        allowZeroExpanded
        preExpanded={["location"]}
      >
        <AccordionItem title="Location" uuid="location">
          <Geocoder
            disabled={disabled}
            handleGeocode={handleGeocode}
            handleState={handleState}
            handleLocation={handleLocation}
          />
        </AccordionItem>
        <AccordionItem title="Election Level" uuid="election-level">
          Election Level Filter
        </AccordionItem>
        <AccordionItem title="Party Affiliation" uuid="party-affiliation">
          Party Affiliation Filter
        </AccordionItem>
        <AccordionItem title="Race &amp; Gender" uuid="race-and-gender">
          Race &amp; Gender Filter
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
