import _ from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import { MdClose, MdOutlineSearch, MdPlace } from "react-icons/md";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";
import CircularProgress from "../CircularProgress";

export function toggleSearchModal(value: boolean) {
  getSearchModalElement().checked = value;
  const inputSearch = getSearchModalInput();
  inputSearch.value = "";
  searchModalOnChange(value);
}

export function getSearchModalInput() {
  return document.getElementById("search-modal-input") as HTMLInputElement;
}

export function searchModalOnChange(value: boolean) {
  if (value === true) {
    setTimeout(() => {
      const inputSearch = getSearchModalInput();
      inputSearch.focus();
    }, 500);
    // if (inputSearch) {
    //   inputSearch.scrollIntoView();
    // }
    // console.log(
    //   document.getElementById("search-modal-input") as HTMLInputElement,
    // );
  }
}

export const getSearchModalElement = () => {
  return document.getElementById("search-modal") as HTMLInputElement;
};

function SearchModal() {
  const [keyword, setKeyword] = useState("");
  const {
    state: countryState,
    action: countryAction,
    getters: {
      list: { noData },
    },
  } = useCountryContext();

  const searchedCountryList = _.orderBy(
    countryState.list,
    [(e) => e.name.common],
    ["asc"],
  ).filter((cItem) => {
    return keyword.length < 2
      ? true
      : // common name
        cItem.name.common.toLowerCase().includes(keyword) ||
          // official name
          cItem.name.official.toLowerCase().includes(keyword) ||
          // native names
          cItem.name.nativeName
            .map((e) => `${e.common} · ${e.official}`)
            .join(" — ")
            .toLowerCase()
            .includes(keyword) ||
          // more names
          cItem.altSpellings.join(" — ").toLowerCase().includes(keyword) ||
          (cItem.capital?.join(" — ") || "").toLowerCase().includes(keyword);
  });

  const RENDER_COUNTRY_LIST = () => {
    if (noData) {
      return (
        <span className="inline-flex h-24 items-center justify-center gap-4">
          <CircularProgress size={2} />
          <span>Loading countries...</span>
        </span>
      );
    }
    // when data is loaded but empty
    else if (searchedCountryList.length == 0) {
      return <div className="mx-auto mt-12">No result found.</div>;
    }
    // when data is loaded and not empty
    else {
      return searchedCountryList.map((cItem, idx) => {
        return (
          <Link key={idx} href={`/country/${cItem.cca2}/`} passHref>
            <a
              className="flex w-full gap-4 p-4 hover:rounded-lg hover:bg-base-content/30"
              onClick={() => {
                // hide the modal
                toggleSearchModal(false);
                setKeyword("");
              }}
            >
              <img
                className="h-12 rounded-md ring-1 ring-slate-600/30"
                src={cItem.flags.svg}
              />
              <div className="flex grow flex-col">
                <span className="text-xl font-semibold">
                  {cItem.name.common}
                </span>
                <span className="inline-flex items-center gap-1 opacity-60">
                  <MdPlace className="text-lg" />
                  {cItem.capital?.join(", ") || "-"}
                </span>
              </div>
            </a>
          </Link>
        );
      });
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="search-modal"
        className="modal-toggle"
        onChange={(ev) => {
          searchModalOnChange(ev.target.checked);
          setKeyword("");
        }}
      />
      {/* Use <label/> to make modal to close when the overlay clicked */}
      <label
        htmlFor="search-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <label className="modal-box cursor-auto p-0 transition-all" htmlFor="">
          <div className="flex flex-col gap-4  p-4">
            <div className="inline-flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Search countries</h3>
              <label
                className="btn-outline btn btn-error btn-sm btn-circle"
                htmlFor="search-modal"
              >
                <MdClose className="text-2xl" />
              </label>
            </div>
            <label className="input-group-lg input-group relative max-w-lg">
              <span className="">
                <MdOutlineSearch className="text-2xl" />
              </span>
              <label
                className={`btn !btn-circle !btn-sm my-auto mx-2 
                absolute inset-y-0 right-0 bg-opacity-60 
                btn-outline border-0 text-error
                ${keyword.length ? "visible" : "hidden"}`}
                onClick={() => {
                  setKeyword("");
                }}
              >
                <MdClose className="text-2xl" />
              </label>
              <input
                id="search-modal-input"
                className="input-bordered input w-full pr-12"
                value={keyword}
                type="text"
                placeholder="Name / Name of capital..."
                onChange={(e) => {
                  setKeyword(e.target.value.trim().toLowerCase());
                }}
                disabled={noData}
              />
            </label>
            <div className="flex h-96 flex-col overflow-auto pr-4 items-start">
              {RENDER_COUNTRY_LIST()}
            </div>
            {/* <div className="modal-action">
            <label htmlFor="search-modal" className="btn">
              Yay!
            </label>
          </div> */}
          </div>
        </label>
      </label>
    </div>
  );
}

export default SearchModal;
