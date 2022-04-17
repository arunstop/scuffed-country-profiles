import { CountryState } from "../../data/types/CountryTypes";
export const INIT_COUNTRY_STATE: CountryState = {
  searchKeyword: "",
  list: [],
  filters: {
    continents: [],
    region: [],
    subregion: [],
  },
  sorting: {
    list: [
      { id: "name.common", label: "Name" },
      { id: "population", label: "Population" },
      { id: "area", label: "Land area in km²" },
    ],
    indicator: "name.common",
    order: "ASC",
  },
};
