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

export async function purgeCache() {
  var deleted = [];
  var keys = await CACHE.list();

  for (var i = 0; i < keys.keys.length; i++) {
    if (!keys.keys[i].name.startsWith("place~")) {
      await CACHE.delete(keys.keys[i].name);
      deleted.push(keys.keys[i].name);
    }
  }

  return deleted;
}
