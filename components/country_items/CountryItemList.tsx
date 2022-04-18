import React from "react";
import { MdLandscape, MdPeople, MdPlace, MdTranslate } from "react-icons/md";
import { Country } from "../../utils/data/models/Country";

function CountryItemList({ country }: { country: Country }) {
  return (
    <div
      className="flex min-w-[300px] gap-4 overflow-hidden 
      rounded-lg bg-base-300 p-4 hover:shadow-lg hover:-translate-y-1 
      transition-all grow group hover:bg-base-content/40 hover:scale-[1.02] 
      ring-2 ring-transparent hover:ring-base-content/70"
      role={"button"}
    >
      <div className="flex flex-col gap-2">
        <div
          className="overflow-hidden rounded-lg group-hover:shadow-lg mt-1
          group-hover:-translate-y-1 transition-transform 
            group-hover:scale-[0.92] group-hover:mx-auto"
        >
          <img
            className="avatar max-w-[120px] 
            group-hover:scale-150 transition-transform duration-500"
            src={country.flags.png}
            alt={country.name.common}
          />
        </div>
        <div className="flex items-stretch gap-2">
          <button className="btn btn-outline btn-sm grow">XX</button>
          <button className="btn btn-outline btn-sm grow">YY</button>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-medium">{country.name.common || "-"}</h1>
        <div className="mb-1">{country.name.official || "-"}</div>
        <div className="inline-flex items-center gap-1">
          <MdPlace /> {country.capital || "-"}
        </div>
        <div className="inline-flex items-center gap-1">
          <MdTranslate />{" "}
          {country.languages.map((e) => e.name).join(", ") || "-"}
        </div>
        <div className="inline-flex items-center gap-1">
          <MdPeople /> {country.population.toLocaleString() || "-"}
        </div>
        <div className="inline-flex items-center gap-1">
          <MdLandscape /> {country.area.toLocaleString() + " km^2" || "-"}
        </div>
      </div>
    </div>
  );
}

export default CountryItemList;
