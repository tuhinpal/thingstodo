import jsonResponse from "../lib/jsonResponse";

export default async function serach({ query }) {
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
        body: `f.req=%5B%5B%5B%22H028ib%22%2C%22%5B%5C%22${query}%5C%22%2C%5B3%5D%2Cnull%2C%5B0%2C0%5D%2C3%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=thingtodo`,
      }
    ).then((response) => response.text());

    var data = JSON.parse(response.split(")]}'")[1]);
    data = data[0][2];
    data = JSON.parse(data);
    data = data[0];

    var processedData = [],
      errors = [];

    data.forEach((item) => {
      try {
        item = item[0];
        let id = item[4].split("/").pop();

        if (!id.includes("_")) {
          processedData.push({
            id,
            name: item[1],
            description: item[3],
            api_path: `/place/${id}`,
          });
        }
      } catch (error) {
        try {
          errors.push({
            name: item[0][1],
            message: error.message || error.toString,
          });
        } catch (_) {}
      }
    });

    return jsonResponse({
      data: {
        message: "Place searched!",
        query,
        count: processedData.length,
        data: processedData,
        error: {
          message:
            errors.length > 0
              ? "Some errors while searching places. Please report this to https://thetuhin.com/contact."
              : "No errors",
          data: errors,
        },
      },
    });
  } catch (error) {
    return jsonResponse({
      data: {
        message: `Something went wrong => ${error.message || error.toString()}`,
      },
      status: 500,
    });
  }
}
