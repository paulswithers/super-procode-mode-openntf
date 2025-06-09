# Show Me The Code

```js
const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: './'
            });
            if (registration.installing) {
                console.log('Service worker is installing:', registration.installing);
            } else if (registration.waiting) {
                console.log('Service worker is waiting:', registration.waiting);
            } else if (registration.active) {
                console.log('Service worker is active:', registration.active);
            }
        } catch (error) {
            console.error('Service worker registration failed:', error);
            
        }

    }
}

registerServiceWorker();
```

---

```js
self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      ...
    ]),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(async () => {
    if (self.registration.navigationPreload) {
      // Enable navigation preloads
      await self.registration.navigationPreload.enable();
    }
  });
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
```