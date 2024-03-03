// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// const firebaseConfig = {
//     apiKey: "AIzaSyCsKTm-8nSXdKgh0m_Q-E2qgropUsVZuTo",
//     authDomain: "notificationapp-af121.firebaseapp.com",
//     projectId: "notificationapp-af121",
//     storageBucket: "notificationapp-af121.appspot.com",
//     messagingSenderId: "751987114008",
//     appId: "1:751987114008:web:1ef170c205fcfd860b436d"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });