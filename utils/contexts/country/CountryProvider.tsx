import { ReactNode, useReducer } from "react";
import { Country } from "../../data/models/Country";
import {
  CountryAction,
  CountryContextProps,
} from "../../data/types/CountryTypes";
import { CountryContext } from "./CountryContext";
import { INIT_COUNTRY_STATE } from "./CountryInitializers";
import { countryReducer } from "./CountryReducer";

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  // reducer
  const [countryState, countryDispatch] = useReducer(countryReducer, {
    ...INIT_COUNTRY_STATE,
  });

  const action: CountryAction = {
    setSearchKeyword: (keyword: string) => {
      countryDispatch({
        type: "SET_SEARCH_KEYWORD",
        payload: { keyword: keyword },
      });
    },
    setCountryList: (list: Country[]) => {
      countryDispatch({ type: "SET_COUNTRY_LIST", payload: { list: list } });
    },
    setFilter: ({ key, value, add }) => {
      if (add === true) {
        countryDispatch({
          type: "ADD_FILTER",
          payload: { key: key, value: value },
        });
      } else {
        countryDispatch({
          type: "REMOVE_FILTER",
          payload: { key: key, value: value },
        });
      }
    },
    clearFilter: (key) => {
      countryDispatch({ type: "CLEAR_FILTER", payload: { key: key } });
    },
    setSorting: (id, order) => {
      // console.log(id);
      // console.log(order);
      countryDispatch({
        type: "SET_SORTING",
        payload: { id: id, order: order },
      });
    },
    setGrouping: (id) => {
      countryDispatch({
        type: "SET_GROUPING",
        payload: { id: id },
      });
    },
    addLastVisited: (cca2) => {
      countryDispatch({
        type: "ADD_LAST_VISITED",
        payload: { cca2, dateTime: Date.now() },
      });
    },
  };
  const value: CountryContextProps = {
    state: countryState,
    action: action,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};
