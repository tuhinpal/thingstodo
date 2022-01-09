export default function createMapDeeplink({ lat, long }, name) {
  if (lat === 0 || long === 0) {
    return `https://maps.google.com/?q=${name}`;
  }
  return `https://www.google.com/maps/place/${lat},${long}/@${lat},${long},100z`;
}
