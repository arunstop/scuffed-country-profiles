import { GeoJsonObject } from "geojson";
import { LatLngExpression, Map } from "leaflet";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { apiGetGeoCountry } from "../../utils/apis/CountryApi";
import { Country } from "../../utils/data/models/Country";
// import "leaflet/dist/leaflet.css";

function RealMapSectionDetails({ country }: { country: Country }) {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | string | null>(
    null,
  );
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
  return (
    <>
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
          {typeof geoJsonData !== "string" && (
            <GeoJSON key={Math.random()} data={geoJsonData as GeoJsonObject} />
          )}
          {/* <GeoJSON data={geoJsonData as GeoJsonObject} /> */}
        </MapContainer>
        <div
          className="absolute top-0 right-0 mt-[10px] mr-[10px] flex flex-col 
          divide-y-2 divide-slate-400 overflow-hidden rounded-md"
        >
          {/* <div> */}
          <button
            className="btn btn-square btn-sm rounded-none"
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
    </>
  );
}

export default RealMapSectionDetails;
