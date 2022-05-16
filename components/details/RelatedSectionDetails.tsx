import React from "react";
import { Country } from "../../utils/data/models/Country";
import CountryItem from "../CountryItem";
import SectionTitleDetails from "./SectionTitleDetails";

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
    <div className="flex w-full flex-col sm:px-8">
      <SectionTitleDetails title={title} />
      <div
        className="grid grid-cols-2 items-center justify-items-center gap-4 self-stretch
        sm:rounded-lg !rounded-tl-none bg-base-300/50 p-4 transition-all 
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
