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

function replaceMain(url, callback) {
  /* do ajax style main template action */
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const r = this.responseXML;
        /* so almost any kind of page to just replace main */
        const m = r.getElementsByTagName("main");
        if (m.length != 1) {
          /* prevent loading bad under privilige conditions */
          alert("Unexpected service response. Logging out.");
          reprompt();
          return;
        }
        const h = m[0].innerHTML;
        document.getElementsByTagName("main")[0].innerHTML = h;
        /* supply XML and credential */
        callback(r, getCred());
      } else if (this.status == 403) {
        alert("Access denied.");
        reprompt();
      } else {
        alert("Service not available, try later.");
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
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
  delCookie("cred");
  window.google.accounts.id.prompt();
}

function onRequest(url, callback) {
  const c = getCred();
  if (c == "") {
    alert("You are not logged in.");
    reprompt();
    return;
  }
  if (isTokenExpired(c)) {
    /* handle redo of google login */
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
  replaceMain(url, callback);
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
window.onRequest = onRequest;
