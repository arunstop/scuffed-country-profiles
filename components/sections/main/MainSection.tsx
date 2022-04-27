import React, { useState } from "react";
import { MdCloseFullscreen, MdOpenInFull } from "react-icons/md";
import { useCountryContext } from "../../../utils/contexts/country/CountryHook";
import { useUiContext } from "../../../utils/contexts/ui/UiHook";
import { Country } from "../../../utils/data/models/Country";
import CircularProgress from "../../CircularProgress";
// import countryListRaw from "../../public/CountryProfileList.json";
import CountryItem from "../../CountryItem";
import ListCountryItem from "../../country_items/ListCountryItem";
import TileCountryItem from "../../country_items/TileCountryItem";
import NoDataPlaceHolder from "../../placholders/NoDataPlaceHolder";
import MainSectionFilter from "./MainSectionFilter";
// import MainSectionFilter from "../../MainSectionFilter";

export default function MainSection() {
  const {
    state: { viewType },
  } = useUiContext();
  const {
    state: countryState,
    action: countryAction,
    getters: {
      list: {
        filteredList,
        filterProps: { getRegionList },
        noData,
        noResultFound,
      },
      list,
    },
  } = useCountryContext();

  const [activeGroupList, setActiveGroupList] = useState<string[]>([]);

  const groupedList = list.groupedList(countryState.grouping.active);

  function removeActiveGroupList(id: string) {
    // set active group list by updating the current list
    // by removing the selected item
    setActiveGroupList([
      ...activeGroupList.filter((activeGroupItem) => activeGroupItem !== id),
    ]);
  }

  function addActiveGroupList(id: string) {
    setActiveGroupList([...activeGroupList, id]);
  }

  function expandAllActiveGroupList() {
    setActiveGroupList(groupedList.map((e) => e.id));
  }
  function collapseAllActiveGroupList() {
    setActiveGroupList([]);
  }

  // console.log(countryList);

  // useEffect(() => {
  //   if (countryState.list.length === 0) {
  //     countryAction.setCountryList(countryList);
  //   }

  //   // return () => {
  //   //   second
  //   // }
  // }, []);

  function RENDER_EXPAND_COLLAPSE_BUTTON() {
    return (
      <>
        {/* Expand All */}
        <label className="swap">
          <input
            type={"checkbox"}
            checked={
              groupedList.length !== activeGroupList.length &&
              activeGroupList.length < 2
            }
            onChange={(e) => {
              console.log(e.target.checked);
              if (e.target.checked === false) {
                expandAllActiveGroupList();
                console.log(activeGroupList);
                return;
              }
              collapseAllActiveGroupList();
            }}
          />
          <div className="text-md btn swap-on btn-sm ml-auto gap-2 font-normal normal-case ">
            <MdOpenInFull className="text-xl" />
            <span role={"button"}>Expand All</span>
          </div>
          <div className="text-md btn swap-off btn-sm ml-auto gap-2 font-normal normal-case ">
            <MdCloseFullscreen className="text-xl" />
            <span role={"button"}>Collapse All</span>
          </div>
        </label>
      </>
    );
  }

  function RENDER_COUNTRY_LIST(countryList: Country[]) {
    return countryList.map((country) => {
      // LIST
      if (viewType.selected === "LIST") {
        return <ListCountryItem key={country.cca2} country={country} />;
      }
      // CARDS
      else if (viewType.selected === "CARDS") {
        return <CountryItem key={country.cca2} country={country} />;
      }
      // TILES
      else {
        return <TileCountryItem key={country.cca2} country={country} />;
      }
    });
  }

  function RENDER_COUNTRY_LIST_CONTAINER(countryList: Country[]) {
    if (list.noData) {
      return (
        <div className="">
          <NoDataPlaceHolder message="No data." />
        </div>
      );
    } else if (list.noResultFound) {
      return (
        <div className="">
          <NoDataPlaceHolder message="No results were found." />
        </div>
      );
    }
    if (viewType.selected === "LIST") {
      return (
        <div className="flex w-full flex-col divide-y-2 transition-all">
          {RENDER_COUNTRY_LIST(countryList)}
        </div>
      );
    }
    // CARDS
    else if (viewType.selected === "CARDS") {
      return (
        <div
          className="grid grid-cols-2 items-center justify-items-center gap-4 self-stretch
          transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8"
        >
          {RENDER_COUNTRY_LIST(countryList)}
        </div>
      );
    }
    // TILES
    else {
      return (
        <div className="flex flex-wrap items-stretch justify-around gap-4">
          {RENDER_COUNTRY_LIST(countryList)}
        </div>
      );
    }
  }

  function RENDER_GROUPED_COUNTRY_LIST_CONTAINER(countryList: Country[]) {
    return RENDER_COUNTRY_LIST_CONTAINER(countryList);
  }

  function RENDER_CONTENT() {
    if (countryState.grouping.active !== "none" && !noResultFound) {
      return groupedList.map((groupedItem, idx) => {
        const countryCount = groupedItem.list.length;
        const expanded = activeGroupList.includes(groupedItem.id);
        return (
          <div
            key={idx}
            className="collapse w-full border-base-content/30 bg-transparent 
            first:rounded-t-lg last:rounded-b-lg !overflow-visible"
          >
            <input
              type="checkbox"
              checked={expanded}
              className="peer !p-0"
              onChange={(e) => {
                if (e.target.checked === false) {
                  removeActiveGroupList(groupedItem.id);
                  return;
                }
                addActiveGroupList(groupedItem.id);
              }}
            />
            {/* COLLAPSE/EXPAND */}
            <div
              className={`collapse-title  pointer-events-none bg-base-content/10
              flex justify-between py-4 px-8 text-2xl
              peer-checked:bg-base-content/20 peer-hover:bg-base-content/30
              peer-checked:!rounded-lg w-auto peer-checked:shadow-lg 
              peer-checked:scale-[1.01] peer-checked:translate-y-[-0.1rem]
              border-2 border-transparent peer-checked:border-base-content/30
              transition-all
              ${idx === 0 ? "rounded-t-lg" : ""}
              ${idx + 1 === groupedList.length ? "rounded-b-lg" : ""}
              `}
            >
              <p>
                <span className="font-bold">{`${groupedItem.id} - `}</span>
                <span className="text-lg">{`${countryCount} ${
                  countryCount < 2 ? "Country" : "Countries"
                }`}</span>
              </p>
              {/* Arrow DOWN */}
              <span className="opacity-60">
                {expanded ? <> &#x25BC;</> : <>&#x25B2;</>}
              </span>
            </div>
            <div
              className="collapse-content  peer-checked:!overflow-visible 
              !border-t-0 border-base-content/30 
              opacity-0 transition-all peer-checked:!max-h-fit
              peer-checked:opacity-100 !p-0 peer-checked:!py-8"
            >
              {RENDER_GROUPED_COUNTRY_LIST_CONTAINER(groupedItem.list)}
            </div>
          </div>
        );
      });
    }

    return RENDER_COUNTRY_LIST_CONTAINER(filteredList());
  }

  return (
    <section
      id="countries"
      className="flex min-h-screen w-full flex-col items-center gap-8 py-8 sm:py-16"
    >
      {noData ? (
        <div className="mt-20 flex flex-col items-center gap-4 px-4 sm:px-8">
          <CircularProgress size={7} />
          <h2 className="text-2xl">Loading countries...</h2>
        </div>
      ) : (
        <>
          <MainSectionFilter />
          {/* {RENDER_GROUPING()} */}
          <div className="flex w-full flex-wrap items-center justify-between gap-4 self-start px-4 sm:px-8">
            <p className="text-2xl">
              Showing <b className="font-bold">{filteredList().length}</b>{" "}
              {filteredList().length > 1 ? "countries" : "country"}
            </p>
            {countryState.grouping.active !== "none" &&
              RENDER_EXPAND_COLLAPSE_BUTTON()}
          </div>

          <div className="flex w-full flex-col divide-y-2 px-4 sm:px-8">
            {RENDER_CONTENT()}
          </div>
        </>
      )}
    </section>
  );
}
