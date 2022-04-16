import _ from "lodash";
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
    case "ADD_FILTER": {
      // get key and value from payload
      const { key, value } = action.payload;
      // get key from the state
      // ex: state.filters["key"]
      const targetedKey = Array.from((state.filters as any)[key]);
      // add new value
      const changedKeyValue: any[] = _.uniq([
        // casting the state filters
        ...targetedKey,
        // then add the new value
        value,
      ]);
      // mixing changed filters with curent filters in state
      const filters = { ...state.filters, [key]: changedKeyValue };
      // applies the change to the state
      return { ...state, filters: { ...filters } };
      // return state;
    }
    case "REMOVE_FILTER": {
      // get key and value from payload
      const { key, value } = action.payload;
      // get key from the state
      // ex: state.filters["key"]
      const targetedKey = Array.from((state.filters as any)[key]);
      // remove value
      const changedKeyValue: any[] = targetedKey.filter((e) => e !== value);
      // mixing changed filters with curent filters in state
      const filters = { ...state.filters, [key]: changedKeyValue };
      // applies the change to the state
      return { ...state, filters: { ...filters } };
    }
    case "CLEAR_FILTER":{
      // get key and value from payload
      const { key } = action.payload;
      // mixing changed filters with curent filters in state
      const filters = { ...state.filters, [key]: [] };
      // applies the change to the state
      return { ...state, filters: { ...filters } };
    }
    default:
      return state;
  }
};
