import { CountryContext } from "./CountryContext";
import { useContext } from "react";
import _ from "lodash";

export const useCountryContext = () => {
  const {
    state: { searchKeyword: keyword },
    state,
    action,
  } = useContext(CountryContext);
  const sortedList = _.orderBy(
    state.list,
    // sort by property :
    [(item) => item.name.common],
    // order
    ["asc"],
  );
  const searchedList = sortedList.filter(
    (country) =>
      country.name.common.toLowerCase().includes(keyword) ||
      country.altSpellings.map((e) => e.toLowerCase()).includes(keyword),
  );
  return {
    state,
    action,
    getters: {
      searchedList: searchedList,
    },
  };
};
