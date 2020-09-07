import React from "react";
import styles from "./FilterSidebar.module.css";
import { navigate } from "@reach/router";

export interface IFilterSidebarProps {}

export const FilterSidebar: React.FunctionComponent<IFilterSidebarProps> = function FilterSidebar({
  children,
}) {
  function handleOnClick() {
    navigate("/california/");
  }
  return (
    <div>
      <h1 className={styles.title}>Find your candidates</h1>
      <button onClick={handleOnClick}>Find your candidates</button>
    </div>
  );
};

export default FilterSidebar;
