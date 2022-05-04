import { GeoJsonObject } from "geojson";
import _ from "lodash";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { BsFileText } from "react-icons/bs";
import { ImFontSize, ImHammer2 } from "react-icons/im";
import { MdPhoneInTalk } from "react-icons/md";
import InfoCardDetails from "../../components/details/InfoCardDetails";
import LoadingPlaceholderDetails from "../../components/details/LoadingPlaceholderDetails";
import MapSectionDetails from "../../components/details/MapSectionDetails";
import PagingButtonDetails from "../../components/details/PagingButtonDetails";
import RelatedSectionDetails from "../../components/details/RelatedSectionDetails";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ImagePreviewModal from "../../components/modals/ImagePreviewModal";
import SearchModal, {
  getSearchModalElement,
  toggleSearchModal,
} from "../../components/modals/SearchModal";
import {
  apiGetBorderingCountryList,
  apiGetCountryList,
  apiGetMutualSubregionCountryList,
  getCountry,
} from "../../utils/apis/CountryApi";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";
import { Country } from "../../utils/data/models/Country";
import { toCountry } from "../../utils/helpers/Casters";
import { APP_NAME } from "../../utils/helpers/Constants";
import { scrollToTop } from "../../utils/helpers/UIHelpers";

interface CountryDetailsProps {
  countryStr: string;
}

export const getServerSideProps: GetServerSideProps<
  CountryDetailsProps
> = async (context) => {
  // const json = "../../public/CountryProfileList.json";
  // console.log(context);
  // const countryListRaw: any[] = Array.from(
  //   await import("../../public/CountryProfileList.json"),
  // );
  // console.log(await countryListRaw());

  const countryTarget = await getCountry(
    (context.query.details + "").toLowerCase(),
  );
  const countryStr = JSON.stringify(countryTarget);
  // const countryTarget: Country = toCountry(target);
  // console.log(countryTarget);

  return {
    props: { countryStr: countryStr },
    notFound: !countryTarget,
  };
};

const RENDER_MAP4REAL = dynamic(
  () => import("../../components/details/sMapSectionDetails"),
  {
    ssr: false,
  },
);

function Details({ countryStr }: CountryDetailsProps) {
  //   const router = useRouter();
  //   const { country } = router.query;
  // console.log(country.name.nativeName);
  // console.log(country.languages);
  // getting name list
  const country = toCountry(JSON.parse(countryStr)[0]);
  const countryName = country.name;
  const nameList = countryName.nativeName.filter(
    (nameItem) => nameItem.official !== countryName.official,
  );

  // console.log(
  //   ["US", "USA", "United States of America"]
  //     .map((e) => e.toLowerCase())
  //     .includes("US".toLowerCase()),
  // );

  const {
    state: countryState,
    getters: {
      list: {
        filterProps: { getBorderingCountryList, getSubregionCountryList },
        noData,
      },
      paging: { details },
    },
    action: countryAction,
  } = useCountryContext();

  const [borderingCountryList, setBorderingCountryList] = useState<
    Country[] | string
  >([]);
  const [mutualSubregionCountryList, setMutualSubregionCountryList] = useState<
    Country[] | string
  >([]);

  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | string>(
    "loading...",
  );

  useEffect(() => {
    scrollToTop();
    loadBorderingCountryList();
    loadMutualSubregionCountryList();
    // countryAction.setSearchKeyword("");
    // async function loadGeoCountry() {
    //   const data = await apiGetGeoCountry(country.cca3);
    //   console.log("data " + data);
    //   if (typeof data === "string") setGeoJsonData(data);
    //   else setGeoJsonData(JSON.parse(JSON.stringify(data)) as GeoJsonObject);
    //   const xd: GeoJsonObject = data as GeoJsonObject;
    //   // console.log(_.isEqual(gjo, xd));
    // }

    // loadGeoCountry();

    document.addEventListener("keydown", toggleSearchModalEvent);
    return () => {
      setBorderingCountryList([]);
      setMutualSubregionCountryList([]);
      document.removeEventListener("keydown", toggleSearchModalEvent);
    };
  }, [countryStr]);

  function toggleSearchModalEvent(ev: KeyboardEvent) {
    // alert(router.pathname);
    // if (!getSearchModalElement()) return;

    const searchedModalOpen = getSearchModalElement().checked;
    if (searchedModalOpen && ev.key.toLowerCase() === "escape") {
      return toggleSearchModal(!getSearchModalElement().checked);
    }
    if (ev.ctrlKey && ev.key.toLowerCase() === "/") {
      toggleSearchModal(!getSearchModalElement().checked);
      loadCountryList();
    }
  }

  async function loadCountryList() {
    if (noData) {
      countryAction.setCountryList(await apiGetCountryList());
    }
  }

  function sortByName(countryList: Country[]): Country[] {
    return _.orderBy(countryList, ["name.common"], ["asc"]);
  }

  function excludeCurrentCountry(countryList: Country[]): Country[] {
    return countryList.filter(
      (countryItem) => countryItem.cca2 !== country.cca2,
    );
  }

  async function loadBorderingCountryList() {
    // check if countryList exist in state
    // and load from API if it does not
    // or simply load it from the sate if it does.

    if (noData) {
      const list = await apiGetBorderingCountryList(country.borders);
      // console.log(typeof list);
      if (typeof list === "string") {
        setBorderingCountryList(list);
      } else {
        setBorderingCountryList(sortByName(list));
      }
    } else {
      setBorderingCountryList(
        sortByName(getBorderingCountryList(country.borders)),
      );
    }
  }

  async function loadMutualSubregionCountryList() {
    // check if countryList exist in state
    // and load from API if it does not
    // or simply load it from the state if it does.

    if (noData) {
      const list = await apiGetMutualSubregionCountryList(country.subregion);
      // console.log(typeof list);
      if (typeof list === "string") {
        setMutualSubregionCountryList(list);
      } else {
        setMutualSubregionCountryList(sortByName(excludeCurrentCountry(list)));
      }
    } else {
      setMutualSubregionCountryList(
        sortByName(
          excludeCurrentCountry(getSubregionCountryList(country.subregion)),
        ),
      );
    }
  }

  const yesOrNo = (value: boolean): string => (value === true ? "YES" : "NO");

  // render parts
  const RENDER_FLAG = () => (
    <div className="flex flex-col justify-center gap-4 self-center">
      <label
        htmlFor="img-preview-modal"
        role={"button"}
        className="rounded-lg shadow-lg ring-4 ring-slate-600/30 w-full sm:max-w-sm overflow-hidden"
      >
        <img className="w-full" src={country.flags.svg} />
      </label>

      <h1 className="text-4xl font-bold">{country.name.common}</h1>
    </div>
  );

  const RENDER_INFO_NAMING = () => (
    <InfoCardDetails
      icon={<ImFontSize />}
      title="Naming"
      details={[
        {
          lead: "Common :",
          desc: country.name.common,
        },
        {
          lead: "Official :",
          desc: country.name.official,
        },
        {
          lead: "Native name :",
          desc: [
            countryName.official,
            ...nameList.map((nameItem) => nameItem.official),
          ].join(" — "),
        },
        {
          lead: "Alternative Spellings :",
          desc: country.altSpellings.join(", "),
        },
        {
          lead: "Name in other languages :",
          desc: country.translations.length + "",
        },
      ]}
    />
  );

  const RENDER_INFO_GEOGRAPHIC = () => (
    <InfoCardDetails
      icon={<BiWorld />}
      title="Geographic"
      details={[
        { lead: "Region :", desc: country.region },
        { lead: "Subregion :", desc: country.subregion || "-" },
        { lead: "Land area :", desc: country.area.toLocaleString() + " km^" },
        { lead: "Landlocked :", desc: yesOrNo(country.landlocked) },
        {
          lead: "Borders :",
          desc: !country.borders
            ? "-"
            : typeof borderingCountryList === "string"
            ? _.sortBy(country.borders).join(", ")
            : borderingCountryList.map((e, idx) => e.name.common).join(", ") ||
              "-",
        },
        { lead: "Lat-Long :", desc: country.latlng.join(", ") },
        { lead: "Timezone(s) :", desc: country.timezones.join(", ") },
      ]}
    />
  );

  const RENDER_INFO_POLITIC = () => (
    <InfoCardDetails
      icon={<ImHammer2 />}
      title="Politic"
      details={[
        { lead: "Independent :", desc: yesOrNo(country.independent) },
        { lead: "Status :", desc: country.status.toUpperCase() },
        { lead: "United Nations member :", desc: yesOrNo(country.unMember) },
      ]}
    />
  );

  const RENDER_INFO_GENERIC = () => (
    <>
      <InfoCardDetails
        icon={<BsFileText />}
        title="Generic"
        details={[
          { lead: "Capital :", desc: country.capital?.join(", ") || "-" },
          {
            lead: "Currency :",
            desc: country.currencies
              ?.map(
                (currItem) =>
                  `${currItem.name} (${currItem.code} / ${currItem.symbol})`,
              )
              .join(" — "),
          },
          { lead: "Population :", desc: country.population.toLocaleString() },
          {
            lead: "Start of the week :",
            desc:
              country.startOfWeek[0].toUpperCase() +
              country.startOfWeek.slice(1),
          },
        ]}
      />
    </>
  );

  const RENDER_INFO_COMMUNICATION = () => (
    <>
      <InfoCardDetails
        icon={<MdPhoneInTalk />}
        title="Communication"
        details={[
          {
            lead: "Language(s) :",
            desc: country.languages.map((e) => e.name).join(", ") || "-",
          },
          {
            lead: "International direct dialing (IDD) :",
            desc: `${country.idd.root}${
              country.idd.suffixes ? country.idd.suffixes[0] : "-"
            }`,
          },
          { lead: "Top level domain :", desc: country.tld.join(" — ") },
        ]}
      />
    </>
  );

  const RENDER_BORDERING_COUNTRIES = () => {
    if (!country.borders) return "";

    if (typeof borderingCountryList === "string") {
      return <LoadingPlaceholderDetails label={borderingCountryList} />;
    } else if (borderingCountryList.length === 0) {
      return (
        <LoadingPlaceholderDetails
          label={`Loading bordering countries of ${country.name.common}...`}
        />
      );
    } else {
      return (
        <RelatedSectionDetails
          title={`Bordering ${
            country.borders.length > 1 ? "Countries" : "Country"
          }`}
          country={country}
          list={borderingCountryList}
        />
      );
    }
  };

  const RENDER_MUTUAL_SUBREGION_COUNTRIES = () => {
    if (!country.subregion) return "";
    if (typeof mutualSubregionCountryList === "string") {
      return <LoadingPlaceholderDetails label={mutualSubregionCountryList} />;
    } else if (mutualSubregionCountryList.length === 0) {
      return (
        <LoadingPlaceholderDetails
          label={`Loading countries in ${country.subregion}...`}
        />
      );
    } else {
      return (
        <RelatedSectionDetails
          title={`Countries in ${country.subregion}`}
          country={country}
          list={mutualSubregionCountryList}
        />
      );
    }
  };

  function RENDER_PAGING_BUTTON(to: "prev" | "next") {
    const pagingDetails = details(country.cca2);

    const prevCountry = countryState.list.find(
      (e) => e.cca2 === pagingDetails.prev,
    );
    const nextCountry = countryState.list.find(
      (e) => e.cca2 === pagingDetails.next,
    );
    const prev = to === "prev";
    const next = to === "next";

    const targetCountry = prev ? prevCountry : nextCountry;
    if (!targetCountry) return <div className="flex-1"></div>;
    return (
      <PagingButtonDetails isPrevBtn={prev} targetCountry={targetCountry} />
    );
  }

  function RENDER_PAGINATION() {
    return (
      <div className="flex w-full flex-col justify-between gap-x-8 gap-y-4 px-8 sm:flex-row">
        {RENDER_PAGING_BUTTON("prev")}
        {RENDER_PAGING_BUTTON("next")}
      </div>
    );
  }

  function RENDER_MAPS() {
    return <MapSectionDetails country={country} />;
  }

  return (
    <>
      <Head>
        <title>{`${countryName.common} — ${APP_NAME}`}</title>
        <meta
          name="description"
          content={`Information about ${countryName.common} - ${
            countryName.official
          }; A country in ${
            country.subregion
          }; With the population of ${country.population.toLocaleString()} people and speak ${country.languages
            .map((e) => e.name)
            .join(", ")}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
          integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
          crossOrigin=""
        />
      </Head>
      <Header />
      <div className="flex flex-col gap-8 pb-16">
        <img
          className="absolute inset-0 -z-[1] h-[30rem] rounded-r-3xl
          rounded-br-full opacity-40 blur-lg transition-all group-hover:scale-150"
          src={country.flags.svg}
          alt={country.name.common}
        />
        <div className="flex flex-wrap items-start justify-start gap-8 p-8 sm:flex-row">
          {RENDER_FLAG()}
          {RENDER_INFO_NAMING()}
          {RENDER_INFO_GENERIC()}
          {RENDER_INFO_GEOGRAPHIC()}
          {RENDER_INFO_COMMUNICATION()}
          {RENDER_INFO_POLITIC()}
        </div>
        {RENDER_MAPS()}
        {
          <RENDER_MAP4REAL
            key={country.cca2}
            country={country}
            // gjo={geoJsonData}
          />
        }
        {RENDER_BORDERING_COUNTRIES()}
        {RENDER_MUTUAL_SUBREGION_COUNTRIES()}
        {countryState.list.length !== 0 && RENDER_PAGINATION()}
      </div>
      <Footer />
      <SearchModal />
      <ImagePreviewModal country={country} />
    </>
  );
}

export default Details;
