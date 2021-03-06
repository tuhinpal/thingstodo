import { getplaceCache, purgeCache } from "./lib/cache";
import jsonResponse from "./lib/jsonResponse";
import place from "./src/place";
import search from "./src/search";
import searchAndGo from "./src/seratch-and-go";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const path = new URL(request.url).pathname;

  if (request.method == "OPTIONS") {
    // Handel Preflight Requests

    return jsonResponse({
      data: {
        message: "Preflight request successful!",
      },
    });
  }

  switch (path) {
    case "/":
      return jsonResponse({
        data: {
          message: "Working!",
          search: "/search?query={query}",
          place: "/place/{id}",
          madeBy: "tuhinpal <me@thetuhin.com>",
          github: "https://github.com/tuhinpal/thingstodo",
        },
      });

    case "/search":
      return search({
        query: new URL(request.url).searchParams.get("query"),
      });

    case `/search-and-go/${path.split("/")[2]}`:
      var searchCache = await getplaceCache(`search-${path.split("/")[2]}`);

      if (searchCache) {
        return jsonResponse({
          data: searchCache,
          headers: {
            cache: "HIT",
          },
        });
      } else {
        return searchAndGo({
          query: path.split("/")[2],
        });
      }

    case `/place/${path.split("/")[2]}`:
      var getcache = await getplaceCache(path.split("/")[2]);
      if (getcache) {
        return jsonResponse({
          data: getcache,
          headers: {
            cache: "HIT",
          },
        });
      } else {
        return place({
          id: path.split("/")[2],
        });
      }

    case `/purge/${SECRET}`: // set SECRET in environment variables at cf dashboard
      var deleted = await purgeCache();
      return jsonResponse({
        data: {
          message: "Cache purged!",
          deleted,
        },
      });

    default:
      return jsonResponse({
        data: {
          message: "Not found!",
        },
        status: 404,
      });
  }
}
