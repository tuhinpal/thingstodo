export default function textResponse({ data, status = 200, headers = {} }) {
  return new Response(data, {
    status,
    headers: { "content-type": "text/plain", ...headers },
  });
}
