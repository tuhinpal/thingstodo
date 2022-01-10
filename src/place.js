import { setplaceCache } from "../lib/cache";
import createMapDeeplink from "../lib/createMapDeeplink";
import jsonResponse from "../lib/jsonResponse";
import processImage from "../lib/processImage";

export default async function place({ id }) {
  try {
    const response = await fetch(
      "https://www.google.com/_/TravelFrontendUi/data/batchexecute",
      {
        method: "POST",
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          origin: "https://www.google.com",
        },
        body: `f.req=%5B%5B%5B%22MJuoKd%22%2C%22%5B%5C%22%2Fm%2F${id}%5C%22%2Cnull%2C%5C%22ut%5C%22%2C%5Bnull%2C%5B%5D%5D%2C%5C%22%5C%22%2C0%2C%5C%22%2Ftravel%2Fthings-to-do%3Fdest_src%3Dut%26tcfs%3Dthingstodo%26dest_mid%3D%252Fm%252F${id}%26client%3Dms-android-vivo%5C%22%2Cnull%2Cnull%2C%5C%22%5C%22%5D%22%2Cnull%2C%221%22%5D%2C%5B%22WR9Xq%22%2C%22%5Bnull%2C%5B%5C%22%2Fm%2F${id}%5C%22%5D%5D%22%2Cnull%2C%222%22%5D%5D%5D&at=thingtodo`,
      }
    ).then((response) => response.text());

    var data = JSON.parse(response.split(")]}'")[1]);
    data = data[1][2];
    data = JSON.parse(data);
    data = data[0][0];
    var placeData = {};
    try {
      placeData = data[0].pop();
    } catch (_) {}
    delete data[0];
    data = data[1];
    if (!data) throw new Error("Id is invalid!");
    data = data.pop();
    data = data[0];

    var processedData = [],
      errors = [];

    data.forEach((item) => {
      try {
        item = item[0];
        let coordinates = {
          lat: item[15] ? item[15][0] : 0,
          long: item[15] ? item[15][1] : 0,
        };

        processedData.push({
          name: item[1],
          description: item[2],
          images: processImage(item[13][0][1]),
          coordinates,
          rating: {
            star: item[25] ? item[25][0] : 0,
            raters: item[25] ? item[25][1] : 0,
          },
          map: createMapDeeplink(coordinates, item[1]),
        });
      } catch (error) {
        try {
          errors.push({
            name: item[0][1],
            message: error.message || error.toString,
          });
        } catch (_) {}
      }
    });

    var object = {
      message: "Things to do fetched!",
      id,
      name: placeData[0] || null,
      description: placeData[2] || null,
      about: placeData[3] || null,
      data: processedData,
      error: {
        message:
          errors.length > 0
            ? "Some errors while processing things to do. Please report this to https://thetuhin.com/contact."
            : "No errors",
        data: errors,
      },
    };

    try {
      await setplaceCache(id, object);
    } catch (_) {}

    return jsonResponse({
      data: object,
      headers: {
        cache: "MISS",
      },
    });
  } catch (error) {
    return jsonResponse({
      data: {
        message: error.message || error.toString(),
      },
      status: error.toString().includes("Id is invalid") ? 404 : 500,
    });
  }
}
