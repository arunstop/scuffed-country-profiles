import _ from "lodash";
import { useContext } from "react";
import { Country } from "../../data/models/Country";
import { GroupedCountry } from "../../data/types/CountryTypes";
import { lowerCaseChildrenFetch } from "../../helpers/Fetchers";
import { GroupingTypes } from "./../../data/types/CountryTypes";
import { CountryContext } from "./CountryContext";

export const useCountryContext = () => {
  const {
    // state: { searchKeyword: keyword },
    // state: { searchKeyword: keyword },
    state,
    state: { list, filters, sorting },
    action,
  } = useContext(CountryContext);
  const sortedList = _.orderBy(
    list,
    // sort by property :
    // [(item) => (item as any)[sorting.indicator]],
    // casting to string again because without it, the orderBy
    [sorting.active],
    // order
    // casting sorting order to any first
    // to avoid type_error
    [sorting.order.toLowerCase() as any],
  );
  // trim and lowercase keyword
  const keyword = state.searchKeyword.toLocaleLowerCase().trim();
  // set searchedList
  function searchedList(): Country[] {
    return list.length === 0
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

  const continentList = (filtered = false) =>
    distinctAndSort(_.flatMap(list.map((item) => item.continents)));

  const regionList = (filtered = false) =>
    distinctAndSort(_.map(list.map((item) => item.region)));

  const subregionList = (filtered = false) =>
    distinctAndSort(_.map(list.map((item) => item.subregion)));

  const borderingCountryList = (borderList: string[]): Country[] => {
    if (!borderList) return [];
    return list.filter((country) => borderList.includes(country.cca3));
  };

  const mutualSubregionCountryList = (subregion: string): Country[] => {
    if (!subregion) return [];
    return list.filter((country) => country.subregion === subregion);
  };

  const groupedList = (id: GroupingTypes): GroupedCountry[] => {
    if (id === "none") return [];
    // const groupedList = () => {
    const groupedResult = _.groupBy(
      searchedList(),
      (e) => (e as any)[id] || "Unspecified",
    );
    const groupedList = Object.keys(groupedResult).map(
      (e) =>
        ({
          id: e,
          list: groupedResult[e],
        } as GroupedCountry),
    );
    // console.log(groupedList);
    return _.orderBy(
      groupedList,
      [(e) => e.id.split(" ").reverse().join(" ")],
      ["asc"],
    );
  };

  const pagingDetailsPrevNext = (cca2: string) => {
    const alphaSortedCcaList = _.sortBy(list, [(e) => e.name.common]).map(
      (e) => e.cca2,
    );
    const currCountryIdx = _.indexOf(alphaSortedCcaList, cca2);
    const prev: string =
      currCountryIdx === 0 ? "" : alphaSortedCcaList[currCountryIdx - 1];
    const next: string =
      currCountryIdx === alphaSortedCcaList.length
        ? ""
        : alphaSortedCcaList[currCountryIdx + 1];
    return {
      prev: prev,
      next: next,
    };
  };

  const nextCountry = () => {
    return "";
  };
  const prevCountry = () => {
    return "";
  };

  const isFiltered =
    state.searchKeyword.trim() !== "" ||
    filters.continents.length ||
    filters.region.length ||
    filters.subregion.length;

  return {
    state,
    action,
    getters: {
      list: {
        filteredList: searchedList,
        filterProps: {
          getContinentList: continentList,
          getRegionList: regionList,
          getSubregionList: subregionList,
          getBorderingCountryList: borderingCountryList,
          getSubregionCountryList: mutualSubregionCountryList,
        },
        groupedList: groupedList,
        noResultFound: searchedList().length === 0,
        noData: list.length === 0,
      },
      isFiltered: isFiltered,
      paging: {
        details: pagingDetailsPrevNext,
      },
    },
  };
};
