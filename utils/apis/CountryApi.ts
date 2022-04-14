import { toCountry } from "./../helpers/Casters";
import { Country } from "../data/models/Country";
import { apiFetch } from "../helpers/Fetcher";

export const getCountryList = async (): Promise<Country[]> => {
  const data = await apiFetch<any[]>("https://restcountries.com/v3.1/all").then(
    (data) => Array.from(data).map((country) => toCountry(country)),
  );
  return data;
};

export const getCountry = async (cca2: string): Promise<string> => {
  const data = await apiFetch<string>(
    // This endpoint returns an array now
    `https://restcountries.com/v3.1/alpha/${cca2}`,
  ).then((data) => {
    // console.log(data[0].name.nativeName);
    return data;
  });
  return data;
};
