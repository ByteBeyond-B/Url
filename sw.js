self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("quicklink-cache").then((cache) => {
            return cache.addAll([
                "./",
                "./index.html",
                "./manifest.json",
                "https://ik.imagekit.io/rsmeguisr/QuickLink_App_Icon.png",
                "https://ik.imagekit.io/rsmeguisr/QuickLink_Splash_Screen_1500x2688.png"
            ]);
        })
    );
    self.skipWaiting();
    console.log("Service Worker Installed");
});

self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim());
    console.log("Service Worker Activated");
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match("./index.html");
        })
    );
});
