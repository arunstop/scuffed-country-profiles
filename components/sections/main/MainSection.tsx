import React from "react";
import { useCountryContext } from "../../../utils/contexts/country/CountryHook";
import { useUiContext } from "../../../utils/contexts/ui/UiHook";
import CircularProgress from "../../CircularProgress";
// import countryListRaw from "../../public/CountryProfileList.json";
import CountryItem from "../../CountryItem";
import CountryItemList from "../../country_items/CountryItemList";
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
      list: { filteredList, noData },
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

  function renderCountryList() {
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
    return filteredList.map((country) => {
      // LIST
      if (viewType.selected === "LIST") {
        return <CountryItemList key={country.cca2} country={country} />;
      }
      // CARDS
      else if (viewType.selected === "CARDS") {
        return <CountryItem key={country.cca2} country={country} />;
      }
      // TILES
      else {
        return <CountryItem key={country.cca2} country={country} />;
      }
    });
  }

  function RENDER_VIEW_TEMPLATE() {
    // LIST
    if (viewType.selected === "LIST") {
      return (
        <div className="flex flex-wrap gap-4 p-8 items-stretch justify-around">
          {renderCountryList()}
        </div>
      );
    }
    // CARDS
    else if (viewType.selected === "CARDS") {
      return (
        <div
          className="grid grid-cols-2 items-center justify-items-center gap-4 self-stretch
          p-8 transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8"
        >
          {renderCountryList()}
        </div>
      );
    }
    // TILES
    else {
      return (
        <div
          className="grid grid-cols-2 items-center justify-items-center gap-4 self-stretch
          p-8 transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8"
        >
          {renderCountryList()}
        </div>
      );
    }
  }

  return (
    <section
      id="countries"
      className="flex min-h-screen w-full flex-col items-center pt-16"
    >
      {noData ? (
        <div className="flex flex-col items-center gap-4 mt-20">
          <CircularProgress size={7} />
          <h2 className="text-2xl">Loading countries...</h2>
        </div>
      ) : (
        <>
          <MainSectionFilter />
          {RENDER_VIEW_TEMPLATE()}
        </>
      )}
    </section>
  );
}
