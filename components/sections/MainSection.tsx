import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";
import { Country } from "../../utils/data/models/Country";
// import countryListRaw from "../../public/CountryProfileList.json";
import CountryItem from "../CountryItem";

export default function MainSection({
  countryList,
}: {
  countryList: Country[];
}) {
  const {
    state,
    action,
    getters: { sortedList },
  } = useCountryContext();

  console.log(countryList);

  useEffect(() => {
    if (state.list.length === 0) {
      action.setCountryList(countryList);
    }

    // return () => {
    //   second
    // }
  }, []);

  return (
    <section
      id="countries"
      className="flex w-full flex-col items-center justify-center pt-16"
    >
      <div className="form-control">
        <label className="input-group input-group-lg">
          <span className="">
            <SearchIcon className="text-lg h-8 w-8" />
          </span>
          <input
            type="text"
            placeholder="Search…"
            className="input-bordered input"
          />
        </label>
      </div>
      <div className="grid grid-cols-2 items-center gap-4 self-stretch p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {sortedList.map((country) => {
          return <CountryItem key={country.cca2} country={country} />;
        })}
      </div>
    </section>
  );
}
