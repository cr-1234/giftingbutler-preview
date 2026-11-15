// Firebase Cloud Messaging service worker for Gifting Butler push notifications.
// Must live at the site root (firebase-messaging-sw.js) so it can control all pages.
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey:"AIzaSyBPvwf-ilWhc5G_jAEaRDwlom0jJY678w4",
    authDomain:"giftingbutler-74395.firebaseapp.com",
    projectId:"giftingbutler-74395",
    storageBucket:"giftingbutler-74395.firebasestorage.app",
    messagingSenderId:"37308175610",
    appId:"1:37308175610:web:547281f014be448b292543",
    measurementId:"G-KTPDVDSNWV"
  });

const messaging = firebase.messaging();

// Background messages: show a notification even when the site isn't open.
messaging.onBackgroundMessage(function(payload) {
  const title = (payload.notification && payload.notification.title) || '🎁 Gifting Butler';
  const options = {
    body: (payload.notification && payload.notification.body) || 'You have a gift reminder!',
    icon: '/icons/icon-192.webp',
    badge: '/icons/icon-192.webp',
    data: (payload.data && payload.data.url) || '/'
  };
  self.registration.showNotification(title, options);
});

// Tapping the notification opens the site.
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = (event.notification.data) || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
