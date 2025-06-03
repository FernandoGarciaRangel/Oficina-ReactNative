const CACHE_NAME = 'oficina-v1';
const urlsToCache = [
    'manterCliente.html',
    'manterCliente.css',
    'manterCliente.js',
    'manifest.json',
    'icons/icon-72x72.png',
    'icons/icon-96x96.png',
    'icons/icon-128x128.png',
    'icons/icon-144x144.png',
    'icons/icon-152x152.png',
    'icons/icon-192x192.png',
    'icons/icon-384x384.png',
    'icons/icon-512x512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Cache antigo removido:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Estratégia de cache: Network First, fallback to cache
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Interceptação de requisições
self.addEventListener('fetch', event => {
    // Ignorar requisições para APIs externas
    if (event.request.url.includes('api.')) {
        return;
    }

    event.respondWith(networkFirst(event.request));
});

// Sincronização em background
self.addEventListener('sync', event => {
    if (event.tag === 'sync-clientes') {
        event.waitUntil(syncClientes());
    }
});

// Função para sincronizar dados offline
async function syncClientes() {
    try {
        const db = await openDB();
        const clientesOffline = await db.getAll('clientesOffline');
        
        for (const cliente of clientesOffline) {
            try {
                // Tentar sincronizar com o servidor
                await fetch('/api/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cliente)
                });
                
                // Remover do cache offline se sincronizado com sucesso
                await db.delete('clientesOffline', cliente.id);
            } catch (error) {
                console.error('Erro ao sincronizar cliente:', error);
            }
        }
    } catch (error) {
        console.error('Erro na sincronização:', error);
    }
}

// Notificações push
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: 'icons/icon-192x192.png',
        badge: 'icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver detalhes',
                icon: 'icons/icon-72x72.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Nova Notificação', options)
    );
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
}); 