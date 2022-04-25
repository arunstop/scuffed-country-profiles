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
  sorting: {
    list: CountryListSortingItem[];
    indicator: string;
    order: SortingOrder;
  };
}

export interface CountryAction {
  setSearchKeyword: (keyword: string) => void;
  setCountryList: (list: Country[]) => void;
  setFilter: ({
    key,
    value,
    add,
  }: {
    key: string;
    value: string;
    add: boolean;
  }) => void;
  clearFilter: (key: string) => void;
  setSorting: (id: string, order: SortingOrder) => void;
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
      type: "ADD_FILTER";
      payload: { key: string; value: string };
    }
  | {
      type: "REMOVE_FILTER";
      payload: { key: string; value: string };
    }
  | {
      type: "CLEAR_FILTER";
      payload: { key: string };
    }
  | {
      type: "SET_SORTING";
      payload: { id: string; order: SortingOrder };
    };

export type CountryContextProps = {
  state: CountryState;
  action: CountryAction;
};

export interface CountryListSortingItem {
  id: string;
  label: string;
}

export type SortingOrder = "ASC" | "DESC";

export type GroupedCountry = {
  id: string;
  list: Country[];
};
