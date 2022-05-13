import { getApiError } from "./../../../utils/helpers/Fetchers";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreApiGetCountriesByCca3 } from "../../../utils/apis/FirestoreApi";
import { countryDb } from "../../../utils/apis/FirestoreClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // codes = cca3
    const { codes } = req.query;
    if (!codes)
      return res.status(200).json(getApiError("Codes (cca3) cannot be empty"));
    const result = await firestoreApiGetCountriesByCca3(countryDb, codes + "");
    return res.status(200).json(result);
  } else {
    return res.status(404);
  }
}
