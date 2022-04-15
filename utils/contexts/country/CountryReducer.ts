import { CountryState } from "../../data/types/CountryTypes";
import { CountryActionTypes } from "../../data/types/CountryTypes";

export const countryReducer = (
  state: CountryState,
  action: CountryActionTypes,
): CountryState => {
  const type = action.type;
  switch (type) {
    // change dark mode on state
    case "SET_SEARCH_KEYWORD": {
      return { ...state, searchKeyword: action.payload.keyword.trim() };
    }
    // change list view on state
    case "SET_COUNTRY_LIST": {
      return { ...state, list: action.payload.list };
    }
    default:
      return state;
  }
};
