self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("quicklink-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/QuickLink_App_Icon.png",  // Logo
                "/QuickLink_Splash_Screen_1500x2688.png"  // Splash Screen
            ]);
        })
    );
    console.log("Service Worker Installed");
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
