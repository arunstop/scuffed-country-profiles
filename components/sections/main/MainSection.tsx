import React from "react";
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
      },
      list,
    },
  } = useCountryContext();

  // console.log(countryList);

  // useEffect(() => {
  //   if (countryState.list.length === 0) {
  //     countryAction.setCountryList(countryList);
  //   }

  //   // return () => {
  //   //   second
  //   // }
  // }, []);

  function renderCountryList(countryList: Country[]) {
    if (list.noData) {
      return (
        <div className="col-span-full">
          <NoDataPlaceHolder message="No data." />
        </div>
      );
    } else if (list.noResultFound) {
      return (
        <div className="col-span-full">
          <NoDataPlaceHolder message="No results were found." />
        </div>
      );
    }

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

  function renderGroupedCountryList(countryList: Country[]) {
    if (viewType.selected === "LIST") {
      return (
        <div className="flex w-full flex-col divide-y-2 transition-all">
          {renderCountryList(countryList)}
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
          {renderCountryList(countryList)}
        </div>
      );
    }
    // TILES
    else {
      return (
        <div className="flex flex-wrap items-stretch justify-around gap-4">
          {renderCountryList(countryList)}
        </div>
      );
    }
  }

  const RENDER_GROUPING = () => (
    <div className="flex w-full flex-col items-stretch justify-items-stretch gap-4">
      <div className="flex flex-wrap bg-red-500 ">
        {getRegionList().map((region, idx) => (
          <a
            className="btn font-normal normal-case"
            key={idx}
            onClick={(e) => {
              // const element = e.currentTarget.classList;
              // if (element.contains("")) {
              //   element.remove("");
              //   return;
              // }
              // element.add("");
            }}
          >
            {region}
          </a>
        ))}
      </div>
    </div>
  );

  function RENDER_CONTENT() {
    const grouped = true;
    if (grouped === true) {
      return list.groupedList("region").map((groupedItem, idx) => {
        return (
          <div
            key={idx}
            className="collapse w-full border-2 border-base-content/10 bg-base-content/10"
            tabIndex={0}
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title py-4 px-8 bg-base-content/30 text-2xl ">
              {groupedItem.id}
            </div>
            <div
              className="collapse-content opacity-0 transition-all 
            peer-checked:p-4 peer-checked:opacity-100 sm:peer-checked:p-8
            "
            >
              {renderGroupedCountryList(groupedItem.list)}
            </div>
          </div>
        );
      });
    }

    return renderGroupedCountryList(filteredList());
  }

  return (
    <section
      id="countries"
      className="flex min-h-screen w-full flex-col items-center gap-8 p-8 sm:p-16"
    >
      {noData ? (
        <div className="mt-20 flex flex-col items-center gap-4">
          <CircularProgress size={7} />
          <h2 className="text-2xl">Loading countries...</h2>
        </div>
      ) : (
        <>
          <MainSectionFilter />
          {RENDER_GROUPING()}
          <div className="self-start text-2xl">
            Showing <b className="font-bold">{filteredList().length}</b>{" "}
            {filteredList().length > 1 ? "countries" : "country"}
          </div>
          <div className="flex flex-col overflow-hidden rounded-lg w-full">
            {RENDER_CONTENT()}
          </div>
        </>
      )}
    </section>
  );
}
