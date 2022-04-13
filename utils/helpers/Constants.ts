export const countryListRaw = async () =>
  Array.from(await import("../../public/CountryProfileList.json"));
