import { Country } from "../models/Country";

export type ListViewTypes = "LIST" | "TILES" | "CARDS";

export interface CountryState {
  searchKeyword: string;
  list: Country[];
  filters: {
    continents: string[];
    region: string[];
    subregion: string[];
  };
}

export interface CountryAction {
  setSearchKeyword: (keyword: string) => void;
  setCountryList: (list: Country[]) => void;
  addFilter: (key: string, value: string) => void;
}

export type CountryActionTypes =
  | {
      type: "SET_SEARCH_KEYWORD";
      payload: { keyword: string };
    }
  | {
      type: "SET_COUNTRY_LIST";
      payload: { list: Country[] };
    }
  | {
      type: "SET_FILTER";
      payload: { key: string; value: string };
    };

export type CountryContextProps = {
  state: CountryState;
  action: CountryAction;
};
