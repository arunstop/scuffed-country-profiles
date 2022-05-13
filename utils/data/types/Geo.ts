export interface ApplicableGeoJSONObject {
  type: string;
  features: GeoJSONFeature[];
}

interface GeoJSONFeature {
  type: "string";
  properties: any;
  geometry: {
    type: "string";
    coordinates: [];
  };
}