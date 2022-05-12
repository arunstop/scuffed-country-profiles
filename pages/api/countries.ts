import { countryDb } from "./../../utils/apis/FirestoreClient";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreApiGetCountryList } from "../../utils/apis/CountryApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  res
    .status(200)
    .json(
      await firestoreApiGetCountryList(countryDb).then((e) =>
        e.map((e) => e.name.common),
      ),
    );
}
