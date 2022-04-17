import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import React from "react";
import { useCountryContext } from "../../../utils/contexts/country/CountryHook";
import MainSectionFilterChip from "./MainSectionFilterChip";
import { SortingOrder } from "../../../utils/data/types/CountryTypes";
import { MdOutlineSearch } from "react-icons/md";

interface RenderFilterProps {
  label: string;
  list: string[];
  key: string;
  clearable: boolean;
}

function MainSectionFilter() {
  const {
    state: countryState,
    state: { filters, sorting },
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
        <label className="flex items-center h-8">Search :</label>
        <div className="form-control w-full sm:w-96">
          <label className="input-group-lg input-group max-w-lg">
            <span className="">
              <MdOutlineSearch className="text-2xl" />
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
      <div className="grid gap-4 w-full sm:w-fit">
        <label className="flex items-center h-8">
          Sort by :{/* {sorting.indicator} - {sorting.order} */}
        </label>
        <div className="form-control w-full sm:w-96">
          <div className="input-group-lg input-group max-w-lg transition">
            <label className="btn bg-base-300 text-base-content border-0 hover:text-base-100 swap swap-rotate transition">
              <input
                checked={sorting.order === "ASC"}
                type={"checkbox"}
                onChange={(e) => {
                  // if checked is true (meaning it is currently ASC),
                  // then change the order to DESC
                  const orderBy: SortingOrder =
                    sorting.order === "ASC" ? "DESC" : "ASC";
                  countryAction.setSorting(sorting.indicator, orderBy);
                }}
              />
              {/* asc */}
              <FaSortAmountDownAlt
                className="swap-on text-xl !rounded-none"
                title="Ascending"
              />
              {/* desc */}
              <FaSortAmountDown
                className="swap-off text-xl !rounded-none"
                title="Descending"
              />
            </label>
            <select
              className="select select-bordered"
              onChange={(e) => {
                countryAction.setSorting(e.target.value, sorting.order);
              }}
            >
              {sorting.list.map((sortingItem, idx) => (
                <option key={idx} value={sortingItem.id}>
                  {sortingItem.label} —{" "}
                  {(sorting.order + "ending").toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSectionFilter;
