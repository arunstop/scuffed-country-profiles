import React from "react";
import { Country } from "../../utils/data/models/Country";
import CountryItem from "../CountryItem";

function RelatedSectionDetails({
  title,
  country,
  list,
}: {
  title: string;
  country: Country;
  list: Country[];
}) {
  return (
    <div className="flex w-full flex-col px-8">
      <h2
        className="self-start rounded-t-lg border-b-2 border-base-content/10 bg-base-300
 p-4 text-2xl font-bold"
      >
        {title}
      </h2>
      <div
        className="grid grid-cols-2 items-center justify-items-center gap-4 self-stretch
rounded-lg rounded-tl-none bg-base-300/50 p-4 transition-all 
sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8"
      >
        {!list.length
          ? "No result found."
          : list.map((countryItem, idx) => (
              <CountryItem key={idx} country={countryItem} />
            ))}
      </div>
    </div>
  );
}

export default RelatedSectionDetails;
