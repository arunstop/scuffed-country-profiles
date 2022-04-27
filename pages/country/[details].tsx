import _ from "lodash";
import { BiWorld } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ImFontSize, ImHammer2 } from "react-icons/im";
import { GetServerSideProps } from "next";
import { BsFileText } from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import CircularProgress from "../../components/CircularProgress";
import CountryItem from "../../components/CountryItem";
import Header from "../../components/Header";
import {
  apiGetBorderingCountryList,
  apiGetMutualSubregionCountryList,
  getCountry,
} from "../../utils/apis/CountryApi";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";
import { Country } from "../../utils/data/models/Country";
import { toCountry } from "../../utils/helpers/Casters";
import { APP_NAME } from "../../utils/helpers/Constants";
import Footer from "../../components/Footer";
import Link from "next/link";

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

  const [borderingCountryList, setBorderingCountryList] = useState<Country[]>(
    [],
  );
  const [mutualSubregionCountryList, setMutualSubregionCountryList] = useState<
    Country[]
  >([]);

  useEffect(() => {
    loadBorderingCountryList();
    loadMutualSubregionCountryList();
    countryAction.setSearchKeyword("");
    return () => {
      setBorderingCountryList([]);
      setMutualSubregionCountryList([]);
    };
  }, [countryStr]);

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
    const list: Country[] = noData
      ? await apiGetBorderingCountryList(country.borders)
      : getBorderingCountryList(country.borders);
    setBorderingCountryList(sortByName(list));
  }

  async function loadMutualSubregionCountryList() {
    // check if countryList exist in state
    // and load from API if it does not
    // or simply load it from the sate if it does.
    const list: Country[] = noData
      ? await apiGetMutualSubregionCountryList(country.subregion)
      : getSubregionCountryList(country.subregion);
    setMutualSubregionCountryList(sortByName(excludeCurrentCountry(list)));
  }

  const yesOrNo = (value: boolean): string => (value === true ? "YES" : "NO");

  // render parts
  const RENDER_FLAG = () => (
    <div className="flex flex-col justify-center gap-4 self-center">
      <img
        className="rounded-lg shadow-lg ring-4 ring-slate-600/30"
        src={country.flags.png}
      />
      <h1 className="text-4xl font-bold">{country.name.common}</h1>
    </div>
  );

  const RENDER_INFO_HEADER = (text: string, icon: ReactNode) => (
    <h1
      className="border-b-2 border-base-content/30 bg-base-300 p-4
  text-2xl font-bold flex gap-2 items-center"
    >
      {icon}
      {text}
    </h1>
  );

  const RENDER_INFO_NAMING = () => (
    <div className="card max-w-[30rem] grow bg-base-300/50 shadow-lg">
      <div className="flex flex-col">
        {RENDER_INFO_HEADER("Naming", <ImFontSize />)}
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            <span className="font-bold">Common :</span> {country.name.common}{" "}
          </p>
          <p>
            <span className="font-bold">Official :</span>{" "}
            {country.name.official}{" "}
          </p>
          <p>
            <span className="font-bold">Native name :</span>{" "}
            {[
              countryName.official,
              ...nameList.map((nameItem) => nameItem.official),
            ].join(" — ")}{" "}
          </p>
          <p>
            <span className="font-bold">Alternative Spellings :</span>{" "}
            {country.altSpellings.join(", ")}{" "}
          </p>
          <p>
            <span className="font-bold">Name in other languages :</span>{" "}
            {country.translations.length}
          </p>
        </div>
      </div>
    </div>
  );

  const RENDER_INFO_GEOGRAPHIC = () => (
    <div className="card max-w-[30rem] grow bg-base-300/50 shadow-lg">
      <div className="flex flex-col">
        {RENDER_INFO_HEADER("Geographic", <BiWorld />)}
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            <span className="font-bold">Continent :</span>{" "}
            {country.continents.join(", ")}{" "}
          </p>
          <p>
            <span className="font-bold">Region :</span> {country.region}{" "}
          </p>
          <p>
            <span className="font-bold">Subregion :</span>{" "}
            {country.subregion || "-"}{" "}
          </p>
          <p>
            <span className="font-bold">Land area :</span>{" "}
            {country.area.toLocaleString()} km^2
          </p>
          <p>
            <span className="font-bold">Landlocked :</span>{" "}
            {yesOrNo(country.landlocked)}{" "}
          </p>
          <p>
            <span className="font-bold">Borders :</span>{" "}
            {country.borders?.join(", ") || "-"}
          </p>
          <p>
            <span className="font-bold">Lat-Long :</span>{" "}
            {country.latlng.join(", ")}
          </p>
          <p>
            <span className="font-bold">Timezone(s) :</span>{" "}
            {country.timezones.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );

  const RENDER_INFO_POLITIC = () => (
    <div className="card max-w-[30rem] grow bg-base-300/50 shadow-lg">
      <div className="flex flex-col">
        {RENDER_INFO_HEADER("Politic", <ImHammer2 />)}
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            <span className="font-bold">Independent :</span>{" "}
            {yesOrNo(country.independent)}
          </p>
          <p>
            <span className="font-bold">Status :</span>{" "}
            {country.status.toUpperCase()}
          </p>
          <p>
            <span className="font-bold">United Nations member :</span>{" "}
            {yesOrNo(country.unMember)}
          </p>
        </div>
      </div>
    </div>
  );

  const RENDER_INFO_GENERIC = () => (
    <div className="card max-w-[30rem] grow bg-base-300/50 shadow-lg">
      <div className="flex flex-col">
        {RENDER_INFO_HEADER("Generic", <BsFileText />)}
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            {" "}
            <span className="font-bold">Capital :</span>{" "}
            {country.capital?.join(", ") || "-"}{" "}
          </p>
          <p>
            {" "}
            <span className="font-bold">Currency :</span>{" "}
            {country.currencies
              ?.map(
                (currItem) =>
                  `${currItem.name} (${currItem.code} / ${currItem.symbol})`,
              )
              .join(" — ")}
          </p>
          <p>
            {" "}
            <span className="font-bold">Population :</span>{" "}
            {country.population.toLocaleString()}{" "}
          </p>
          <p>
            <span className="font-bold">Start of the week : </span>
            <span className="capitalize">{country.startOfWeek}</span>
          </p>
        </div>
      </div>
    </div>
  );
  const RENDER_INFO_COMMUNICATION = () => (
    <div className="card max-w-[30rem] grow bg-base-300/50 shadow-lg">
      <div className="flex flex-col">
        {RENDER_INFO_HEADER("Communication", <MdPhoneInTalk />)}
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            <span className="font-bold">Language(s) :</span>{" "}
            {country.languages.map((e) => e.name).join(", ") || "-"}
          </p>
          <p>
            <span className="font-bold">
              International direct dialing (IDD) :
            </span>{" "}
            {`${country.idd.root}${
              country.idd.suffixes ? country.idd.suffixes[0] : "-"
            }`}
          </p>
          <p>
            <span className="font-bold">Top level domain :</span>{" "}
            {country.tld.join(" — ")}{" "}
          </p>
        </div>
      </div>
    </div>
  );

  const RENDER_LOADING_PLACEHOLDER = (label: string) => (
    <div className="flex items-center gap-4 p-8 text-xl font-semibold">
      <CircularProgress size={4} />
      {label}
    </div>
  );

  const RENDER_BORDERING_COUNTRIES = () => {
    if (!country.borders) return "";
    return (
      country.borders &&
      (!borderingCountryList.length ? (
        RENDER_LOADING_PLACEHOLDER(
          `Loading bordering countries of ${country.name.common}...`,
        )
      ) : (
        <div className="flex w-full flex-col gap-8 px-8">
          <h2 className="text-2xl font-bold">
            Bordering {country.borders.length > 1 ? "Countries" : "Country"} :
          </h2>
          <div
            className="grid grid-cols-2 items-center justify-items-center gap-4 self-stretch
        transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8"
          >
            {country.borders.length === 0
              ? ""
              : borderingCountryList.map((countryItem, idx) => (
                  <CountryItem key={idx} country={countryItem} />
                ))}
          </div>
        </div>
      ))
    );
  };

  const RENDER_MUTUAL_SUBREGION_COUNTRIES = () => {
    if (!country.subregion) return "";
    return mutualSubregionCountryList.length === 0 ? (
      RENDER_LOADING_PLACEHOLDER(`Loading countries in ${country.subregion}...`)
    ) : (
      <div className="flex w-full flex-col gap-8 px-8">
        <h2 className="text-2xl font-bold">
          Countries in {country.subregion} :
        </h2>
        <div
          className="grid grid-cols-2 items-center justify-items-center gap-4 self-stretch
          transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8"
        >
          {mutualSubregionCountryList.map((countryItem, idx) => (
            <CountryItem key={idx} country={countryItem} />
          ))}
        </div>
      </div>
    );
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
    if (!targetCountry) return "";
    return (
      <Link href={`/country/${targetCountry?.cca2}`} passHref>
        <a
          className={`btn btn-lg normal-case py-4 h-auto w-auto flex-1
        hover:underline
        ${prev ? "justify-start" : "justify-end"}
        `}
          role={"button"}
        >
          <div
            className={`flex flex-col gap-4 items-start
          ${prev ? "items-start" : "items-end"}`}
          >
            <span
              className={`inline-flex gap-2 ${prev ? "" : "flex-row-reverse"}`}
            >
              {prev ? (
                <FaChevronLeft className="text-lg" />
              ) : (
                <FaChevronRight className="text-lg" />
              )}
              <span className="capitalize font-normal">
                {prev ? "Previous" : "Next"}
              </span>
            </span>
            <div
              className={`inline-flex gap-4 items-center 
            ${prev ? "" : "flex-row-reverse"}`}
            >
              <img className="h-16 rounded-lg" src={targetCountry?.flags.png} />
              <p
                className={`text-left flex flex-col gap-2
               ${prev ? "text-left" : "text-right"}`}
              >
                <span className="text-xl">{targetCountry?.name.common}</span>
                <span className="font-normal">
                  {targetCountry?.name.official}
                </span>
              </p>
            </div>
          </div>
        </a>
      </Link>
    );
  }

  function RENDER_PREV_NEXT_COUNTRIES() {
    return (
      <div className="flex flex-wrap sm:flex-nowrap justify-between w-full px-8 gap-4">
        {RENDER_PAGING_BUTTON("prev")}
        {RENDER_PAGING_BUTTON("next")}
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>
          {countryName.common} | {APP_NAME}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col gap-8 py-16">
        <img
          className="absolute inset-0 -z-[1] h-[30rem] rounded-r-3xl
          rounded-br-full opacity-40 blur-lg transition-all group-hover:scale-150"
          src={country.flags.png}
          alt={country.name.common}
        />
        <div className="flex flex-wrap items-start justify-start gap-8 p-8 sm:flex-row">
          {RENDER_FLAG()}
          {RENDER_INFO_NAMING()}
          {RENDER_INFO_GEOGRAPHIC()}
          {RENDER_INFO_POLITIC()}
          {RENDER_INFO_GENERIC()}
          {RENDER_INFO_COMMUNICATION()}
        </div>
        {RENDER_BORDERING_COUNTRIES()}
        {RENDER_MUTUAL_SUBREGION_COUNTRIES()}
        {countryState.list.length !== 0 && RENDER_PREV_NEXT_COUNTRIES()}
      </div>
      <Footer />
    </>
  );
}

export default Details;
