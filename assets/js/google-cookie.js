/* set to activate */
const loginUrl = "";

/* called on google login from upper right dialog */
function googleLogin(cred) {
  console.log(cred);
  /* this is sent by cookie sending to verification server */
  setCookie("cred", cred.credential, 1);
  doSiteLogin(null); /* in event of no other page in an hour? */
}

/* optimize one less cookie decode */
function doSiteLogin(callback) {
  if (loginUrl == "") {
    alert("Set login URL.");
    return;
  }
  const uuid = crypto.randomUUID();
  /* cross site request forgery prevention */
  setCookie("csrf", uuid, 1);
  const f = new FormData();
  f.append("csrf", uuid);
  /* the credential is in the cookie sent as header ? */
  /* more form data */
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function (ev) {
    if (this.status == 200) {
      /* replace cred cookie on sucess with site cookie */
      if (callback != null) callback();
    } else {
      alert("Authentication busy, try later.");
    }
  };
  xhttp.onerror = function (ev) {
    alert("Authentication network error, try later.");
  };
  xhttp.open("POST", loginUrl, true);
  xhttp.send(f);
}

function replaceMain(url, callback) {
  if (url == "" || url.charAt(0) == "?") {
    /* not configured */
    alert("Set service URL.");
    return;
  }
  /* do ajax style main template action */
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function (ev) {
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
      alert("Access denied. Logging out.");
      reprompt();
    } else {
      alert("Service not available, try later.");
    }
  };
  xhttp.onerror = function (ev) {
    alert("Service network error, try later.");
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function getCred() {
  const c = getCookie("cred");
  const a = c.split(".");
  if (a.length != 2) return {};
  try {
    return JSON.parse(atob(a[1]));
  } catch (e) {
    return {};
  }
}

/* checks google's expired field */
function isTokenExpired(token) {
  if (token.exp == undefined) return true;
  return Math.floor(new Date().getTime() / 1000) >= token.exp;
}

/* checks if a google unique subscriber id is present */
function isGoogle(token) {
  return token.sub != undefined;
}

function reprompt() {
  delCookie("cred");
  google.accounts.id.prompt();
}

/* replaces <main> sends json as query string GET
 * then calls callback(responeXML, siteCredential) */
function onRequest(url, json, callback) {
  const cb = function () {
    const j = JSON.stringify(json);
    if (url == null) url = "";
    url += "?" + encodeURIComponent(j);
    /* so as singular component, as ?=& encoded */
    replaceMain(url, callback);
  };
  const c = getCred();
  if (isTokenExpired(c)) {
    /* handle redo of google login */
    alert("You were logged out.");
    /* then prompt by API */
    reprompt();
    return;
  }
  if (isGoogle(c)) {
    /* delay via closure of callback */
    doSiteLogin(cb);
  } else cb();
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

/* exporting context
 * due to the compiler optimizer the global
 * window object has to be assigned to
 * to side effect the lambda generated
 * (() -> {})(); */
window.googleLogin = googleLogin;
window.onRequest = onRequest;
