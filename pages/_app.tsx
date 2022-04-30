import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider } from "../utils/contexts/ui/UiProvider";
import { CountryProvider } from "../utils/contexts/country/CountryProvider";
import ScrollToTopButton from "../components/ScrollToTopButton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CountryProvider>
      <UiProvider>
        <>
          <Component {...pageProps} />
          <ScrollToTopButton />
        </>
      </UiProvider>
    </CountryProvider>
  );
}

export default MyApp;
