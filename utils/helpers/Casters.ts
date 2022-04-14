import { Country } from "./../data/models/Country.d";
import {
  // Country,
  Translation,
  Language,
  Currency,
} from "../../utils/data/models/Country";

export const toTranslationList = (o: any): Translation[] => {
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

export const toLanguageList = (o: any): Language[] => {
  // console.log("test");
  // console.log(Object.keys(o));
  const result: Language[] = Object.keys(o).map((e) => {
    return {
      code: e,
      name: o[e],
    } as Language;
  });
  return result;
};

export const toCurrencyList = (o: any): Currency[] => {
  const result: Currency[] = Object.keys(o).map(
    (e) =>
      ({
        code: e,
        name: o[e].name,
        symbol: o[e].symbol || "",
      } as Currency),
  );
  return result;
};

export const toCountry = (objRaw: any): Country => {
  return {
    ...objRaw,
    name: {
      ...objRaw?.name,
      nativeName: toTranslationList(objRaw?.name.nativeName || {}),
    },
    languages: toLanguageList(objRaw?.languages || {}),
    translations: toTranslationList(objRaw?.translations || {}),
    currencies: toCurrencyList(objRaw?.currencies || {}),
  } as unknown as Country;
};
