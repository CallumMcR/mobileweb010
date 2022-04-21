const cacheName = 'HelloStamfordPWA-v1';
const appFiles = [
    '/',
    '/index.html',
    '/footer.html',
    '/navbar.html',
    '/history.html',
    '/filters.html',
    '/food.html',
    '/hotels.html',
    '/location.html',
    '/locations.html',
    '/search.html',
    '/weather.html',
    '/wildlife.html',
    '/css/basic.css',
    '/css/buttons.css',
    '/css/homepage.css',
    '/css/locations.css',
    '/css/navbar.css',
    '/css/weather.css',
    '/images/banners/burghleyhouse.webp',
    '/images/banners/riverwelland.webp',
    '/images/banners/townaerialview.webp',
    '/images/landmarks/burghleyhouse.webp',
    '/images/logo/favicon.ico',
    '/site.webmanifest'
];


self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install', e);
    self.skipWaiting();
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching files');
        await cache.addAll(appFiles);
    })());
});


self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate', e);
    registerPeriodicSync();
});


self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});

self.addEventListener('notificationclick', event => {
    event.waitUntil(self.clients.openWindow('/'));
});

self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Sync', event);
});


self.addEventListener('periodicsync', (e) => {
    if (e.tag === 'HelloStamfordEvent') {
        fetch('notifications.json')
            .then(response => response.json())
            .then(data => {
                for (let event of data.notifications) {
                    
                    registration.showNotification(event.title, {
                        tag: event.tag,
                        body: event.body,
                        icon: event.icon,
                        data: event.linkaddress,
                        vibrate: event.vibration,
                        image: event.image
                    });
                }
            });
        registration.update();
    }
});


self.addEventListener('updatefound', (event) => {
    console.log('[Service Worker] Update Found', event);
});

self.addEventListener('statechange', (event) => {
    console.log('[Service Worker] State Changed', event);
});

self.addEventListener('controllerchange', (event) => {
    console.log('[Service Worker] State Changed', event);
});

async function requestBackgroundSync() {
   // await self.registration.sync.register('HelloStamfordEvent');
}

async function registerPeriodicSync() {
    await registration.periodicSync.register('HelloStamfordEvent', {
        minInterval: 5000
    });
}
