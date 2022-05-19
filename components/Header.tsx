import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineSearch,
  MdSearch,
} from "react-icons/md";
import { apiGetCountryList } from "../utils/apis/CountryApi";
import { useCountryContext } from "../utils/contexts/country/CountryHook";
import { useUiContext } from "../utils/contexts/ui/UiHook";
import Logo from "./Logo";
import { searchModalOnChange } from "./modals/SearchModal";

export default function Header() {
  const { state: uiState, action: uiAction } = useUiContext();
  const {
    action: countryAction,
    getters: {
      list: { noData },
      isFiltered,
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
    if (noData()) {
      apiGetCountryList().then((response) => {
        if (response.ok === false) return;
        countryAction.setCountryList(response.data);
        searchModalOnChange(true);
      });
    }
  }

  return (
    <header
      className="sticky top-0 z-10 flex h-16 w-full
      items-center gap-4 bg-base-100/90 p-4 shadow-lg transition-colors
      justify-between"
    >
      <Link href={"/#countries"} passHref>
        <a className="inline-flex items-center gap-2">
          <Logo />
          <span
            className={`${
              router.pathname !== "/" ? "hidden sm:block" : ""
            } text-lg sm:text-xl font-semibold italic`}
          >
            Country Profiles
          </span>
        </a>
      </Link>
      {/* Only show searchbar in header when not on index page */}
      {router.pathname !== "/" && (
        <label
          id="search-modal-btn"
          htmlFor="search-modal"
          className="btn btn-sm h-auto w-60 sm:w-72 border-0 bg-base-300 p-2 font-normal 
          normal-case text-base-content ring-2 ring-slate-500/10 hover:bg-neutral/50"
          onClick={() => {
            loadCountryList();
          }}
        >
          <span className="mr-2 text-2xl">
            <MdOutlineSearch />
          </span>
          <span className="text-md opacity-50">Quick search...</span>
          <span className="ml-auto">
            <kbd className="kbd kbd-sm border-base-content/50 text-base-content">
              Ctrl + /
            </kbd>
          </span>
        </label>
      )}
      <div className="inline-flex items-center justify-center gap-4 ">
        {router.pathname === "/" && (
          <div className="indicator sm:hidden">
            <span
              className={`indicator-item badge bg-red-500 border-0 h-4 w-4 p-0 ${
                isFiltered ? "visible" : "invisible"
              }`}
            ></span>
            <label
              htmlFor="main-filter-modal"
              className={` 
              border-2 btn btn-outline min-h-min !h-10 !w-10 !p-0
              border-opacity-50
          ${isFiltered ? "btn-primary" : "border-transparent"}`}
              tabIndex={0}
            >
              <MdSearch
                title="Open filter"
                className="text-3xl"
                role={"button"}
              />
            </label>
          </div>
        )}
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
