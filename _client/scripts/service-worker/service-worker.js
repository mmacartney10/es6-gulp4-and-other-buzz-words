const cacheName = 'weird-friends-offline-cache';
const offlineUrl = '/';

function fetchResource() {
  return caches.open(cacheName).then(cache => cache.match(offlineUrl));
}

function cacheResources(offlinePage, response) {
  return caches.open(cacheName).then(cache => cache.put(offlinePage, response));
}

function fetchServiceWorker(event) {
  return event.respondWith(fetch(event.request).catch(error => fetchResource()));
}

function activateServiceWorker(event) {
  return event.waitUntil(self.clients.claim());
}

function installServiceWorker(event) {
  var offlinePage = new Request(offlineUrl);
  return event.waitUntil(fetch(offlinePage).then(response => cacheResources(offlinePage, response)));
}

function init() {
  self.addEventListener('install', installServiceWorker);
  self.addEventListener('activate', activateServiceWorker);
  self.addEventListener('fetch', fetchServiceWorker);
}

init();
