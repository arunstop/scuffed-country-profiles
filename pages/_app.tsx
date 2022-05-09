import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import LinearProgress from "../components/LinearProgress";
import ScrollToTopButton from "../components/ScrollToTopButton";
import "../styles/globals.css";
import { CountryProvider } from "../utils/contexts/country/CountryProvider";
import { UiProvider } from "../utils/contexts/ui/UiProvider";

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  // const [navigating, setNavigating] = useState(false);

  // function onRoutheChangeStart() {
  //   setNavigating(true);
  // }

  // function onRoutheChangeComplete() {
  //   setNavigating(false);
  // }

  // useEffect(() => {
  //   router.events.on("routeChangeStart", onRoutheChangeStart);
  //   // router.events.on("hashChangeStart", onRoutheChangeStart);
  //   router.events.on("routeChangeComplete", onRoutheChangeComplete);
  //   return () => {
  //     router.events.off("routeChangeStart", onRoutheChangeStart);
  //     router.events.off("routeChangeComplete", onRoutheChangeComplete);
  //   };
  // }, [router]);

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
