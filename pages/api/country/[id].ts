// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  firestoreApiGetCountry,
  firestoreApiGetCountryAll,
} from "../../../utils/apis/CountryApi";
import { countryDb } from "../../../utils/apis/FirestoreClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (id === "all") {
      res.status(200).json(
        await firestoreApiGetCountryAll(countryDb).then(
          (e) => e,
          // e.map((e) => e.name.common),
        ),
      );
    } else {
      const result = await firestoreApiGetCountry(countryDb, id.toString());
      if (!result) {
        res.status(200).json({ error: true, message: "Not result found." });
      } else {
        res.status(200).json(result);
      }
    }
  } else {
    res.status(404).json({ error: true, message: "Not found." });
  }
}
