// import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/sections/HeroSection";
import MainSection from "../components/sections/main/MainSection";
import { apiGetCountryList } from "../utils/apis/CountryApi";
import { useCountryContext } from "../utils/contexts/country/CountryHook";
import { APP_NAME } from "../utils/helpers/Constants";
// import { Country } from "../utils/data/models/Country";
// import { Country } from "../utils/data/models/Country";

interface CountryIndexProps {
  countryList: any[];
}

// export const getServerSideProps: GetServerSideProps<CountryIndexProps> = async (
//   context,
// ) => {
//   const countryList = await getCountryList();

//   // console.log(countryList);

//   return {
//     props: { countryList: countryList },
//   };
// };

// function Home({ countryList }: CountryIndexProps) {
function Home() {
  const { state: countryState, action: countryAction } = useCountryContext();
  useEffect(() => {
    // async () => {
    // console.log("123213");
    // };
    loadCountryList();
  }, [countryState.list]);

  async function loadCountryList() {
    if (countryState.list.length === 0) {
      countryAction.setCountryList(
        await apiGetCountryList().then((response) => response.data),
      );
    }
  }

  return (
    <>
      <Head>
        <title>{`${APP_NAME}`}</title>
        <meta name="description" content="Browse All countries in the world!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={"flex flex-col items-center justify-center"}>
        <HeroSection />
        <MainSection />
      </main>

      <Footer />
    </>
  );
}

export default Home;
