import type { AppProps } from "next/app";
import LinearProgress from "../components/LinearProgress";
import ScrollToTopButton from "../components/ScrollToTopButton";
import "../styles/globals.css";
import { CountryProvider } from "../utils/contexts/country/CountryProvider";
import { UiProvider } from "../utils/contexts/ui/UiProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CountryProvider>
      <UiProvider>
        <>
          <LinearProgress />
          <Component {...pageProps} />
          <ScrollToTopButton />
        </>
      </UiProvider>
    </CountryProvider>
  );
}

export default MyApp;
