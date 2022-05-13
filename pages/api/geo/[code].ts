import { ApplicableGeoJSONObject } from "./../../../utils/data/types/Geo";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreApiGetCountryGeo } from "../../../utils/apis/FirestoreApi";
import { getApiError } from "../../../utils/helpers/Fetchers";
import { countryGeoDb } from "./../../../utils/apis/FirestoreClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // codes = cca3
    const { code } = req.query;
    if (!code)
      return res.status(200).json(getApiError("Code (cca3) cannot be empty"));
    const result = await firestoreApiGetCountryGeo(countryGeoDb, code + "");
    if (!result) {
      return res.status(200).json(null);
    } else {
      return res.status(200).json({
        type: result.type,
        features: [
          {
            type: result.type,
            properties: result.properties,
            geometry: {
              type: result.geometry.type,
              coordinates: JSON.parse(result.geometry.coordinates),
            },
          },
        ],
      } as ApplicableGeoJSONObject);
    }
  } else {
    return res.status(404);
  }
}
