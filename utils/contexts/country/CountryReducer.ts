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
    case "SET_FILTER": {
      // get key and value from payload
      const { key, value } = action.payload;
      // get key from the state
      const targetedKey = Array.from((state.filters as any)[key]);
      let changedKeyValue: any[] = [];
      // check if value already exists
      if (targetedKey.includes(value)) {
        // then delete it
        changedKeyValue = targetedKey.filter((e) => e !== value);
      } else {
        // get the changed key value if doenst exist
        changedKeyValue = _.uniq([
          // casting the state filters
          ...targetedKey,
          // then add the new value
          value,
        ]);
      }
      // mixing changed filters with curent filters in state
      const filters = { ...state.filters, [key]: changedKeyValue };
      // console.log(filters);
      // applies the change to the state
      return { ...state, filters: { ...filters } };
      // return state;
    }
    default:
      return state;
  }
};
