// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  API_GETWAY: 'http://localhost:8080',
  firebaseConfig: {
    // apiKey: 'AIzaSyCXbO7_RtR7KFi5WPYcGJHtYAcMhy0_3SY',
    // authDomain: 'update-c1ca8.firebaseapp.com',
    // projectId: 'update-c1ca8',
    // storageBucket: 'update-c1ca8.appspot.com',
    // messagingSenderId: '689903295833',
    // appId: '1:689903295833:web:a44df5a3a7d6afceebc048',
    // measurementId: 'G-1HYNDBS3CK'
    apiKey: 'AIzaSyCsYOnk2LEDn8DYjTpuWCdipAbt3U3pUVc',
    authDomain: 'chatappsprint2.firebaseapp.com',
    databaseURL: 'https://chatappsprint2-default-rtdb.firebaseio.com',
    projectId: 'chatappsprint2',
    storageBucket: 'chatappsprint2.appspot.com',
    messagingSenderId: '471282388582',
    appId: '1:471282388582:web:21e1cc26e135259e68e7a7'
  },
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiUrl: 'http://localhost:8080'
  /* recaptcha: {
     siteKey: '6LcotukgAAAAAOZWmgjxeoTBKYTN5kgJoq01-wXh',
   }*/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
