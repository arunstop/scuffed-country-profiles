import { initializeApp } from "firebase/app";
import {
  collection,
  //   Firestore,
  //   getDocs,
  getFirestore,
} from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKLlEelKMXaG1NdcW73QZRrA4xaCAF1rg",
  authDomain: "scuffed-country-profiles-7efee.firebaseapp.com",
  projectId: "scuffed-country-profiles-7efee",
  storageBucket: "scuffed-country-profiles-7efee.appspot.com",
  messagingSenderId: "411820027541",
  appId: "1:411820027541:web:a68ac60c30f0dc8441b59c",
  measurementId: "G-FW0ZV856E1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const countryDb = collection(db, "countries");
export const countryGeoDb = collection(db, "country_geo");
