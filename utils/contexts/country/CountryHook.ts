import { CountryContext } from "./CountryContext";
import { useContext } from "react";
import _ from "lodash";

export const useCountryContext = () => {
  const {
    // state: { searchKeyword: keyword },
    // state: { searchKeyword: keyword },
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
  const keyword = state.searchKeyword.toLocaleLowerCase().trim();
  const searchedList =
    state.searchKeyword.length < 2
      ? sortedList
      : sortedList.filter((country) => {
          return (
            country.name.common.toLowerCase().includes(keyword) ||
            country.name.official.toLowerCase().includes(keyword) ||
            country.name.nativeName
              .map((e) => `${e.common} · ${e.official}`.toLowerCase())
              .join(" — ")
              .includes(keyword) ||
            country.altSpellings.join(" — ").toLowerCase().includes(keyword)
          );
        });
  return {
    state,
    action,
    getters: {
      searchedList: searchedList,
    },
  };
};
