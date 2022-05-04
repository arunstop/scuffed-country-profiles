import React, { ReactNode, useState } from "react";
import { SiGooglemaps, SiOpenstreetmap } from "react-icons/si";
import { Country } from "../../utils/data/models/Country";

type TabTypes = "GM" | "OSM";
interface Tab {
  type: TabTypes;
  title: string;
  icon: ReactNode;
}

function MapSectionDetails({ country }: { country: Country }) {
  const [selectedTab, setSelectedTab] = useState<TabTypes>("GM");

  const tabList: Tab[] = [
    { type: "GM", title: "Google Maps", icon: <SiGooglemaps /> },
    { type: "OSM", title: "Open Street Maps", icon: <SiOpenstreetmap /> },
  ];

  // get last item of string that split with "/" from maps.google.com/maps/[google id]
  const googleMapsId = country.maps.googleMaps.split("/").slice(-1).pop();

  function RENDER_TAB(tab: Tab) {
    return (
      <a
        key={tab.type}
        className={`tab tab-lg bg-base-300 transition-all border-b-2 gap-4 
        [--tw-text-opacity:1] grow
        ${
          selectedTab === tab.type
            ? "tab-active bg-neutral text-base-300 font-bold border-neutral"
            : "border-base-content/30"
        }`}
        onClick={() => setSelectedTab(tab.type)}
      >
        <span className="text-2xl">{tab.icon}</span>
        {tab.title}
      </a>
    );
  }

  // return (
  //   <div className="flex w-full px-8 flex-col">
  //     <div
  //       className="tabs !rounded-t-lg sm:self-start overflow-hidden
  //       bg-base-300"
  //     >
  //       {tabList.map((tItem) => RENDER_TAB(tItem))}
  //     </div>
  //     <div className="w-full bg-base-300/50 rounded-lg rounded-t-none sm:rounded-tr-lg p-4">
  //       <iframe
  //         src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDAbH3rHf8-KxQ7nJwOlbvY23sMrO4zpNU&q=${country.name.common}&region=${country.cca2}&zoom=9`}
  //         loading="lazy"
  //         allowFullScreen
  //         referrerPolicy="no-referrer-when-downgrade"
  //         className={`w-full rounded-lg ${
  //           selectedTab === "GM" ? "visible" : "hidden"
  //         }`}
  //         height={450}
  //       />
  //       <iframe
  //         src={
  //           "https://www.openstreetmap.org/export/embed.html?relation=59470" +
  //           country.maps.openStreetMaps
  //         }
  //         className={`w-full rounded-lg ${
  //           selectedTab === "OSM" ? "visible" : "hidden"
  //         }`}
  //         frameBorder={0}
  //         scrolling="no"
  //         marginHeight={0}
  //         marginWidth={0}
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-start px-8">
      <h2
        className="self-start rounded-t-lg border-b-2 border-base-content/10 bg-base-300
             p-4 text-2xl font-bold"
      >
        Maps of {country.name.common}
      </h2>
      <div className="flex w-full flex-col gap-2 rounded-b-lg rounded-t-none rounded-tr-lg bg-base-300/50 p-8 sm:w-auto">
        <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap">
          <a
            className="hover:bg-content-base btn-outline btn h-32 grow
            flex-col gap-4 rounded-lg normal-case sm:grow-0"
            href={country.maps.googleMaps}
            target="_blank"
            rel="noreferrer"
            title="Open in Google Maps"
            tabIndex={-1}
          >
            <SiGooglemaps className="pointer-events-none text-5xl" />
            <span className="text-lg">Open in Google Maps</span>
          </a>
          <a
            className="hover:bg-content-base btn-outline btn h-32 grow 
            flex-col gap-4 rounded-lg normal-case sm:grow-0"
            href={country.maps.openStreetMaps}
            target="_blank"
            rel="noreferrer"
            title="Open in Open Street Maps"
            tabIndex={-1}
          >
            <SiOpenstreetmap className="pointer-events-none text-5xl" />
            <span className="text-lg">Open in Open Street Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MapSectionDetails;
