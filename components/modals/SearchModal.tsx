import _ from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import { MdClose, MdOutlineSearch, MdPlace } from "react-icons/md";
import { useCountryContext } from "../../utils/contexts/country/CountryHook";

function SearchModal() {
  const [keyword, setKeyword] = useState("");
  const { state: countryState, action: countryAction } = useCountryContext();

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
          cItem.altSpellings.join(" — ").toLowerCase().includes(keyword);
  });
  return (
    <>
      {/* <input type="checkbox" id="search-modal" className="modal-toggle" /> */}
      <a
        id="search-modal"
        className="modal modal-bottom sm:modal-middle"
        href="#"
      >
        <label className="modal-box cursor-auto p-0" htmlFor="">
          <div className="flex flex-col gap-4  p-4">
            <h3 className="font-semibold text-xl">Search countries...</h3>
            <label className="input-group-lg input-group max-w-lg relative">
              <span className="">
                <MdOutlineSearch className="text-2xl" />
              </span>
              <label
                className={`btn !btn-circle !btn-sm my-auto mx-2 
            absolute inset-y-0 right-0 btn-error btn-outline bg-opacity-60
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
                placeholder="Search…"
                onChange={(e) => {
                  setKeyword(e.target.value.trim());
                }}
              />
            </label>
            <div className="flex flex-wrap  max-h-96 overflow-auto pr-4">
              {searchedCountryList.map((cItem, idx) => {
                return (
                  <Link key={idx} href={`/country/${cItem.cca2}/`} passHref>
                    <a
                      className="flex w-full gap-4 p-4 hover:bg-neutral-focus hover:rounded-lg"
                      onClick={() => {
                        document.getElementById("search-modal")?.click();
                      }}
                    >
                      <img className="h-12 rounded-lg" src={cItem.flags.svg} />
                      <div className="grow flex flex-col">
                        <span className="font-semibold text-xl">
                          {cItem.name.common}
                        </span>
                        <span className="opacity-60 inline-flex gap-1 items-center">
                          <MdPlace className="text-lg" />
                          {cItem.capital?.join(", ") || "-"}
                        </span>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
            {/* <div className="modal-action">
            <label htmlFor="search-modal" className="btn">
              Yay!
            </label>
          </div> */}
          </div>
        </label>
      </a>
    </>
  );
}

export default SearchModal;
