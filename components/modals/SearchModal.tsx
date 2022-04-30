import _ from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import { MdClose, MdOutlineSearch, MdPlace } from "react-icons/md";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";
import CircularProgress from "../CircularProgress";

export function toggleSearchModal(value: boolean) {
  getSearchModalElement().checked = value;
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
  return (
    <>
      <input type="checkbox" id="search-modal" className="modal-toggle" />
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
                ${keyword.length ? "visible" : "hidden"}`}
                onClick={() => {
                  setKeyword("");
                }}
              >
                <MdClose className="text-2xl" />
              </label>
              <input
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
            {noData ? (
              <span className="inline-flex h-24 items-center justify-center gap-4">
                <CircularProgress size={2} />
                <span>Loading countries...</span>
              </span>
            ) : (
              <div className="flex h-96  flex-wrap overflow-auto pr-4">
                {searchedCountryList.map((cItem, idx) => {
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
                          className="h-12 rounded-lg"
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
                })}
              </div>
            )}

            {/* <div className="modal-action">
            <label htmlFor="search-modal" className="btn">
              Yay!
            </label>
          </div> */}
          </div>
        </label>
      </label>
    </>
  );
}

export default SearchModal;
