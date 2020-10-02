import React, { useContext, useState } from "react";

export interface IFilterContext {
  house: boolean;
  senate: boolean;
  democrat: boolean;
  republican: boolean;
  independent: boolean;
  other: boolean;
  woman: boolean;
  bipoc: boolean;
  setFilterValue: (filter: any, value: boolean) => void;
  [index: string]: any;
}

const defaultContextValues = {
  house: true,
  senate: true,
  democrat: true,
  republican: true,
  independent: true,
  other: true,
  woman: false,
  bipoc: false,
  setFilterValue: (filter: any, value: boolean) => {},
};

const FilterContext = React.createContext<IFilterContext>(defaultContextValues);

export const useFilterContext = function () {
  return useContext(FilterContext);
};

const FilterContextProvider: React.FunctionComponent = function FilterContextProvider({
  children,
}) {
  const [contextValue, setContextValue] = useState<IFilterContext>(
    defaultContextValues
  );

  function setFilterValue(filter: string, value: boolean) {
    contextValue[filter] = value;
    setContextValue({ ...contextValue });
  }

  return (
    <FilterContext.Provider value={{ ...contextValue, ...{ setFilterValue } }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
