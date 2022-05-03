import Link from "next/link";
import React from "react";
import { MdLandscape, MdPeople, MdPlace, MdTranslate } from "react-icons/md";
import { SiGooglemaps, SiOpenstreetmap } from "react-icons/si";
import { Country } from "../../utils/data/models/Country";

function ListCountryItem({ country }: { country: Country }) {
  return (
    <Link href={`/country/${country.cca2}/`}>
      <a
        className="group relative flex min-w-[300px] grow 
        flex-col gap-4 overflow-hidden border-base-content/40 
        bg-base-300 p-4 ring-2 ring-transparent transition-all 
        first:rounded-t-lg last:rounded-b-lg
        hover:z-[1] hover:scale-[1.01] hover:rounded-lg
        hover:!border-none hover:shadow-lg hover:ring-base-content/40
      "
      >
        <img
          className="absolute inset-0 h-full rounded-r-3xl
          opacity-40  blur-lg transition-all group-hover:scale-150"
          src={country.flags.svg}
          alt={country.name.common}
        />
        <div className="z-0 flex gap-4">
          <div className="flex flex-col gap-2">
            <div
              className="mt-1 overflow-hidden rounded-lg transition-transform
              group-hover:mx-auto group-hover:-translate-y-1 
              group-hover:shadow-lg"
            >
              <img
                className="avatar max-w-[120px] transition-transform 
                duration-500 group-hover:z-10 group-hover:scale-150 sm:max-w-[240px]
                h-full w-full"
                src={country.flags.svg}
                alt={country.name.common}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{country.name.common || "-"}</h1>
            <div className="mb-1 font-normal">
              {country.name.official || "-"}
            </div>
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
        <div className="z-0">
          <div className="flex flex-wrap justify-end sm:gap-2">
            <a
              className="hover:bg-content-base btn-outline btn 
              grow gap-2 rounded-none
              rounded-t-lg border-b-0 normal-case 
              sm:grow-0 sm:rounded-lg sm:border-b-[1px]"
              href={country.maps.googleMaps}
              target="_blank"
              rel="noreferrer"
              title="Open in Google Maps"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              <SiGooglemaps className="pointer-events-none text-2xl" />
              <span>Open in Google Maps</span>
            </a>
            <a
              className="hover:bg-content-base btn-outline btn 
              grow gap-2
              rounded-none rounded-b-lg normal-case 
              sm:grow-0 sm:rounded-lg"
              href={country.maps.openStreetMaps}
              target="_blank"
              rel="noreferrer"
              title="Open in Open Street Maps"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              <SiOpenstreetmap className="pointer-events-none text-2xl" />
              <span>Open in Open Street Maps</span>
            </a>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default ListCountryItem;
