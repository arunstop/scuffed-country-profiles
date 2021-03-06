import _ from "lodash";
import { CountryActionTypes, CountryState } from "../../data/types/CountryTypes";

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
      const updatedKeyValue: any[] = _.uniq([
        // casting the state filters
        ...targetedKey,
        // then add the new value
        value,
      ]);
      // mixing changed filters with curent filters in state
      const filters = { ...state.filters, [key]: updatedKeyValue };
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
      const updatedKeyValue: any[] = targetedKey.filter((e) => e !== value);
      // mixing changed filters with curent filters in state
      const filters = { ...state.filters, [key]: updatedKeyValue };
      // applies the change to the state
      return { ...state, filters: { ...filters } };
    }
    case "CLEAR_FILTER": {
      // get key and value from payload
      const { key } = action.payload;
      // mixing changed filters with curent filters in state
      const filters = { ...state.filters, [key]: [] };
      // applies the change to the state
      return { ...state, filters: { ...filters } };
    }
    case "SET_SORTING": {
      // get sortingItem id and order
      const { id, order } = action.payload;
      const stateSorting = state.sorting;
      let updatedSorting = { ...stateSorting };
      // only change the order IF
      // sorting item of payload and state is the same
      if (id !== stateSorting.active) {
        updatedSorting = { ...stateSorting, active: id };
      }
      // only change the indicator
      else if (order !== stateSorting.order) {
        updatedSorting = { ...stateSorting, order: order };
      }
      console.log(updatedSorting);
      // if not change the indicator and the order
      return {
        ...state,
        sorting: updatedSorting,
      };
    }

    case "SET_GROUPING": {
      const { id } = action.payload;
      const updatedId = id;
      return {
        ...state,
        grouping: { ...state.grouping, active: updatedId },
      };
    }

    case "ADD_LAST_VISITED": {
      // add country to last visited list
      // remove an item if it has the same cca2
      const newData = action.payload;
      const newList = [
        ...state.lastVisitedList.filter((lv) => lv.cca2 !== newData.cca2),
        newData,
      ];
      return { ...state, lastVisitedList: newList };
    }
    default:
      return state;
  }
};
