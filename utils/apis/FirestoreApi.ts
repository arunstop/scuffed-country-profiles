import {
  CollectionReference,
  getDocs,
  getDoc,
  doc,
  where,
  query,
} from "firebase/firestore/lite";

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

export async function firestoreApiGetCountriesByCca3(
  countryDb: CollectionReference,
  codes: string,
) {
  const cca3List = codes.toUpperCase().split(",");
  const q = query(countryDb, where("cca3", "in", cca3List));
  const snapshot = await getDocs(q);
  //   console.log(snapshot.docs.map(d=>d.data()));
  const countries = snapshot.empty
    ? []
    : snapshot.docs.map((doc) => doc.data());
  return countries;
}

export async function firestoreApiGetCountriesBySubregion(
  countryDb: CollectionReference,
  subregion: string,
) {
  const q = query(countryDb, where("subregion", "==", subregion));
  const snapshot = await getDocs(q);
  const countries = snapshot.empty
    ? []
    : snapshot.docs.map((doc) => doc.data());
  return countries;
}

export async function firestoreApiGetCountryGeo(
  countrygeoDb: CollectionReference,
  codes: string,
) {
  const cca3 = codes.toUpperCase();
  const snapshot = await getDoc(doc(countrygeoDb, cca3));
  const targetCountryGeo = snapshot.exists() ? snapshot.data() : null;
  return targetCountryGeo;
}
