import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineSearch,
} from "react-icons/md";
import { apiGetCountryList } from "../utils/apis/CountryApi";
import { useCountryContext } from "../utils/contexts/country/CountryHook";
import { useUiContext } from "../utils/contexts/ui/UiHook";

export default function Header() {
  const { state: uiState, action: uiAction } = useUiContext();
  const {
    state: countryState,
    action: countryAction,
    getters: {
      list: { noData },
    },
  } = useCountryContext();
  const router = useRouter();

  // useEffect(() => {
  //   // document.removeEventListener("keydown", toggleSearchModalEvent);
  //   if (router.pathname !== "/") {
  //     document.addEventListener("keydown", toggleSearchModalEvent);
  //     // alert(router.pathname);
  //   } else {
  //     document.removeEventListener("keydown", toggleSearchModalEvent);
  //   }

  //   return () => {};
  // }, [router]);

  // function toggleSearchModalEvent(ev: KeyboardEvent) {
  //   // alert(router.pathname);
  //   if (!getSearchModalElement()) return;

  //   const searchedModalOpen = getSearchModalElement().checked;
  //   if (searchedModalOpen && ev.key.toLowerCase() === "escape") {
  //     return toggleSearchModal(!getSearchModalElement().checked);
  //   }
  //   if (ev.ctrlKey && ev.key.toLowerCase() === "/") {
  //     toggleSearchModal(!getSearchModalElement().checked);
  //     loadCountryList();
  //   }
  // }

  async function loadCountryList() {
    if (noData) {
      countryAction.setCountryList(await apiGetCountryList());
    }
  }

  return (
    <header
      className="fixed z-10 flex h-16 w-full items-center
      bg-base-100/90 p-4 shadow-lg transition-colors gap-4"
    >
      <Link href={"/#countries"} passHref>
        <a>Country Profiles</a>
      </Link>
      {/* Only show searchbar in header when not on index page */}
      {router.pathname !== "/" && (
        <label
          htmlFor="search-modal"
          className="btn p-2 w-72 normal-case font-normal h-auto btn-sm ring-2 
        ring-slate-500/10 bg-base-300 border-0 hover:bg-neutral/50 text-base-content"
          onClick={() => {
            loadCountryList();
          }}
        >
          <span className="text-2xl mr-2">
            <MdOutlineSearch />
          </span>
          <span className="text-md opacity-50">Search countries</span>
          <span className="ml-auto">
            <kbd className="kbd kbd-sm text-base-content border-base-content/50">
              Ctrl + /
            </kbd>
          </span>
        </label>
      )}
      <div className="ml-auto inline-flex items-center justify-center gap-4 ">
        {/* <label>Dark mode :</label> */}
        <label className="swap swap-rotate">
          <input
            checked={uiState.darkMode}
            type={"checkbox"}
            onChange={(event) => uiAction.toggleDarkMode(event.target.checked)}
          />
          <MdOutlineLightMode
            title="Turn on dark mode"
            className="swap-on text-3xl"
          />
          <MdOutlineDarkMode
            title="Turn of dark mode"
            className="swap-off text-3xl"
          />
        </label>
      </div>
    </header>
  );
}
