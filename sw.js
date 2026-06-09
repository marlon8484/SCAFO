const CACHE='scafo-v5';

// Only cache static assets, never intercept API calls
const STATIC=[
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.x/dist/tabler-icons.min.css',
  'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500&display=swap'
];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(STATIC).catch(()=>{}))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  const url=e.request.url;

  // Never intercept Supabase API calls — always go to network
  if(url.includes('supabase.co')){
    e.respondWith(fetch(e.request));
    return;
  }

  // For index.html — always fetch fresh from network
  if(url.endsWith('/')||url.includes('index.html')){
    e.respondWith(
      fetch(e.request)
        .then(res=>{
          const clone=res.clone();
          caches.open(CACHE).then(c=>c.put(e.request,clone));
          return res;
        })
        .catch(()=>caches.match(e.request))
    );
    return;
  }

  // Static assets — cache first
  e.respondWith(
    caches.match(e.request)
      .then(cached=>{
        if(cached) return cached;
        return fetch(e.request).then(res=>{
          if(res&&res.status===200){
            const clone=res.clone();
            caches.open(CACHE).then(c=>c.put(e.request,clone));
          }
          return res;
        });
      })
  );
});
