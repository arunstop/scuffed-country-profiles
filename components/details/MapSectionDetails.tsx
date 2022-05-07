import { GeoJsonObject } from "geojson";
import { LatLngExpression, Map } from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { ReactNode, useEffect, useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { SiGooglemaps, SiOpenstreetmap } from "react-icons/si";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { apiGetGeoCountry } from "../../utils/apis/CountryApi";
import { Country } from "../../utils/data/models/Country";
import LoadingPlaceholderDetails from "./LoadingPlaceholderDetails";
// import "leaflet/dist/leaflet.css";

function MapSectionDetails({ country }: { country: Country }) {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | string>();
  const [map, setMap] = useState<Map | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    loadGeoCountry();
    return () => {};
  }, []);

  async function loadGeoCountry() {
    // if (typeof geoJsonData !== "string") return;
    const data = await apiGetGeoCountry(country.cca3);
    // console.log("data " + data);
    if (typeof data === "string") setGeoJsonData(data);
    else setGeoJsonData(data as GeoJsonObject);
    // const xd: GeoJsonObject = JSON.parse(data) as GeoJsonObject;
    // console.log(_.isEqual(gjo, xd));
  }

  const capitalLtLng: LatLngExpression = [
    country.capitalInfo.latlng[0],
    country.capitalInfo.latlng[1],
  ];

  function toggleFullscreen(value: boolean) {
    setFullscreen(value);
    const mapContainer = document.getElementById("map-container");
    // fullscreen mode
    mapContainer?.classList.toggle("rounded-lg");
    if (value === true) {
      map?.scrollWheelZoom.enable();
      mapContainer?.classList.remove("h-96");
      mapContainer?.classList.add("h-screen");
    } else {
      map?.scrollWheelZoom.disable();
      mapContainer?.classList.remove("h-screen");
      mapContainer?.classList.add("h-96");
    }
  }

  function RENDER_MAP() {
    return (
      <div
        className={`w-full rounded-lg ${
          fullscreen ? "fixed z-10 inset-0" : "relative"
        } transition-all`}
      >
        <MapContainer
          id="map-container"
          key={country.cca3}
          className={`w-full rounded-lg overflow-hidden z-0 h-96 transition-all`}
          center={capitalLtLng}
          zoom={5}
          scrollWheelZoom={false}
          ref={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={capitalLtLng}>
            <Popup>{country.capital[0]}</Popup>
          </Marker>
          <GeoJSON key={Math.random()} data={geoJsonData as GeoJsonObject} />
          {/* <GeoJSON data={geoJsonData as GeoJsonObject} /> */}
        </MapContainer>
        <div
          className="absolute top-0 right-0 mt-[10px] mr-[10px] flex flex-col 
          overflow-hidden rounded-md divide-slate-400 divide-y-2"
        >
          {/* <div> */}
          <button
            className="btn btn-sm btn-square rounded-none"
            title={`${fullscreen ? "Exit fullscreen" : "Fullscreen"}`}
            onClick={() => {
              toggleFullscreen(!fullscreen);
            }}
          >
            {fullscreen ? (
              <MdFullscreenExit className="text-2xl" />
            ) : (
              <MdFullscreen className="text-2xl" />
            )}
          </button>
          {/* </div> */}
          {/* <div> */}
          <button
            className={`btn btn-sm btn-square rounded-none`}
            title={`Reset position`}
            onClick={() => {
              // console.log(map);
              map?.setView(capitalLtLng, 5);
            }}
          >
            <FaMapMarkerAlt className="text-xl" />
          </button>
          {/* </div> */}
        </div>
      </div>
    );
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
        className="hover:bg-content-base btn-outline btn grow  gap-4 rounded-lg normal-case sm:grow-0"
        href={url}
        target="_blank"
        rel="noreferrer"
        title="Open in Open Street Maps"
        tabIndex={-1}
      >
        {icon}
        <span className="text-lg">{title}</span>
      </a>
    );
  }

  function RENDER_OPTIONS() {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {RENDER_EXTERNAL_MAP_LINK({
          url: country.maps.googleMaps,
          title: "Open in Google Maps",
          icon: <SiGooglemaps className="pointer-events-none text-2xl" />,
        })}
        {RENDER_EXTERNAL_MAP_LINK({
          url: country.maps.openStreetMaps,
          title: "Open in Open Street Maps",
          icon: <SiOpenstreetmap className="pointer-events-none text-2xl" />,
        })}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-start px-8">
        <h2
          className="self-start rounded-t-lg border-b-2 border-base-content/10 bg-base-300
             p-4 text-2xl font-bold"
        >
          Maps of {country.name.common}
        </h2>
        <div className="flex flex-col w-full min-h-[12rem] p-8 bg-base-300/50 rounded-lg rounded-t-none rounded-r-lg overflow-hidden gap-8">
          {typeof geoJsonData === "string" ? (
            <LoadingPlaceholderDetails
              label={`Loading map of ${country.name.common}...`}
            />
          ) : (
            RENDER_MAP()
          )}
          {RENDER_OPTIONS()}
        </div>
      </div>
    </>
  );
}

export default MapSectionDetails;
