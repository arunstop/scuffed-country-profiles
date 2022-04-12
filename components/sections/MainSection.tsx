import React from "react";
import countryListRaw from "../../public/CountryProfileList.json";
import {
  Country,
  // Translation,
  // Language,
  // Currency,
  // Currency
} from "../../utils/data/models/Country";

import _ from "lodash";
import CountryItem from "../CountryItem";
import {
  toCurrencyList,
  toLanguageList,
  toTranslationList,
} from "../../utils/helpers/Casters";

export default function MainSection() {
  // const countryListRaw: any[] = [];

  const countryList = countryListRaw.map(
    (country) =>
      ({
        ...country,
        name: {
          ...country.name,
          nativeName: toTranslationList(country.name.nativeName || {}),
        },
        languages: toLanguageList(country.languages || {}),
        translations: toTranslationList(country.translations || {}),
        currencies: toCurrencyList(country.currencies || {}),
      } as unknown as Country),
  );

  const sortedCountryList = _.orderBy(
    countryList,
    [(e) => e.name.common],
    ["asc"],
  );

  // console.log(countryList[1].currencies);

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="grid grid-cols-2 items-center gap-4 self-stretch p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {sortedCountryList.map((e) => {
          const imgUrl = `url('${e.flags.png}')`;
          // const imgUrl = `url('https://flagcdn.com/w320/uy.png')`;
          return <CountryItem key={e.cca2} country={e} />;
        })}
      </div>
    </section>
  );
}
