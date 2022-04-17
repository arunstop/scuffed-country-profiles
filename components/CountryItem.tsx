import Link from "next/link";
import React from "react";
import { Country } from "../utils/data/models/Country";

function CountryItem({ country }: { country: Country }) {
  return (
    <Link href={`/country/${country.cca2}`} passHref>
      <a className="transition-transform">
        <div className={`card text-center rounded-none group overflow-visible`}>
          {/* <div
    className="bg-cover bg-no-repeat bg-center h-30 w-18"
    style={{
      backgroundImage: imgUrl,
    }}
  ></div> */}
          <img
            className="mb-1 rounded-lg  shadow-sm ring-2 ring-slate-600/20 transition-all
            group-hover:z-[2] group-hover:scale-[1.1] group-hover:shadow-lg 
            group-hover:shadow-gray-500/30 group-hover:ring-base-content"
            src={country.flags.png}
            alt={country.name.common}
          />
          <div className="my-auto group-hover:underline decoration-2">
            {country.name.common}
          </div>
        </div>
      </a>
    </Link>
  );
}

export default CountryItem;
