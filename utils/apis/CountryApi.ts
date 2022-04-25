import { toCountry } from "./../helpers/Casters";
import { Country } from "../data/models/Country";
import { apiFetch } from "../helpers/Fetchers";
import { REST_COUNTRIES_BASE_URL } from "../helpers/Constants";

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
): Promise<Country[]> => {
  try {
    // extracting country codes to string
    // e.g = IDN,GBR,FRA
    const strBorderList = borderList.join(",");
    const data = await apiFetch<any[]>(
      `${REST_COUNTRIES_BASE_URL}/alpha?codes=${strBorderList}`,
    ).then((data) =>
      Array.from(data).map((rawCountryItem) => toCountry(rawCountryItem)),
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const apiGetMutualSubregionCountryList = async (
  subregion: string,
): Promise<Country[]> => {
  try {
    const data = await apiFetch<any[]>(
      `${REST_COUNTRIES_BASE_URL}/subregion/${subregion}`,
    ).then((data) =>
      Array.from(data).map((rawCountryItem) => toCountry(rawCountryItem)),
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
