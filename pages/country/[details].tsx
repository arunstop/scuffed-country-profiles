import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";
import React from "react";
import { Country } from "../../utils/data/models/Country";
import countryListRaw from "../../public/CountryProfileList.json";
import {
  toCurrencyList,
  toLanguageList,
  toTranslationList,
} from "../../utils/helpers/Casters";

interface CountryDetailsProps {
  country: Country;
}

export const getServerSideProps: GetServerSideProps<
  CountryDetailsProps
> = async (context) => {
  // console.log(context);
  const target = countryListRaw.find(
    (country) =>
      country.cca2.toLowerCase() ===
      (context.query.details as string).toLowerCase(),
  );
  const countryTarget: Country = {
    ...target,
    name: {
      ...target?.name,
      nativeName: toTranslationList(target?.name.nativeName || {}),
    },
    languages: toLanguageList(target?.languages || {}),
    translations: toTranslationList(target?.translations || {}),
    currencies: toCurrencyList(target?.currencies || {}),
  } as unknown as Country;
  console.log(countryTarget);

  return {
    props: { country: countryTarget },
    notFound: !!target === false,
  };
};

function Details({ country }: CountryDetailsProps) {
  //   const router = useRouter();
  //   const { country } = router.query;

  return <div>{country.name.common}</div>;
}

export default Details;
