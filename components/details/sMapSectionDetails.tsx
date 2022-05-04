import { GeoJsonObject } from "geojson";
import { LatLngExpression } from "leaflet";
import React, { useEffect, useState } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { apiGetGeoCountry } from "../../utils/apis/CountryApi";
import { Country } from "../../utils/data/models/Country";
import LoadingPlaceholderDetails from "./LoadingPlaceholderDetails";
// import "leaflet/dist/leaflet.css";

function RealMapSectionDetails({ country }: { country: Country }) {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | string>();

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
  return (
    <>
      <div
        className="flex flex-wrap items-start w-full 
      justify-start gap-8 px-8 sm:flex-row "
      >
        <div className="flex w-full min-h-[12rem] p-8 bg-base-300/50 rounded-lg overflow-hidden">
          {typeof geoJsonData === "string" ? (
            <LoadingPlaceholderDetails
              label={`Loading map of ${country.name.common}...`}
            />
          ) : (
            <>
              <MapContainer
                className="h-96 w-screen"
                center={capitalLtLng}
                zoom={7}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={capitalLtLng}>
                  <Popup>{country.capital[0]}</Popup>
                </Marker>
                <GeoJSON
                  key={Math.random()}
                  data={geoJsonData as GeoJsonObject}
                />
                {/* <GeoJSON data={geoJsonData as GeoJsonObject} /> */}
              </MapContainer>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RealMapSectionDetails;
