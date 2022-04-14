import { CountryState } from "../../data/types/CountryTypes";
import { CountryActionTypes } from "../../data/types/CountryTypes";

export const CountryReducer = (
  state: CountryState,
  action: CountryActionTypes,
): CountryState => {
  const type = action.type;
  switch (type) {
    // change dark mode on state
    case "SEARCH": {
      return { ...state, searchKeyword: action.payload.keyword };
    }
    // change list view on state
    case "SET_COUNTRY_LIST": {
      return { ...state, list: action.payload.list };
    }
    default:
      return state;
  }
};
