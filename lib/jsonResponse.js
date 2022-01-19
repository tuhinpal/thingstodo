export default function jsonResponse({ data, status = 200, headers = {} }) {
  return new Response(JSON.stringify(data, null, 4), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      ...headers,
    },
  });
}
