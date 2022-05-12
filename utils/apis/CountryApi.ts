import {
  CollectionReference,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore/lite";
import { Country } from "../data/models/Country";
import { NetworkResponse } from "../data/types/NetworkTypes";
import {
  BASE_URL,
  GITHUB_GEO_COUNTRY_BASE_URL,
  REST_COUNTRIES_BASE_URL,
} from "../helpers/Constants";
import { toCountry } from "./../helpers/Casters";
import { apiFetch, apiFetchNoCors } from "./../helpers/Fetchers";

export const apiGetCountryList = async (): Promise<
  NetworkResponse<Country[]>
> => {
  try {
    const response = await apiFetch(`${BASE_URL}/api/country/all`).then(
      (response) => response,
    );
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

export const apiGetCountry = async (
  cca2: string,
): Promise<NetworkResponse<string>> => {
  try {
    const response = await apiFetch(`${BASE_URL}/api/country/${cca2}`).then(
      (response) => {
        // console.log(response);
        return response;
      },
    );
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

export const apiGetBorderingCountryList = async (
  borderList: string[],
): Promise<NetworkResponse<Country[]>> => {
  try {
    // extracting country codes to string
    // e.g = IDN,GBR,FRA
    const strBorderList = borderList.join(",");
    const response = await apiFetch(
      `${REST_COUNTRIES_BASE_URL}/alpha?codes=${strBorderList}`,
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
      `${REST_COUNTRIES_BASE_URL}/subregion/${subregion}`,
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
      `https://cors-anywhere.herokuapp.com/${GITHUB_GEO_COUNTRY_BASE_URL}/${cca3.toLowerCase()}.geo.json`,
    ).then((rawData) => {
      // console.log(rawData);
      return rawData;
    });
    return data;
  } catch (error) {
    return error + "";
  }
};

export async function firestoreApiGetCountryAll(
  countryDb: CollectionReference,
) {
  const countrySnapshot = await getDocs(countryDb);
  const countryList = countrySnapshot.docs.map((doc) => doc.data());
  return countryList;
}

export async function firestoreApiGetCountry(
  countryDb: CollectionReference,
  cca2: string,
) {
  const countrySnapshot = await getDoc(doc(countryDb, cca2.toUpperCase()));
  const targetCountry = countrySnapshot.exists()
    ? countrySnapshot.data()
    : null;
  return targetCountry;
}
