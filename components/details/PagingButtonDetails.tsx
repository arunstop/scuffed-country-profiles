import Link from "next/link";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Country } from "../../utils/data/models/Country";

function PagingButtonDetails({
  isPrevBtn,
  targetCountry,
}: {
  isPrevBtn: boolean;
  targetCountry: Country;
}) {
  return (
    <Link href={`/country/${targetCountry?.cca2}`} passHref>
      <a
        className={`btn btn-lg normal-case py-4 h-auto w-auto flex-1 
    hover:underline bg-base-300 border-0 text-base-content
    hover:bg-neutral/50
    ${isPrevBtn ? "justify-start" : "justify-end"}
  `}
        role={"button"}
      >
        <div
          className={`flex flex-col gap-4 items-start
    ${isPrevBtn ? "items-start" : "items-end"}`}
        >
          <span
            className={`inline-flex gap-2 ${
              isPrevBtn ? "" : "flex-row-reverse"
            }`}
          >
            {isPrevBtn ? (
              <FaChevronLeft className="text-lg" />
            ) : (
              <FaChevronRight className="text-lg" />
            )}
            <span className="font-normal capitalize">
              {isPrevBtn ? "Previous" : "Next"}
            </span>
          </span>
          <div
            className={`inline-flex gap-4 items-center 
      ${isPrevBtn ? "" : "flex-row-reverse"}`}
          >
            <img className="h-16 rounded-lg" src={targetCountry?.flags.svg} />
            <p
              className={`text-left flex flex-col gap-2
         ${isPrevBtn ? "text-left" : "text-right"}`}
            >
              <span className="text-xl">{targetCountry?.name.common}</span>
              <span className="font-normal">
                {targetCountry?.name.official}
              </span>
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default PagingButtonDetails;
