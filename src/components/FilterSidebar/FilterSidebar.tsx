import React, { useState } from "react";
import styles from "./FilterSidebar.module.css";
import { navigate, Link } from "@reach/router";
import { getStateDistrictForLatLng } from "../../utils/requests";
import { Accordion } from "react-accessible-accordion";
import AccordionItem from "../AccordionItem/AccordionItem";
import { useFilterContext } from "../FilterContext/FilterContext";
import { default as Geocoder, GeocodeCandidate } from "../Geocoder/Geocoder";
import { classNames } from "react-extras";

export interface IFilterSidebarProps {}

export const FilterSidebar: React.FunctionComponent<IFilterSidebarProps> = function FilterSidebar() {
  const [disabled, setDisabled] = useState(false);
  const { setFilterValue, ...filters } = useFilterContext();

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
              setDisabled(false);
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

  function handleChange(filter: string) {
    return function () {
      setFilterValue(filter, !filters[filter]);
    };
  }

  const Checkbox: React.FunctionComponent<{ name: string }> = function ({
    name,
    children,
  }) {
    return (
      <label className={styles.checkboxLabel}>
        <div className={styles.checkboxControl}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            name={name}
            onChange={handleChange(name)}
            checked={filters[name]}
          />
          <div className={styles.checkboxGraphic}></div>
        </div>
        <div className={styles.checkboxText}>{children}</div>
      </label>
    );
  };

  return (
    <div className={styles.grid}>
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
          <Checkbox name="house">House</Checkbox>
          <Checkbox name="senate">Senate</Checkbox>
        </AccordionItem>
        <AccordionItem title="Party Affiliation" uuid="party-affiliation">
          <Checkbox name="democrat">
            <span className={classNames(styles.dot, styles.democrat)}></span>{" "}
            Democrat
          </Checkbox>
          <Checkbox name="republican">
            <span className={classNames(styles.dot, styles.republican)}></span>
            Republican
          </Checkbox>
          <Checkbox name="independent">
            <span className={classNames(styles.dot, styles.independent)}></span>
            Independent
          </Checkbox>
          <Checkbox name="other">
            <span className={classNames(styles.dot, styles.other)}></span>
            Other
          </Checkbox>
        </AccordionItem>
        <AccordionItem title="Race &amp; Gender" uuid="race-and-gender">
          <Checkbox name="woman">Woman</Checkbox>
          <Checkbox name="bipoc">BIPOC</Checkbox>
        </AccordionItem>
      </Accordion>
      <Link to="/all/" className={styles.button}>
        Explore All Candidates
      </Link>
    </div>
  );
};

export default FilterSidebar;
