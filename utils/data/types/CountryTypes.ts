import { Country } from "../models/Country";

export type ListViewTypes = "LIST" | "TILES" | "CARDS";

export interface CountryState {
  searchKeyword: string;
  list: Country[];
}

export interface CountryAction {
  search: (keyword: string) => void;
  setCountryList: (list: Country[]) => void;
}

export type CountryActionTypes =
  | {
      type: "SEARCH";
      payload: { keyword: string };
    }
  | {
      type: "SET_COUNTRY_LIST";
      payload: { list: Country[] };
    };

export type CountryContextProps = {
  state: CountryState;
  action: CountryAction;
};
