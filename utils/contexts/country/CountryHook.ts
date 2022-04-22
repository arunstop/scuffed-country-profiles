import { CountryContext } from "./CountryContext";
import { useContext } from "react";
import _ from "lodash";
import { lowerCaseChildrenFetch } from "../../helpers/Fetchers";
import { Country } from "../../data/models/Country";

export const useCountryContext = () => {
  const {
    // state: { searchKeyword: keyword },
    // state: { searchKeyword: keyword },
    state,
    state: { filters, sorting },
    action,
  } = useContext(CountryContext);
  const sortedList = _.orderBy(
    state.list,
    // sort by property :
    // [(item) => (item as any)[sorting.indicator]],
    // casting to string again because without it, the orderBy
    [sorting.indicator],
    // order
    // casting sorting order to any first
    // to avoid type_error
    [sorting.order.toLowerCase() as any],
  );
  // trim and lowercase keyword
  const keyword = state.searchKeyword.toLocaleLowerCase().trim();
  // set searchedList
  function searchedList(): Country[] {
    return state.list.length === 0
      ? sortedList
      : sortedList.filter((country) => {
          // console.log(
          //   _.intersection(
          //     lowerCaseChildrenFetch(country["continents"]),
          //     lowerCaseChildrenFetch(filters.continents),
          //   ),
          // );
          return (
            // FILTER WITH GEO properties
            // Continents
            (filters.continents.length === 0
              ? true
              : _.intersection(
                  lowerCaseChildrenFetch(country.continents),
                  lowerCaseChildrenFetch(filters.continents),
                ).length !== 0) &&
            // Region
            (filters.region.length === 0
              ? true
              : lowerCaseChildrenFetch(filters.region).includes(
                  country.region.toLowerCase(),
                )) &&
            // Subregion
            (filters.subregion.length === 0
              ? true
              : lowerCaseChildrenFetch(filters.subregion).includes(
                  country.subregion?.toLowerCase(),
                )) &&
            // SEARCH WITH KEYWORD
            (state.searchKeyword.length < 2
              ? true
              : // common name
                country.name.common.toLowerCase().includes(keyword) ||
                // official name
                country.name.official.toLowerCase().includes(keyword) ||
                // native names
                country.name.nativeName
                  .map((e) => `${e.common} · ${e.official}`)
                  .join(" — ")
                  .toLowerCase()
                  .includes(keyword) ||
                // more names
                country.altSpellings
                  .join(" — ")
                  .toLowerCase()
                  .includes(keyword))
          );
        });
  }
  const distinctAndSort = (list: any[], order: "asc" | "desc" = "asc") =>
    _.orderBy(_.uniq(list), [(e) => e], [order]).filter((e) => e);

  const continentList = () =>
    distinctAndSort(_.flatMap(state.list.map((item) => item.continents)));

  const regionList = () =>
    distinctAndSort(_.map(state.list.map((item) => item.region)));

  const subregionList = () =>
    distinctAndSort(_.map(state.list.map((item) => item.subregion)));

  return {
    state,
    action,
    getters: {
      list: {
        filteredList: searchedList,
        filterProps: {
          continentList: continentList(),
          regionList: regionList(),
          subregionList: subregionList(),
        },
        noResultFound: searchedList().length === 0,
        noData: state.list.length === 0,
      },
    },
  };
};
