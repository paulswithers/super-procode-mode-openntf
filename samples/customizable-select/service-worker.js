const VERSION_NAME = 'v1';

const addResourcesToCache = async (resource) => {
  // When the app changes, increment the cache version
  const cache = await caches.open(VERSION_NAME);
  await cache.addAll(resource);
}

const putInCache = async (request, response) => {
  const cache = await caches.open(VERSION_NAME);
  await cache.put(request, response);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/",
      "/index.html",
      "/assets/styles.css",
      "/index.js",
      "/assets/DS_Logo_Notes_icon.png",
    ]),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(async () => {
    if (self.registration.navigationPreload) {
      // Enable navigation preloads
      await self.registration.navigationPreload.enable();
    }
  });
});

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};

// See https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// for an additional approach that adds remote resources to the cache
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});