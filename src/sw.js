// importScripts('/cache-polyfill.js');

var CACHE_NAME = 'skymusiccachev1';
const RUNTIME = 'runtime';

var urlsToCache = [ 
  '/',
  // '/dist/', 
  '/hns/naywmith/',
  './index.html',
  './main.css',
  './main.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
  'https://use.fontawesome.com/3cce9179cf.js',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  //'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js'  
];




var VERSION = '20';

this.addEventListener('install', function(e) {
  e.waitUntil(caches.open(VERSION).then(cache => {
    return cache.addAll(urlsToCache);
  }))
});

this.addEventListener('fetch', function(e) {
  // console.log(e.request.url); 
  var tryInCachesFirst = caches.open(VERSION).then(cache => {
    return cache.match(e.request).then(response => {
      if (!response) {
        return handleNoCacheMatch(e);
      }
      // Update cache record in the background
      fetchFromNetworkAndCache(e);
      // Reply with stale data
      return response
    });
  });
  e.respondWith(tryInCachesFirst);
});

this.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key !== VERSION)
        return caches.delete(key);
    }));
  }));
});

function fetchFromNetworkAndCache(e) {
  // DevTools opening will trigger these o-i-c requests, which this SW can't handle.
  // There's probaly more going on here, but I'd rather just ignore this problem. :)
  // https://github.com/paulirish/caltrainschedule.io/issues/49
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;

  return fetch(e.request).then(res => {
    // foreign requests may be res.type === 'opaque' and missing a url
    if (!res.url) return res;
    // regardless, we don't want to cache other origin's assets
    if (new URL(res.url).origin !== location.origin) return res;

    return caches.open(VERSION).then(cache => {
      // TODO: figure out if the content is new and therefore the page needs a reload.
      cache.put(e.request, res.clone());
      return res;
    });
  }).catch(err => console.error(e.request.url, err));
}

function handleNoCacheMatch(e) {
  return fetchFromNetworkAndCache(e);
}