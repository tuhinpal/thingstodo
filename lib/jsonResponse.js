export default function jsonResponse({ data, status = 200, headers = {} }) {
  return new Response(JSON.stringify(data, null, 4), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=86400",
      ...headers,
    },
  });
}
