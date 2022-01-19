import { setplaceCache } from "../lib/cache";
import jsonResponse from "../lib/jsonResponse";
import place from "./place";
import search from "./search";

export default async function searchAndGo({ query }) {
  try {
    var getSearchedResults = await search({
      query,
      onlyReturn: true,
    });

    if (getSearchedResults.length === 0) throw new Error("No results found!");

    var getfirstResultId = getSearchedResults[0].id;

    var getplaceResult = await place({
      id: getfirstResultId,
      onlyReturn: true,
    });

    try {
      await setplaceCache(`search-${query}`, getplaceResult);
    } catch (_) {}

    return jsonResponse({
      data: getplaceResult,
      headers: {
        cache: "MISS",
      },
    });
  } catch (error) {
    return jsonResponse({
      data: {
        message: error.message || error.toString(),
      },
      status: error.toString().includes("No results found") ? 404 : 500,
    });
  }
}
