




export const environment = {
  production: true,
  apiEndPoint: "https://api.tvtracker.co.za",
  authEndPoint: "https://api.tvtracker.co.za/auth/login",
  registerEndPoint: "https://api.tvtracker.co.za/auth/register",
  logoutEndPoint: "https://api.tvtracker.co.za/auth/logout",
  activateEndPoint: "https://api.tvtracker.co.za/auth/activate",
  resetPasswordEndPoint: "https://api.tvtracker.co.za/auth/resetpassword",
  newPasswordEndPoint: "https://api.tvtracker.co.za/auth/newpassword",
  endpoint: {
    "contact": "https://api.tvtracker.co.za/contact",
    "bug-report": "https://api.tvtracker.co.za/contact/bugreport",
    "series-all": "https://api.tvtracker.co.za/series/all",
    "series-by-slug": "https://api.tvtracker.co.za/series/slug",
    "episodes-future": "https://api.tvtracker.co.za/episodes/future",
    "episodes-recent": "https://api.tvtracker.co.za/episodes/recent",
    "episodes-user-future": "https://api.tvtracker.co.za/episodes/user/future",
    "episodes-user-recent": "https://api.tvtracker.co.za/episodes/user/recent",
    "episodes-by-slug": "https://api.tvtracker.co.za/episodes/slug",
    "alerts": "https://api.tvtracker.co.za/alerts/all",
    "alert-clear": "https://api.tvtracker.co.za/alerts/clear",
    "user-favorites": "https://api.tvtracker.co.za/series/favorites",
    "add-favorite": "https://api.tvtracker.co.za/favorites/add",
    "remove-favorite": "https://api.tvtracker.co.za/favorites/remove",
    "search-list": "https://api.tvtracker.co.za/search/list",
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
