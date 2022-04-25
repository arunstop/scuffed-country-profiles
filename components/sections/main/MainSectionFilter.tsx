import {
  // FaHamburger,
  FaSortAmountDown,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import React from "react";
import { useCountryContext } from "../../../utils/contexts/country/CountryHook";
import MainSectionFilterChip from "./MainSectionFilterChip";
import { SortingOrder } from "../../../utils/data/types/CountryTypes";
import { MdClose, MdOutlineSearch } from "react-icons/md";
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
        filterProps: {
          getContinentList: continentList,
          getRegionList: regionList,
          getSubregionList: subregionList,
        },
      },
      list,
    },
  } = useCountryContext();

  const {
    state: { viewType, filtersOn },
    action: uiAction,
  } = useUiContext();
  // console.log(filterProps.filterProps.continentList);

  const RENDER_SEARCHBAR = () => (
    <div className="grid w-full gap-4 sm:w-fit">
      <label className="flex h-8 items-center">Search :</label>
      <div className="form-control w-full sm:w-96">
        <label className="input-group-lg input-group max-w-lg relative">
          <span className="">
            <MdOutlineSearch className="text-2xl" />
          </span>
          <label
            className={`btn !btn-circle !btn-sm my-auto mx-2 
            absolute inset-y-0 right-0 btn-error btn-outline bg-opacity-60
            ${countryState.searchKeyword.length ? "visiblae" : "hidden"}`}
            onClick={() => {
              countryAction.setSearchKeyword("");
            }}
          >
            <MdClose className="text-2xl" />
          </label>
          <input
            className="input-bordered input w-full pr-12"
            value={countryState.searchKeyword}
            type="text"
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

  const RENDER_CONTINENTS = () =>
    RENDER_FILTER({
      label: "By Continents :",
      list: continentList(),
      clearable: filters["continents"].length !== 0,
      key: "continents",
    });
  const RENDER_REGION = () =>
    RENDER_FILTER({
      label: "By Region :",
      list: regionList(),
      clearable: filters["region"].length !== 0,
      key: "region",
    });
  const RENDER_SUBREGION = () =>
    RENDER_FILTER({
      label: "By Subregion :",
      list: subregionList(),
      clearable: filters["subregion"].length !== 0,
      key: "subregion",
    });

  const RENDER_SORTING = () => (
    <div className="grid w-full gap-4 sm:w-fit">
      <label className="flex h-8 items-center">
        Sort by :{/* {sorting.indicator} - {sorting.order} */}
      </label>
      <div className="form-control w-full sm:w-96">
        <div className="input-group-lg input-group w-full transition">
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
            className="select-bordered select grow"
            value={sorting.indicator}
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

  const RENDER_VIEW_TYPE = () => {
    return (
      <div className="grid w-full gap-4 sm:w-fit">
        <label className="flex h-8 items-center">View :</label>
        <div className="form-control w-full sm:w-72">
          <div className="dropdown">
            <label
              className="btn btn-ghost btn-active inline-flex gap-2 border-[3px] capitalize hover:border-base-content"
              tabIndex={0}
            >
              <span className="text-xl">
                {viewType.list.find((e) => e.type === viewType.selected)?.icon}
              </span>
              {viewType.selected.toLowerCase()}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu w-52 rounded-lg bg-base-100
              p-2 shadow !ring-2 !ring-base-content !ring-opacity-30"
            >
              {viewType.list.map((viewType, idx) => (
                <li
                  className=""
                  key={idx}
                  onClick={(e) => {
                    uiAction.setListView(viewType.type);
                    (document.activeElement as HTMLElement).blur();
                  }}
                >
                  <a className="capitalize">
                    <span className="text-xl">{viewType.icon}</span>
                    {viewType.type.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const RENDER_FILTER_BUTTON = () => {
    return (
      <button
        className={`btn btn-outline normal-case mt-auto 
        ${filtersOn ? "btn-error" : ""}`}
        onClick={() => {
          uiAction.toggleFilters(!filtersOn);
        }}
      >
        {filtersOn ? "Hide" : "Show"} Filters
      </button>
    );
  };

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {RENDER_SEARCHBAR()}
      {filtersOn && (
        <>
          {RENDER_CONTINENTS()}
          {RENDER_REGION()}
          {RENDER_SUBREGION()}
        </>
      )}
      {RENDER_FILTER_BUTTON()}
      <div className="w-full"></div>
      {RENDER_SORTING()}
      {RENDER_VIEW_TYPE()}
    </div>
  );
}

export default MainSectionFilter;
