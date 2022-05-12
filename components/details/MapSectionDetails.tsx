import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { SiGooglemaps, SiOpenstreetmap } from "react-icons/si";
import { Country } from "../../utils/data/models/Country";
import LoadingPlaceholderDetails from "./LoadingPlaceholderDetails";
// import "leaflet/dist/leaflet.css";

const LazyMapDetails = dynamic(
  () => import("../../components/details/MapDetails"),
  {
    ssr: false,
    loading: () => <LoadingPlaceholderDetails label={`Loading map...`} />,
  },
);

function MapSectionDetails({ country }: { country: Country }) {
  function RENDER_MAP() {
    return <LazyMapDetails key={country.cca2} country={country} />;
  }

  function RENDER_EXTERNAL_MAP_LINK({
    url,
    title,
    icon,
  }: {
    url: string;
    title: string;
    icon: ReactNode;
  }) {
    return (
      <a
        className="hover:bg-content-base btn-base border-0 bg-opacity-50 btn h-auto grow 
        gap-x-4 gap-y-2 rounded-lg p-4 normal-case sm:grow-0 hover:bg-opacity-100"
        href={url}
        target="_blank"
        rel="noreferrer"
        title="Open in Open Street Maps"
        tabIndex={-1}
      >
        {icon}
        <span className="">{title}</span>
      </a>
    );
  }

  function RENDER_OPTIONS() {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {RENDER_EXTERNAL_MAP_LINK({
          url: country.maps.googleMaps,
          title: "Open in Google Maps",
          icon: (
            <SiGooglemaps className="pointer-events-none text-xl sm:text-2xl" />
          ),
        })}
        {RENDER_EXTERNAL_MAP_LINK({
          url: country.maps.openStreetMaps,
          title: "Open in Open Street Maps",
          icon: (
            <SiOpenstreetmap className="pointer-events-none text-xl sm:text-2xl" />
          ),
        })}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-start px-8">
        <h2
          className="self-start rounded-t-lg border-b-2 
          border-base-content/10 bg-base-300 p-4 text-2xl font-bold"
        >
          Maps of {country.name.common}
        </h2>
        <div
          className="flex min-h-[12rem] w-full flex-col gap-8 
          overflow-hidden rounded-lg rounded-tl-none bg-base-300/50 p-8"
        >
          {RENDER_MAP()}
          {RENDER_OPTIONS()}
        </div>
      </div>
    </>
  );
}

export default MapSectionDetails;
