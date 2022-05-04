import { Country } from "../data/models/Country";
import {
  GITHUB_GEO_COUNTRY_BASE_URL,
  REST_COUNTRIES_BASE_URL,
} from "../helpers/Constants";
import { apiFetch } from "../helpers/Fetchers";
import { toCountry } from "./../helpers/Casters";

export const apiGetCountryList = async (): Promise<Country[]> => {
  try {
    const data = await apiFetch<any[]>(`${REST_COUNTRIES_BASE_URL}/all`).then(
      (data) =>
        Array.from(data).map((rawCountryItem) => toCountry(rawCountryItem)),
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCountry = async (cca2: string): Promise<string> => {
  try {
    const data = await apiFetch<string>(
      // This endpoint returns an array now
      `https://restcountries.com/v3.1/alpha/${cca2}`,
    ).then((data) => {
      // console.log(data[0].name.nativeName);
      return data;
    });
    return data;
  } catch (error) {
    return "";
  }
};

export const apiGetBorderingCountryList = async (
  borderList: string[],
): Promise<Country[] | string> => {
  try {
    // extracting country codes to string
    // e.g = IDN,GBR,FRA
    const strBorderList = borderList.join(",");
    const data = await apiFetch<any[]>(
      `${REST_COUNTRIES_BASE_URL}/alpha?codes=${strBorderList}`,
    ).then((rawData) =>
      Array.from(rawData).map((rawCountryItem) => toCountry(rawCountryItem)),
    );
    return data;
  } catch (error) {
    console.log(error);
    return error + "";
  }
};

export const apiGetMutualSubregionCountryList = async (
  subregion: string,
): Promise<Country[] | string> => {
  try {
    const data = await apiFetch<any[]>(
      `${REST_COUNTRIES_BASE_URL}/subregion/${subregion}`,
    ).then((rawData) =>
      Array.from(rawData).map((rawCountryItem) => toCountry(rawCountryItem)),
    );
    return data;
  } catch (error) {
    // console.log(error);
    return error + "";
  }
};

export const apiGetGeoCountry = async (
  cca3: string,
): Promise<any[] | string> => {
  try {
    const data = await apiFetch<any>(
      `${GITHUB_GEO_COUNTRY_BASE_URL}/${cca3.toLowerCase()}.geo.json`,
    ).then((rawData) => JSON.parse(rawData));
    return "";
  } catch (error) {
    return error + "";
  }
};
