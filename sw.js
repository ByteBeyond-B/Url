const CACHE_NAME = "quicklink-cache-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "https://ik.imagekit.io/rsmeguisr/QuickLink_App_Icon.png",
    "https://ik.imagekit.io/rsmeguisr/QuickLink_Splash_Screen_1500x2688.png"
];

// Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }).catch((error) => {
            console.error("Cache open failed: ", error);
        })
    );
    self.skipWaiting();
    console.log("Service Worker Installed");
});

// Activate Service Worker & Clean Old Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
    console.log("Service Worker Activated");
});

// Fetch Request Handler
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(() => {
            return caches.match("./index.html");
        })
    );
});
