import {
  FaHamburger,
  FaSortAmountDown,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import React from "react";
import { useCountryContext } from "../../../utils/contexts/country/CountryHook";
import MainSectionFilterChip from "./MainSectionFilterChip";
import { SortingOrder } from "../../../utils/data/types/CountryTypes";
import { MdOutlineSearch } from "react-icons/md";
import { useUiContext } from "../../../utils/contexts/ui/UiHook";

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

  const {
    state: { listView },
    action: uiAction,
  } = useUiContext();
  // console.log(filterProps.filterProps.continentList);

  const RENDER_SEARCHBAR = () => (
    <div className="grid w-full gap-4 sm:w-fit">
      <label className="flex h-8 items-center">Search :</label>
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
  );

  const RENDER_FILTER = ({
    label,
    list,
    key,
    clearable,
  }: RenderFilterProps) => {
    return (
      <div className="grid w-full gap-4 sm:w-fit">
        <div className="flex items-center gap-2">
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

  const RENDER_SORTING = () => (
    <div className="grid w-full gap-4 sm:w-fit">
      <label className="flex h-8 items-center">
        Sort by :{/* {sorting.indicator} - {sorting.order} */}
      </label>
      <div className="form-control w-full sm:w-96">
        <div className="input-group-lg input-group max-w-lg transition">
          <label
            className="swap btn swap-rotate border-0 bg-base-300 text-base-content 
            transition  hover:text-base-100 dark:hover:hover:text-inherit"
          >
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
              className="swap-on !rounded-none text-xl"
              title="Ascending"
            />
            {/* desc */}
            <FaSortAmountDown
              className="swap-off !rounded-none text-xl"
              title="Descending"
            />
          </label>
          <select
            className="select-bordered select"
            onChange={(e) => {
              countryAction.setSorting(e.target.value, sorting.order);
            }}
          >
            {sorting.list.map((sortingItem, idx) => (
              <option key={idx} value={sortingItem.id}>
                {sortingItem.label} — {(sorting.order + "ending").toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 p-8">
      {RENDER_SEARCHBAR()}
      {RENDER_FILTER({
        label: "By Continents :",
        list: continentList,
        clearable: filters["continents"].length !== 0,
        key: "continents",
      })}
      {RENDER_FILTER({
        label: "By Region :",
        list: regionList,
        clearable: filters["region"].length !== 0,
        key: "region",
      })}
      {RENDER_FILTER({
        label: "By Subregion :",
        list: subregionList,
        clearable: filters["subregion"].length !== 0,
        key: "subregion",
      })}
      {RENDER_SORTING()}
      <div className="grid w-full gap-4 sm:w-fit">
        <label className="flex h-8 items-center">
          View : {listView.selected}
        </label>
        <div className="form-control w-full sm:w-72">
          <div className="dropdown">
            <label className="btn inline-flex gap-2 capitalize" tabIndex={0}>
              <FaHamburger className="text-xl" />
              {listView.selected.toLowerCase()}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 rounded-lg bg-base-100 
              p-2 shadow !ring-2 !ring-base-content !ring-opacity-30"
            >
              {listView.typeList.map((viewType, idx) => (
                <li
                  className=""
                  key={idx}
                  onClick={(e) => {
                    uiAction.setListView(viewType);
                    (document.activeElement as HTMLElement).blur();
                  }}
                >
                  <a className="capitalize">
                    <FaHamburger className="text-xl" />
                    {viewType.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSectionFilter;
