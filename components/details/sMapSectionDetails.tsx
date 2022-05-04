import { GeoJsonObject } from "geojson";
import { LatLngExpression } from "leaflet";
import React, { useEffect, useState } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { apiGetGeoCountry } from "../../utils/apis/CountryApi";
import { Country } from "../../utils/data/models/Country";
import LoadingPlaceholderDetails from "./LoadingPlaceholderDetails";
// import "leaflet/dist/leaflet.css";

function RealMapSectionDetails({ country }: { country: Country }) {
  const gjo: GeoJsonObject =
    JSON.parse(`{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"cca2":"aw"},
    "geometry":{"type":"Polygon","coordinates":[[[-69.882233,12.41111],[-69.946945,12.436666],[-70.056122,12.534443],
    [-70.059448,12.538055],[-70.060287,12.544167],[-70.063339,12.621666],[-70.063065,12.628611],[-70.058899,12.631109],
    [-70.053345,12.629721],[-70.035278,12.61972],[-70.031113,12.616943],[-69.932236,12.528055],[-69.896957,12.480833],
    [-69.891403,12.472221],[-69.885559,12.457777],[-69.873901,12.421944],[-69.873337,12.415833],[-69.876114,12.411665],[-69.882233,12.41111]]]}}]}
    `) as GeoJsonObject;

  const [geoJsonData, setGeoJsonData] = useState<any>();

  useEffect(() => {
    loadGeoCountry();
    return () => {};
  }, []);

  async function loadGeoCountry() {
    const data = await apiGetGeoCountry(country.cca3);
    console.log("data " + data);
    if (typeof data === "string") setGeoJsonData(data);
    else setGeoJsonData(data);
  }

  const capitalLtLng: LatLngExpression = [
    country.capitalInfo.latlng[0],
    country.capitalInfo.latlng[1],
  ];
  return (
    <>
      <div
        className="flex flex-wrap items-start w-full 
      justify-start gap-8 p-8 sm:flex-row "
      >
        <div className="flex w-full min-h-[12rem] px-8 bg-base-300/50 rounded-lg overflow-hidden">
          {typeof geoJsonData === "string" ? (
            <LoadingPlaceholderDetails
              label={`Loading map of ${country.name.common}...`}
            />
          ) : (
            <>
              <MapContainer
                className="h-96 w-screen"
                center={capitalLtLng}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={capitalLtLng}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                <GeoJSON data={gjo} />
              </MapContainer>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RealMapSectionDetails;
