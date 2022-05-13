// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreApiGetCountriesBySubregion } from "../../../../utils/apis/FirestoreApi";
import { countryDb } from "../../../../utils/apis/FirestoreClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { subregion } = req.query;
    // if (!cca3) return res.status(200).json(getApiError("Subregion cannot be empty"));
    const result = await firestoreApiGetCountriesBySubregion(
      countryDb,
      subregion + "",
    );
    return res.status(200).json(result);
  } else {
    return res.status(404);
  }
}
