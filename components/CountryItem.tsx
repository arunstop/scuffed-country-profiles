import Link from "next/link";
import React from "react";
import { Country } from "../utils/data/models/Country";

function CountryItem({ country }: { country: Country }) {
  return (
    <Link href={`/country/${country.cca2}`} passHref>
      <a>
        <div className={`card text-center rounded-none group overflow-visible`}>
          {/* <div
    className="bg-cover bg-no-repeat bg-center h-30 w-18"
    style={{
      backgroundImage: imgUrl,
    }}
  ></div> */}
          <img
            className="mb-1 rounded-lg  shadow-sm ring-2 ring-slate-600/20 transition-all 
    "
            src={country.flags.png}
            alt={country.name.common}
          />
          <div className="my-auto">{country.name.common}</div>
        </div>
      </a>
    </Link>
  );
}

export default CountryItem;
