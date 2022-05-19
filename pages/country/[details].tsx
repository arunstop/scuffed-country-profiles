import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import MainContentDetails from "../../components/details/MainContentDetails";
import ErrorPlaceholder from "../../components/ErrorPlaceholder";
import Footer from "../../components/Footer";
import ImagePreviewModal from "../../components/modals/ImagePreviewModal";
import SearchModal from "../../components/modals/SearchModal";
import { apiGetCountry } from "../../utils/apis/CountryApi";
import {
  NetworkResponse
} from "../../utils/data/types/NetworkTypes";
import { toCountry } from "../../utils/helpers/Casters";
import { APP_NAME } from "../../utils/helpers/Constants";


export const getServerSideProps: GetServerSideProps<
  NetworkResponse<string>
> = async (context) => {
  // const json = "../../public/CountryProfileList.json";
  // console.log(context);
  // const countryListRaw: any[] = Array.from(
  //   await import("../../public/CountryProfileList.json"),
  // );
  // console.log(await countryListRaw());

  const countryTarget = await apiGetCountry(
    (context.query.details + "").toLowerCase(),
  );

  // console.log("--- final" + countryTarget.status + "");
  // const countryStr = JSON.stringify(countryTarget.data);
  // const countryTarget: Country = toCountry(target);
  // console.log(countryTarget);

  return {
    props: countryTarget,
    notFound: countryTarget.status === 404,
  };
};



const RENDER_HEAD = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <Head>
      <title>{`${title} — ${APP_NAME}`}</title>
      <meta name="description" content={desc} />
      <meta name="google-site-verification" content="AQqIJM0I0D8TsGfRdXOnpugvvlv2NG0IXJoWFPuWsss" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        crossOrigin=""
      />
    </Head>
  );
};

function Details({ ok, message, data }: NetworkResponse<string>) {

  // const {
  //   getters: {
  //     list: {
  //       filterProps: { getBorderingCountryList, getSubregionCountryList },
  //       noData,
  //     },
  //   },
  //   action: countryAction,
  // } = useCountryContext();

  // const [borderingCountryList, setBorderingCountryList] =
  //   useState<NetworkData<Country[]>>(null);
  // const [mutualSubregionCountryList, setMutualSubregionCountryList] =
  //   useState<NetworkData<Country[]>>(null);

  useEffect(() => {
    // alert("asd");
    // if (!ok) return;
    // // scrollToTop();
    // // loadBorderingCountryList();
    // // loadMutualSubregionCountryList();
    // // countryAction.addLastVisited(country.cca2);
    // // document.addEventListener("keydown", toggleSearchModalEvent);
    // return () => {
    //   setBorderingCountryList([]);
    //   setMutualSubregionCountryList([]);
    //   document.removeEventListener("keydown", toggleSearchModalEvent);
    // };
  }, []);

  // IF ERROR
  if (!ok) {
    return (
      <>
        {RENDER_HEAD({ title: "Error occured", desc: "Something is wrong..." })}
        <ErrorPlaceholder message={message} />
      </>
    );
  }

  const country = toCountry(JSON.parse(data)[0]);

  // function toggleSearchModalEvent(ev: KeyboardEvent) {
  //   // alert(router.pathname);
  //   // if (!getSearchModalElement()) return;

  //   const searchedModalOpen = getSearchModalElement().checked;
  //   if (searchedModalOpen && ev.key.toLowerCase() === "escape") {
  //     return toggleSearchModal(!getSearchModalElement().checked);
  //   }
  //   if (ev.ctrlKey && ev.key.toLowerCase() === "/") {
  //     toggleSearchModal(!getSearchModalElement().checked);
  //     loadCountryList();
  //   }
  // }

  // async function loadCountryList() {
  //   if (noData) {
  //     countryAction.setCountryList(
  //       await apiGetCountryList().then((response) => response.data),
  //     );
  //   }
  // }

  // function sortByName(countryList: Country[]): Country[] {
  //   return _.orderBy(countryList, ["name.common"], ["asc"]);
  // }

  // function excludeCurrentCountry(countryList: Country[]): Country[] {
  //   return countryList.filter(
  //     (countryItem) => countryItem.cca2 !== country.cca2,
  //   );
  // }

  // async function loadBorderingCountryList() {
  //   // check if countryList exist in state
  //   // and load from API if it does not
  //   // or simply load it from the sate if it does.
  //   setBorderingCountryList([]);

  //   if (noData) {
  //     const list = await apiGetBorderingCountryList(country.borders).then(
  //       (res) => res.data,
  //     );
  //     // console.log(typeof list);
  //     if (typeof list === "string") {
  //       setBorderingCountryList(list);
  //     } else {
  //       setBorderingCountryList(sortByName(list));
  //     }
  //   } else {
  //     setBorderingCountryList(
  //       sortByName(getBorderingCountryList(country.borders)),
  //     );
  //   }
  // }

  // async function loadMutualSubregionCountryList() {
  //   // check if countryList exist in state
  //   // and load from API if it does not
  //   // or simply load it from the state if it does.
  //   setMutualSubregionCountryList([]);

  //   if (noData) {
  //     const list = await apiGetMutualSubregionCountryList(
  //       country.subregion,
  //     ).then((res) => res.data);
  //     // console.log(typeof list);
  //     if (typeof list === "string") {
  //       setMutualSubregionCountryList(list);
  //     } else {
  //       setMutualSubregionCountryList(sortByName(excludeCurrentCountry(list)));
  //     }
  //   } else {
  //     setMutualSubregionCountryList(
  //       sortByName(
  //         excludeCurrentCountry(getSubregionCountryList(country.subregion)),
  //       ),
  //     );
  //   }
  // }


  return (
    <>
      <MainContentDetails country={country} />
      <Footer />
      <SearchModal />
      <ImagePreviewModal country={country} />
    </>
  );
}

export default Details;
