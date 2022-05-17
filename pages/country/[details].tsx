import _ from "lodash";
import { GetServerSideProps } from "next";
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
import ErrorPlaceholder from "../../components/ErrorPlaceholder";
import FetchFailedPlaceholder from "../../components/FetchFailedPlaceholder";
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
  apiGetCountry,
} from "../../utils/apis/CountryApi";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";
import { Country } from "../../utils/data/models/Country";
import {
  NetworkData,
  NetworkResponse,
} from "../../utils/data/types/NetworkTypes";
import { toCountry } from "../../utils/helpers/Casters";
import { APP_NAME } from "../../utils/helpers/Constants";
import { scrollToTop } from "../../utils/helpers/UIHelpers";

// interface CountryDetailsProps {

// }

type RelatedCountryListProps = string | Country[];

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

// const LazyMapSectionDetails = dynamic(
//   () => import("../../components/details/MapSectionDetails"),
//   {
//     ssr: false,
//   },
// );

const yesOrNo = (value: boolean): string => (value === true ? "YES" : "NO");

// render parts
const RENDER_FLAG = (country: Country) => (
  <div className="p-1 flex flex-col gap-4 grow sm:grow-0">
    <label
      htmlFor="img-preview-modal"
      className="cursor-pointer w-full overflow-hidden shadow-lg ring-4 ring-slate-600/30 sm:max-w-sm sm:rounded-lg"
      aria-label="Enlarge Flag"

    >
      <img className="w-full" src={country.flags.svg} alt={country.name.common} />
    </label>

    <h1 className="text-4xl font-bold">{country.name.common}</h1>
  </div>
);

const RENDER_INFO_NAMING = (country: Country) => {
  const name = country.name;
  const nameList = name.nativeName.filter(
    (nameItem) => nameItem.official !== name.official,
  );
  return (
    <InfoCardDetails
      icon={<ImFontSize />}
      title="Naming"
      details={[
        {
          lead: "Common :",
          desc: name.common,
        },
        {
          lead: "Official :",
          desc: name.official,
        },
        {
          lead: "Native name :",
          desc: [
            name.official,
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
};

const RENDER_INFO_GEOGRAPHIC = ({
  country,
  borderingCountryList,
}: {
  country: Country;
  borderingCountryList: NetworkData<Country[]>;
}) => (
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
          : !borderingCountryList || typeof borderingCountryList === "string"
          ? _.sortBy(country.borders).join(", ")
          : (borderingCountryList as Country[])
              .map((e, idx) => e.name.common)
              .join(", ") || "-",
      },
      { lead: "Lat-Long :", desc: country.latlng.join(", ") },
      { lead: "Timezone(s) :", desc: country.timezones.join(", ") },
    ]}
  />
);

const RENDER_INFO_POLITIC = (country: Country) => (
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

const RENDER_INFO_GENERIC = (country: Country) => (
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
            country.startOfWeek[0].toUpperCase() + country.startOfWeek.slice(1),
        },
      ]}
    />
  </>
);

const RENDER_INFO_COMMUNICATION = (country: Country) => (
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
        { lead: "Top level domain :", desc: country.tld?.join(" — ") || "-" },
      ]}
    />
  </>
);

const RENDER_MUTUAL_SUBREGION_COUNTRIES = ({
  country,
  mutualSubregionCountryList,
  reloadAction = () => {},
}: {
  country: Country;
  mutualSubregionCountryList: NetworkData<Country[]>;
  reloadAction: () => void;
}) => {
  if (!country.subregion) return "";
  // if fetching failed

  if (!mutualSubregionCountryList) {
    return (
      <LoadingPlaceholderDetails
        label={`Loading countries in ${country.subregion}...`}
      />
    );
  } else if (typeof mutualSubregionCountryList === "string") {
    return (
      <div className="px-8">
        <FetchFailedPlaceholder
          label={`Failed to load subregion countries : ${mutualSubregionCountryList}`}
          btnAction={() => reloadAction()}
        />
      </div>
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

const RENDER_BORDERING_COUNTRIES = ({
  country,
  borderingCountryList,
  reloadAction = () => {},
}: {
  country: Country;
  borderingCountryList: NetworkData<Country[]>;
  reloadAction: () => void;
}) => {
  if (!country.borders) return "";
  if (!borderingCountryList) {
    return (
      <LoadingPlaceholderDetails
        label={`Loading bordering countries of ${country.name.common}...`}
      />
    );
  } else if (typeof borderingCountryList === "string") {
    return (
      <div className="px-8">
        <FetchFailedPlaceholder
          label={`Failed to load bordering countries : ${borderingCountryList}`}
          btnAction={() => reloadAction()}
        />
      </div>
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

function RENDER_PAGING_BUTTON({
  to,
  countryList,
  pagingDetails,
}: {
  to: "prev" | "next";
  countryList: Country[];
  pagingDetails: {
    prev: string;
    next: string;
  };
}) {
  const prevCountry = countryList.find((e) => e.cca2 === pagingDetails.prev);
  const nextCountry = countryList.find((e) => e.cca2 === pagingDetails.next);
  const prev = to === "prev";
  const next = to === "next";

  const targetCountry = prev ? prevCountry : nextCountry;
  if (!targetCountry) return <div className="flex-1"></div>;
  return <PagingButtonDetails isPrevBtn={prev} targetCountry={targetCountry} />;
}

function RENDER_PAGINATION({
  countryList,
  pagingDetails,
}: {
  countryList: Country[];
  pagingDetails: {
    prev: string;
    next: string;
  };
}) {
  return (
    <div className="flex w-full flex-col justify-between gap-x-8 gap-y-4 sm:flex-row sm:px-8">
      {RENDER_PAGING_BUTTON({ to: "prev", countryList, pagingDetails })}
      {RENDER_PAGING_BUTTON({ to: "next", countryList, pagingDetails })}
    </div>
  );
}

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
  //   const router = useRouter();
  //   const { country } = router.query;
  // console.log(country.name.nativeName);
  // console.log(country.languages);
  // getting name list

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

  const [borderingCountryList, setBorderingCountryList] =
    useState<NetworkData<Country[]>>(null);
  const [mutualSubregionCountryList, setMutualSubregionCountryList] =
    useState<NetworkData<Country[]>>(null);

  useEffect(() => {
    if (!ok) return;
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
  }, [data]);

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
      countryAction.setCountryList(
        await apiGetCountryList().then((response) => response.data),
      );
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
    setBorderingCountryList([]);

    if (noData) {
      const list = await apiGetBorderingCountryList(country.borders).then(
        (res) => res.data,
      );
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
    setMutualSubregionCountryList([]);

    if (noData) {
      const list = await apiGetMutualSubregionCountryList(
        country.subregion,
      ).then((res) => res.data);
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

  function RENDER_MAP_SECTION() {
    return <MapSectionDetails country={country} />;
  }

  return (
    <>
      {RENDER_HEAD({
        title: country.name.common,
        desc: `Information about ${country.name.common} - ${
          country.name.official
        }; A country in ${
          country.subregion
        }; With the population of ${country.population.toLocaleString()} people and speak ${country.languages
          .map((e) => e.name)
          .join(", ")}`,
      })}
      <Header />
      <div className="flex flex-col gap-8 py-8 max-w-[120rem] mx-auto">
        <img
          className="fixed inset-0 -z-[1] h-screen w-screen rounded-r-3xl 
          rounded-br-full opacity-40 blur-lg transition-all group-hover:scale-150"
          src={country.flags.svg}
          alt={country.name.common}
        />
        <div className="flex flex-wrap items-start justify-start gap-8 sm:flex-row sm:px-8">
          {RENDER_FLAG(country)}
          {RENDER_INFO_NAMING(country)}
          {RENDER_INFO_GENERIC(country)}
          {RENDER_INFO_GEOGRAPHIC({
            country: country,
            borderingCountryList: borderingCountryList,
          })}
          {RENDER_INFO_COMMUNICATION(country)}
          {RENDER_INFO_POLITIC(country)}
        </div>
        {RENDER_MAP_SECTION()}
        {RENDER_BORDERING_COUNTRIES({
          country: country,
          borderingCountryList: borderingCountryList,
          reloadAction: () => loadBorderingCountryList(),
        })}
        {RENDER_MUTUAL_SUBREGION_COUNTRIES({
          country: country,
          mutualSubregionCountryList: mutualSubregionCountryList,
          reloadAction: () => loadMutualSubregionCountryList(),
        })}
        {countryState.list.length !== 0 &&
          RENDER_PAGINATION({
            countryList: countryState.list,
            pagingDetails: details(country.cca2),
          })}
      </div>
      <Footer />
      <SearchModal />
      <ImagePreviewModal country={country} />
    </>
  );
}

export default Details;
