import { countryGeoDb } from "../../utils/apis/FirestoreClient";
// Import the functions you need from the SDKs you need
import { doc, getDocs, setDoc } from "firebase/firestore/lite";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { countryDb } from "../../utils/apis/FirestoreClient";

const data = require("../../public/CountryProfileList.json");
const dataGeo = require("../../public/countries.json");

type Data = {
  name: any;
};

// Get a list of cities from your database
async function getCities() {
  const citySnapshot = await getDocs(countryDb);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const countryList = Array.from(dataGeo);
  // res
  //   .status(200)
  //   .json({ name: (await getCities(db).then((e) => e))[0]?.cca2 + "" });
  // const add = await setDoc(doc(firestoreDb, "countries", "KWKE"), {
  //   kl: 123,
  //   slsl: "123",
  // });

  // const newCityRef = doc(countryDb, "KEKWS");

  // countryList.forEach(async (country: any) => {
  //   const newDocRef = doc(countryDb, country.cca2);
  //   await setDoc(newDocRef, country);
  // });

  // // later...
  // const clk = await setDoc(newCityRef, {
  //   kl: 123,
  //   slsl: "1222223",
  // });
  // batch_add_countries_geo();
  const newcountry = {
    type: (countryList[1] as any).type,
    properties: (countryList[1] as any).properties,
    geometry: {
      type: (countryList[1] as any).geometry.type,
      coordinates: JSON.stringify((countryList[1] as any).geometry.coordinates),
    },
  };
  res.status(200).json({ name: newcountry });
}

function batch_add_countries() {
  const countryList = Array.from(
    require("../../public/CountryProfileList.json"),
  );
  // res
  //   .status(200)
  //   .json({ name: (await getCities(db).then((e) => e))[0]?.cca2 + "" });
  // const add = await setDoc(doc(firestoreDb, "countries", "KWKE"), {
  //   kl: 123,
  //   slsl: "123",
  // });

  // const newCityRef = doc(countryDb, "KEKWS");

  countryList.forEach(async (country: any) => {
    const newDocRef = doc(countryDb, country.cca2);
    await setDoc(newDocRef, country);
  });
}

function batch_add_countries_geo() {
  const countryList = Array.from(require("../../public/countries.json"));
  // res
  //   .status(200)
  //   .json({ name: (await getCities(db).then((e) => e))[0]?.cca2 + "" });
  // const add = await setDoc(doc(firestoreDb, "countries", "KWKE"), {
  //   kl: 123,
  //   slsl: "123",
  // });

  // const newCityRef = doc(countryDb, "KEKWS");

  // Since nested array are not supported
  // need to stringify the coordinates
  countryList.forEach(async (country: any) => {
    const newDocRef = doc(countryGeoDb, country.properties.ISO_A3);
    // Stringify the nested array
    const formattedCountry: any = {
      type: country.type,
      properties: country.properties,
      geometry: {
        type: country.geometry.type,
        coordinates: JSON.stringify(country.geometry.coordinates),
      },
    };
    await setDoc(newDocRef, formattedCountry);
  });
}
