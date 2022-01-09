export async function getplaceCache(id) {
  var findcache = await CACHE.get(`place-${id}`);
  if (!findcache) {
    return null;
  } else {
    return JSON.parse(findcache);
  }
}

export async function setplaceCache(id, data) {
  await CACHE.put(`place-${id}`, JSON.stringify(data), {
    expirationTtl: 60 * 60 * 24 * 7,
  });
}
