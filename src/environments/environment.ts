// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA9-Hst7Lwh0042wH9Diux5-y4KZKYZ9Ks",
    authDomain: "dirceturcuscoapp.firebaseapp.com",
    databaseURL: "https://dirceturcuscoapp.firebaseio.com",
    projectId: "dirceturcuscoapp",
    storageBucket: "dirceturcuscoapp.appspot.com",
    messagingSenderId: "22208929829",
    appId: "1:22208929829:web:6458a99980863c7b8c9fcc",
    measurementId: "G-C697355QSN"
  },
  algolia: {
    appId: 'PVF9B2B1IR',
    apiKey: '7f1666a6ca8a70ceca65b83b097dccb6',
    indexName: 'dircetur',
    urlSync: false
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
