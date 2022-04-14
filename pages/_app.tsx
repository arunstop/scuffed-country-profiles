import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider } from "../utils/contexts/ui/UiProvider";
import { CountryProvider } from "../utils/contexts/country/CountryProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CountryProvider>
      <UiProvider>
        <Component {...pageProps} />
      </UiProvider>
    </CountryProvider>
  );
}

export default MyApp;
