import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import { getCountry } from "../../utils/apis/CountryApi";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";
import { toCountry } from "../../utils/helpers/Casters";
import { APP_NAME } from "../../utils/helpers/Constants";

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

  const target = JSON.stringify(
    await getCountry((context.query.details + "").toLowerCase()),
  );
  // const countryTarget: Country = toCountry(target);
  // console.log(countryTarget);

  return {
    props: { countryStr: target },
    notFound: !target,
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

  const { state: countryState, action: countryAction } = useCountryContext();
  useEffect(() => {
    countryAction.setSearchKeyword("");
  }, []);

  const YES_OR_NO = (value: boolean): string => (value === true ? "YES" : "NO");

  // render parts
  const RENDER_FLAG = () => (
    <div className="flex flex-col justify-center gap-4 self-center">
      <h1 className="text-4xl font-bold">{country.name.common}</h1>
      <img
        className="rounded-lg shadow-lg ring-4 ring-slate-600/30"
        src={country.flags.png}
      />
    </div>
  );

  const RENDER_INFO_GENERIC = () => (
    <div className="card grow max-w-[30rem] bg-base-300/50">
      <div className="flex flex-col">
        <h1 className="bg-base-300 p-4 text-2xl font-bold border-b-2 border-base-content/50">
          Generic
        </h1>
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            {" "}
            <span className="font-bold">Capital :</span> {country.capital}{" "}
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

  const RENDER_INFO_NAMING = () => (
    <div className="card grow max-w-[30rem] bg-base-300/50">
      <div className="flex flex-col">
        <h1 className="bg-base-300 p-4 text-2xl font-bold border-b-2 border-base-content/50">
          Naming
        </h1>
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
    <div className="card grow max-w-[30rem] bg-base-300/50">
      <div className="flex flex-col">
        <h1 className="bg-base-300 p-4 text-2xl font-bold border-b-2 border-base-content/50">
          Geographic
        </h1>
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            <span className="font-bold">Continent :</span>{" "}
            {country.continents.join(", ")}{" "}
          </p>
          <p>
            <span className="font-bold">Region :</span> {country.region}{" "}
          </p>
          <p>
            <span className="font-bold">Subregion :</span> {country.subregion}{" "}
          </p>
          <p>
            <span className="font-bold">Land area :</span>{" "}
            {country.area.toLocaleString()} km^2
          </p>
          <p>
            <span className="font-bold">Landlocked :</span>{" "}
            {YES_OR_NO(country.landlocked)}{" "}
          </p>
          <p>
            <span className="font-bold">Borders :</span>{" "}
            {country.borders?.join(", ")}
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
    <div className="card grow max-w-[30rem] bg-base-300/50">
      <div className="flex flex-col">
        <h1 className="bg-base-300 p-4 text-2xl font-bold border-b-2 border-base-content/50">
          Politic
        </h1>
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            <span className="font-bold">Independent :</span>{" "}
            {YES_OR_NO(country.independent)}
          </p>
          <p>
            <span className="font-bold">Status :</span>{" "}
            {country.status.toUpperCase()}
          </p>
          <p>
            <span className="font-bold">United Nations member :</span>{" "}
            {YES_OR_NO(country.unMember)}
          </p>
        </div>
      </div>
    </div>
  );

  const RENDER_INFO_COMMUNICATION = () => (
    <div className="card grow max-w-[30rem] bg-base-300/50">
      <div className="flex flex-col">
        <h1 className="bg-base-300 p-4 text-2xl font-bold border-b-2 border-base-content/50 ">
          Communication
        </h1>
        <div className="flex flex-col gap-2 p-8 pt-4">
          <p>
            <span className="font-bold">Language(s) :</span>{" "}
            {country.languages.map((e) => e.name).join(", ")}
          </p>
          <p>
            <span className="font-bold">
              International direct dialing (IDD) :
            </span>{" "}
            {`${country.idd.root}${country.idd.suffixes[0]}`}
          </p>
          <p>
            <span className="font-bold">Top level domain :</span>{" "}
            {country.tld.join(" — ")}{" "}
          </p>
        </div>
      </div>
    </div>
  );

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
      <div className="pt-16">
        <img
          className="absolute inset-0 -z-[1] h-[30rem] rounded-r-3xl
          rounded-br-full opacity-40 blur-lg transition-all group-hover:scale-150"
          src={country.flags.png}
          alt={country.name.common}
        />
        <div className="flex flex-wrap justify-start items-start gap-8 p-8 sm:flex-row">
          {RENDER_FLAG()}
          {/* <div className="">
            <div className="grid gap-4">
              {RENDER_NAME()}
              {RENDER_OTHER_NAMES()}
              {RENDER_CAPITALS()}
              {RENDER_LANGUAGES()}
              {RENDER_REGIONS()}
              {RENDER_AREA()}
              {RENDER_CURRENCIES()}
            </div>
          </div> */}
          {RENDER_INFO_NAMING()}
          {RENDER_INFO_GEOGRAPHIC()}
          {RENDER_INFO_POLITIC()}
          {RENDER_INFO_GENERIC()}
          {RENDER_INFO_COMMUNICATION()}
        </div>
      </div>
    </>
  );
}

export default Details;
