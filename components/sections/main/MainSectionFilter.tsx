import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { useCountryContext } from "../../../utils/contexts/country/CountryHook";
import MainSectionFilterChip from "./MainSectionFilterChip";

interface RenderFilterProps {
  label: string;
  list: string[];
  key: string;
  clearable: boolean;
}

function MainSectionFilter() {
  const {
    state: countryState,
    state: { filters },
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

  const renderFilter = ({ label, list, key, clearable }: RenderFilterProps) => {
    return (
      <div className="grid gap-4 w-full sm:w-fit">
        <div className="flex gap-2 items-center">
          {label}
          <button
            className={`btn btn-outline btn-error btn-sm rounded-full
            ${clearable ? "visible" : "invisible"}`}
            onClick={() => countryAction.clearFilter(key)}
          >
            Clear
          </button>
        </div>
        <div className="flex w-full flex-wrap gap-2">
          {list.map((item, idx) => (
            <MainSectionFilterChip
              key={idx}
              text={item}
              checked={(filters as any)[key].includes(item)}
              onClick={(status) => {
                countryAction.setFilter({
                  key: key,
                  value: item,
                  add: status,
                });
              }}
            />
          ))}
        </div>
      </div>
    );
  };

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
      {renderFilter({
        label: "By Continents :",
        list: continentList,
        clearable: filters["continents"].length !== 0,
        key: "continents",
      })}
      {renderFilter({
        label: "By Region :",
        list: regionList,
        clearable: filters["region"].length !== 0,
        key: "region",
      })}
      {renderFilter({
        label: "By Subregion :",
        list: subregionList,
        clearable: filters["subregion"].length !== 0,
        key: "subregion",
      })}
    </div>
  );
}

export default MainSectionFilter;
