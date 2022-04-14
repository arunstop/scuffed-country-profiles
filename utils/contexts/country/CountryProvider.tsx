import { ReactNode, useReducer } from "react";
import { Country } from "../../data/models/Country";
import {
  CountryAction,
  CountryContextProps,
} from "../../data/types/CountryTypes";
import { CountryContext } from "./CountryContext";
import { INIT_COUNTRY_STATE } from "./CountryInitializers";
import { CountryReducer } from "./CountryReducer";

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  // reducer
  const [countryState, countryDispatch] = useReducer(CountryReducer, {
    ...INIT_COUNTRY_STATE,
  });

  const action: CountryAction = {
    search: (keyword: string) => {
      countryDispatch({ type: "SEARCH", payload: { keyword: keyword } });
    },
    setCountryList: (list: Country[]) => {
      countryDispatch({ type: "SET_COUNTRY_LIST", payload: { list: list } });
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
