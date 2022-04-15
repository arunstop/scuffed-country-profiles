import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";
// import countryListRaw from "../../public/CountryProfileList.json";
import CountryItem from "../CountryItem";

export default function MainSection() {
  const {
    state: countryState,
    action: countryAction,
    getters: { searchedList },
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

  return (
    <section
      id="countries"
      className="flex w-full flex-col items-center pt-16 min-h-screen"
    >
      <div className="form-control w-full p-8 sm:p-0 sm:w-96">
        <label className="input-group input-group-lg max-w-lg">
          <span className="">
            <SearchIcon className="text-lg h-8 w-8" />
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
      <div className="grid grid-cols-2 items-center gap-4 self-stretch p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {searchedList.map((country) => {
          return <CountryItem key={country.cca2} country={country} />;
        })}
      </div>
    </section>
  );
}
