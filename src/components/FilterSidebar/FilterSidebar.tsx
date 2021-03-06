import React, { useState } from "react";
import styles from "./FilterSidebar.module.css";
import { navigate, Link } from "@reach/router";
import { Accordion } from "react-accessible-accordion";
import AccordionItem from "../AccordionItem/AccordionItem";
import { useFilterContext } from "../FilterContext/FilterContext";
import { default as Geocoder, GeocodeCandidate } from "../Geocoder/Geocoder";
import { classNames } from "react-extras";
import { useMediaQuery } from "@react-hook/media-query";
import { getStateDistrictForLatLng } from "../../utils/requests";
import { sendEvent } from "../../utils/logger";

export interface IFilterSidebarProps { }

export const FilterSidebar: React.FunctionComponent<IFilterSidebarProps> = function FilterSidebar() {
  const [disabled, setDisabled] = useState(false);
  const [submitState, setSubmitState] = useState<{
    state: string | null;
    district: string | null;
  }>({ state: "", district: "" });
  const { setFilterValue, ...filters } = useFilterContext();
  const mobile = useMediaQuery("only screen and (max-device-width: 767px)");

  function handleGeocode(result: GeocodeCandidate) {
    sendEvent({ category: "Search Bar", action: "Geocode" })
    setDisabled(true);
    return getStateDistrictForLatLng(result.location.y, result.location.x).then(
      ({ state, district }) => {
        setDisabled(false);
        if (mobile) {
          setSubmitState({ state, district });
        } else {
          if (district) {
            navigate(`/state/${state}/districts/${district}/`);
          } else {
            navigate(`/state/${state.toLowerCase()}/`);
          }
        }
      }
    );
  }

  function handleState(state: string) {
    sendEvent({ category: "Search Bar", action: "State", label: state });
    if (mobile) {
      setSubmitState({ state, district: null });
    } else {
      navigate(`/state/${state.toLowerCase()}/`);
    }
    return Promise.resolve();
  }

  function handleLocation(state: string, district: string) {
    sendEvent({ category: "Search Bar", action: "Location", label: `${state.toUpperCase()}-${district}` });
    if (mobile) {
      setSubmitState({ state, district });
    } else {
      if (district) {
        navigate(`/state/${state}/districts/${district}/`);
      } else {
        navigate(`/state/${state.toLowerCase()}/`);
      }
    }
    return Promise.resolve();
  }

  function handleChange(filter: string) {
    return function () {
      sendEvent({ category: "Filter", action: filter, label: filters[filter] ? "Disable" : "Enable" });
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

        {mobile && (
          <button
            className={styles.submitButton}
            onClick={() => {
              if (submitState && submitState.district) {
                navigate(
                  `/state/${submitState.state?.toLowerCase()}/districts/${submitState.district
                  }/`
                );
              } else if (submitState && submitState.state) {
                navigate(`/state/${submitState.state.toLowerCase()}/`);
              }
            }}
          >
            Find Candidates
          </button>
        )}
        <button
          className={styles.resetButton}
          onClick={() => {
            setFilterValue("democrat", true);
            setFilterValue("republican", true);
            setFilterValue("independent", true);
            setFilterValue("other", true);
            setFilterValue("senate", true);
            setFilterValue("house", true);
            setFilterValue("woman", false);
            setFilterValue("bipoc", false);
          }}
        >
          Reset Filters
        </button>
      </Accordion>

      <Link to="/all/" className={styles.button}>
        Explore All Candidates
      </Link>
    </div>
  );
};

export default FilterSidebar;
