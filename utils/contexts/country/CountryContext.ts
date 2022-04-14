import { createContext } from "react";
import { CountryContextProps } from "../../data/types/CountryTypes";

export const CountryContext = createContext<CountryContextProps>(
  {} as CountryContextProps,
);
