export const APP_NAME = "Country Profiles";
export const REST_COUNTRIES_BASE_URL = "https://restcountries.com/v3.1";
export const GITHUB_GEO_COUNTRY_BASE_URL =
  "https://raw.githubusercontent.com/mledoze/countries/master/data";
// full link
//   "https://raw.githubusercontent.com/mledoze/countries/master/data/[cca3].geo.json";
// example
//   "https://raw.githubusercontent.com/mledoze/countries/master/data/gbr.geo.json";
export const ON_PROD = process.env.NODE_ENV === "production";
export const BASE_URL = ON_PROD
  ? "https://countryprofiles.vercel.app"
  : "http://localhost:3000";
