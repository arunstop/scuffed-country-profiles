import { Country } from "../data/models/Country";
import { NetworkResponse } from "../data/types/NetworkTypes";
import {
  BASE_URL
} from "../helpers/Constants";
import { toCountry } from "./../helpers/Casters";
import { apiFetch, apiFetchNoCors } from "./../helpers/Fetchers";


// BASE_URL = next API routes
// REST_COUNTRIES_BASE_URL = rest countries api

// GETS ALL COUNTRY
export const apiGetCountryList = async (): Promise<
  NetworkResponse<Country[]>
> => {
  try {
    const response = await apiFetch(
      `${BASE_URL}/api/country/all`,
      // `${REST_COUNTRIES_BASE_URL}/all`,
    ).then((response) => response);
    return {
      ok: response.ok,
      message: response.statusText,
      status: response.status,
      data: Array.from(await response.json()).map((rawCountryItem) =>
        toCountry(rawCountryItem),
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error + "",
      status: 0,
      data: [],
    };
  }
};

// GET COUNTRY BY CCA2
export const apiGetCountry = async (
  cca2: string,
): Promise<NetworkResponse<string>> => {
  try {
    const response = await apiFetch(
      `${BASE_URL}/api/country/${cca2}`,
      // `${REST_COUNTRIES_BASE_URL}/alpha/${cca2}`,
    ).then((response) => {
      // console.log(response);
      return response;
    });
    return {
      ok: response.ok,
      message: response.statusText,
      status: response.status,
      data: JSON.stringify(await response.json()),
    };
  } catch (err) {
    // const errorResponse = err as Response;
    // console.log("++++++++++++++++" + errorResponse);
    return {
      ok: false,
      message: err + "",
      status: 0,
      data: "",
    };
  }
};

// GET LIST OF COUNTRIES BY CCA 3
// GET LIST OF BORDERING COUNTRIES
export const apiGetBorderingCountryList = async (
  borderList: string[],
): Promise<NetworkResponse<Country[]>> => {
  try {
    // extracting country codes to string
    // e.g = IDN,GBR,FRA
    const strBorderList = borderList.join(",");
    const response = await apiFetch(
      `${BASE_URL}/api/country?codes=${strBorderList}`,
      // `${REST_COUNTRIES_BASE_URL}/alpha?codes=${strBorderList}`,
    ).then((_) => _);
    return {
      ok: response.ok,
      message: response.statusText,
      status: response.status,
      data: Array.from(await response.json()).map((rawCountryItem) =>
        toCountry(rawCountryItem),
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error + "",
      status: 0,
      data: [],
    };
  }
};

export const apiGetMutualSubregionCountryList = async (
  subregion: string,
): Promise<NetworkResponse<Country[]>> => {
  try {
    const response = await apiFetch(
      `${BASE_URL}/api/country/subregion/${subregion}`,
      // `${REST_COUNTRIES_BASE_URL}/subregion/${subregion}`,
    ).then((_) => _);
    return {
      ok: response.ok,
      message: response.statusText,
      status: response.status,
      data: Array.from(await response.json()).map((rawCountryItem) =>
        toCountry(rawCountryItem),
      ),
    };
  } catch (error) {
    // console.log(error);
    return {
      ok: false,
      message: error + "",
      status: 0,
      data: [],
    };
  }
};

export const apiGetGeoCountry = async (cca3: string): Promise<any | string> => {
  try {
    const data = await apiFetchNoCors<any>(
      `${BASE_URL}/api/geo/${cca3.toUpperCase()}`,
      // `https://cors-anywhere.herokuapp.com/${GITHUB_GEO_COUNTRY_BASE_URL}/${cca3.toLowerCase()}.geo.json`,
    ).then((rawData) => {
      // console.log(rawData);
      return rawData;
    });
    return data;
  } catch (error) {
    return error + "";
  }
};
