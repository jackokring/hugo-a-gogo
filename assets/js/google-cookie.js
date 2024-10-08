/* called on google login from upper right dialog */
function googleLogin(cred) {
  console.log(cred);
  /* this is sent by cookie sending to verification server */
  setCookie("cred", cred.credential, 1);
  doSiteLogin(); /* in event of no other page in an hour? */
}

function doSiteLogin() {
  /* replace cred cookie on sucess with site cookie */
  return false; /* failed to login, server down? */
}

function replaceMain(url) {
  /* then if not null load url into main */
  if ((url != null) | (url != "")) {
    /* do ajax style main template action */
  }
}

function getCred() {
  const c = getCookie("cred");
  const p = JSON.parse(atob(c.split(".")[1]));
  return p;
}

/* checks google's expired field */
function isTokenExpired(token) {
  return Math.floor(new Date().getTime() / 1000) >= token?.exp;
}

/* checks if a google unique subscriber id is present */
function isGoogle(token) {
  return token?.sub != null;
}

function reprompt() {
  window.google.accounts.id.prompt();
}

function onRequest(url) {
  const c = getCred();
  if (c == "") {
    alert("You are not logged in.");
    reprompt();
    return;
  }
  if (isTokenExpired(c)) {
    /* handle redo of google login */
    delCookie("cred");
    alert("You were logged out.");
    /* then prompt by API */
    reprompt();
    return;
  }
  if (isGoogle(c)) {
    if (!doSiteLogin()) {
      alert("We could not log in to do that, try later.");
      return;
    }
  }
  replaceMain(url);
}

/* simple cookie management */
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  cvalue = encodeURIComponent(cvalue);
  // cookie adds onto inner cookie set
  // N.B. NOT a literal equality setting.
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
}
function delCookie(cname) {
  setCookie(cname, "", -1);
}

/* exporting context */
window.googleLogin = googleLogin;
window.setCookie = setCookie;
window.getCookie = getCookie;
window.delCookie = delCookie;
window.onRequest = onRequest;
window.getCred = getCred;
