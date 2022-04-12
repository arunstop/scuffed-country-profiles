import React from "react";
import countryListRaw from "../../public/CountryProfileList.json";
import {
  Country,
  Translation,
  Language,
  Currency,
  // Currency
} from "../../utils/data/models/Country";

import _ from "lodash";

export default function MainSection() {
  // const countryListRaw: any[] = [];
  const toTranslationList = (o: any): Translation[] => {
    const result: Translation[] = Object.keys(o).map(
      (e) =>
        ({
          code: e,
          official: o[e].official,
          common: o[e].common,
        } as Translation),
    );
    return result;
  };

  const toLanguageList = (o: any): Language[] => {
    const result: Language[] = Object.keys(o).map(
      (e) =>
        ({
          code: e,
          name: o[e],
        } as Language),
    );
    return result;
  };

  const toCurrencyList = (o: any): Currency[] => {
    const result: Currency[] = Object.keys(o).map(
      (e) =>
        ({
          code: e,
          name: o[e].name,
          symbol: o[e].symbol,
        } as Currency),
    );
    return result;
  };

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
          return (
            <div
              key={e.cca2}
              className={`card text-center rounded-none group cursor-pointer overflow-visible`}
            >
              {/* <div
                className="bg-cover bg-no-repeat bg-center h-30 w-18"
                style={{
                  backgroundImage: imgUrl,
                }}
              ></div> */}
              <img
                className="mb-1 rounded-lg  shadow-sm ring-2 ring-slate-600/20 transition-all 
                group-hover:z-[2] group-hover:scale-[1.1] group-hover:shadow-lg 
                group-hover:shadow-gray-500/30 group-hover:ring-blue-600/60"
                src={e.flags.png}
                alt={e.name.common}
              />
              <div className="my-auto">{e.name.common}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
