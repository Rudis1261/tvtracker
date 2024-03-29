// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndPoint: "http://dev.tvt2.co.za",
  authEndPoint: "http://dev.tvt2.co.za/auth/login",
  registerEndPoint: "http://dev.tvt2.co.za/auth/register",
  logoutEndPoint: "http://dev.tvt2.co.za/auth/logout",
  activateEndPoint: "http://dev.tvt2.co.za/auth/activate",
  resetPasswordEndPoint: "http://dev.tvt2.co.za/auth/resetpassword",
  newPasswordEndPoint: "http://dev.tvt2.co.za/auth/newpassword",
  streamingServiceUrl: "http://ewatchseries.to/serie/",
  endpoint: {
    "contact": "http://dev.tvt2.co.za/contact",
    "bug-report": "http://dev.tvt2.co.za/contact/bugreport",
    "series-all": "http://dev.tvt2.co.za/series/all",
    "series-by-slug": "http://dev.tvt2.co.za/series/slug",
    "episodes-future": "http://dev.tvt2.co.za/episodes/future",
    "episodes-recent": "http://dev.tvt2.co.za/episodes/recent",
    "episodes-user-future": "http://dev.tvt2.co.za/episodes/user/future",
    "episodes-user-recent": "http://dev.tvt2.co.za/episodes/user/recent",
    "episodes-by-slug": "http://dev.tvt2.co.za/episodes/slug",
    "alerts": "http://dev.tvt2.co.za/alerts/all",
    "alert-clear": "http://dev.tvt2.co.za/alerts/clear",
    "user-favorites": "http://dev.tvt2.co.za/series/favorites",
    "add-favorite": "http://dev.tvt2.co.za/favorites/add",
    "remove-favorite": "http://dev.tvt2.co.za/favorites/remove",
    "search-list": "http://dev.tvt2.co.za/search/list",
    "search-extended": "http://dev.tvt2.co.za/search/extended",
    "user-list": "http://dev.tvt2.co.za/users/list",
    "poster-admin": "http://dev.tvt2.co.za/posters/admin",
    "poster-update": "http://dev.tvt2.co.za/posters/update",
    "user-activate": "http://dev.tvt2.co.za/users/activate",
    "user-deactivate": "http://dev.tvt2.co.za/users/deactivate",
    "user-enable-notifications": "http://dev.tvt2.co.za/users/enableNotifications",
    "user-disable-notifications": "http://dev.tvt2.co.za/users/disableNotifications",
    "duplicates": "http://dev.tvt2.co.za/episodes/duplicates",
    "dedupe": "http://dev.tvt2.co.za/episodes/dedupe",
    "donate": "http://dev.tvt2.co.za/donate",
    "donate-check-paid": "http://dev.tvt2.co.za/donate/check_paid",
    "donations": "http://dev.tvt2.co.za/donate/payments",
  },
  recaptchaScript: "https://www.google.com/recaptcha/api.js",
  recapchaKey: "6LcI3ygUAAAAAPwNo2dGuR9WryiXbJ16AhEiZJzz",
  firebase: {
    apiKey: "AIzaSyDtO3Dk6M67rcnUiWn5MmCtWrMk_ZHrpI8",
    authDomain: "tvtrackerv2.firebaseapp.com",
    databaseURL: "https://tvtrackerv2.firebaseio.com",
    projectId: "tvtrackerv2",
    storageBucket: "tvtrackerv2.appspot.com",
    messagingSenderId: "646419066300"
  }
};
