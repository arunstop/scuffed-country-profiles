import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { useCountryContext } from "../../../utils/contexts/country/CountryHook";
import { MainSectionFilterChip } from "./MainSectionFilterChip";

function MainSectionFilter() {
  const {
    state: countryState,
    action: countryAction,
    getters: {
      list: {
        filteredList,
        filterProps: { continentList, regionList, subregionList },
      },
      list,
    },
  } = useCountryContext();
  // console.log(filterProps.filterProps.continentList);
  return (
    <div className="flex flex-wrap gap-4 p-8">
      <div className="grid gap-4 w-full sm:w-fit">
        <label>Search :</label>
        <div className="form-control w-full sm:w-96">
          <label className="input-group-lg input-group max-w-lg">
            <span className="">
              <SearchIcon className="h-8 w-8 text-lg" />
            </span>
            <input
              className="input-bordered input w-full"
              value={countryState.searchKeyword}
              type="search"
              placeholder="Search…"
              onChange={(e) => {
                countryAction.setSearchKeyword(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
      <div className="grid gap-4 w-full sm:w-fit">
        <label>By Continent :</label>
        <div className="flex w-full flex-wrap gap-2">
          {continentList.map((item, idx) => (
            <MainSectionFilterChip key={idx} selected={false} text={item} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 w-full sm:w-fit">
        <label>By Region :</label>
        <div className="flex w-full flex-wrap gap-2">
          {regionList.map((item, idx) => (
            <MainSectionFilterChip key={idx} selected={false} text={item} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 w-full sm:w-fit">
        <label>By Subregion :</label>
        <div className="flex w-full flex-wrap gap-2">
          {subregionList.map((item, idx) => (
            <MainSectionFilterChip key={idx} selected={false} text={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainSectionFilter;
