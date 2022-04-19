import Link from "next/link";
import React from "react";
import { MdLandscape, MdPeople, MdPlace, MdTranslate } from "react-icons/md";
import { Country } from "../../utils/data/models/Country";

function CountryItemList({ country }: { country: Country }) {
  return (
    <Link href={`/country/${country.cca2}`}>
      <a>
        <div
          className="group flex min-w-[300px] grow 
      gap-4 overflow-hidden rounded-lg bg-base-300 p-4 
      ring-2 ring-transparent transition-all hover:-translate-y-1 hover:scale-[1.02] 
      hover:bg-base-content/10 hover:shadow-lg hover:ring-base-content/40"
          role={"button"}
        >
          <div className="flex flex-col gap-2">
            <div
              className="mt-1 overflow-hidden rounded-lg transition-transform
          group-hover:mx-auto group-hover:-translate-y-1 
          group-hover:scale-[0.92] group-hover:shadow-lg"
            >
              <img
                className="avatar max-w-[120px] 
            transition-transform duration-500 group-hover:scale-150"
                src={country.flags.png}
                alt={country.name.common}
              />
            </div>
            <div className="flex items-stretch gap-2">
              <a
                className="btn-outline btn btn-sm grow"
                href={"/#countries"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                XX
              </a>
              <a
                className="btn-outline btn btn-sm grow"
                href={"/#countries"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                YY
              </a>
            </div>
          </div>
          <div className="flex flex-col max-w-[300px]">
            <h1 className="text-2xl font-medium">
              {country.name.common || "-"}
            </h1>
            <div className="mb-1">{country.name.official || "-"}</div>
            <div className="flex gap-1">
              <MdPlace className="mt-1" />
              {country.capital?.join(", ") || "-"}
            </div>
            <div className="flex gap-1">
              <MdTranslate className="mt-1" />

              <div className="flex-1">
                {country.languages.map((e) => e.name).join(", ") || "-"}
              </div>
            </div>
            <div className="inline-flex flex-wrap items-center gap-1">
              <MdPeople /> {country.population.toLocaleString() || "-"}
            </div>
            <div className="inline-flex flex-wrap items-center gap-1">
              <MdLandscape /> {country.area.toLocaleString() + " km^2" || "-"}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default CountryItemList;
