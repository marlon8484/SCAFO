const CACHE='scafo-v3';
const ASSETS=[
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.x/dist/tabler-icons.min.css',
  'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500&display=swap'
];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
      .then(()=>self.clients.matchAll().then(clients=>clients.forEach(c=>c.postMessage({type:'RELOAD'}))))
  );
});

self.addEventListener('fetch',e=>{
  // Always fetch fresh from network first, fall back to cache
  e.respondWith(
    fetch(e.request)
      .then(res=>{
        if(res&&res.status===200){
          const clone=res.clone();
          caches.open(CACHE).then(c=>c.put(e.request,clone));
        }
        return res;
      })
      .catch(()=>caches.match(e.request))
  );
});
