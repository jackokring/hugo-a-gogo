/* set to activate */
let loginUrl = "/cookie-cutter";

/* called on google login from upper right dialog */
function googleLogin(cred) {
  console.log(cred.credential);
  /* this is sent by cookie sending to verification server */
  setCookie("cred", cred.credential, 1);
  doSiteLogin(() => {}); /* in event of no other page in an hour? */
}

/* optimize one less cookie decode */
async function doSiteLogin(callback: Function) {
  if (loginUrl == "") {
    alert("Set login URL.");
    return;
  }
  const uuid = crypto.randomUUID();
  /* cross site request forgery prevention */
  setCookie("csrf", uuid, 1);
  const url = loginUrl + "?" + encodeURIComponent(uuid);
  /* the credential is in the cookie sent as header ? */
  /* more form data */
  const response = await fetch(url, { method: "GET" });
  if (response.ok) {
    /* replace cred cookie on sucess with site cookie */
    /* server side https://oauth2.googleapis.com/tokeninfo?id_token=$cred
     * check no .error returned else returns credential
     * undefine add in "kid" key */
    const e = getCred().error;
    if (e != undefined) {
      alert("Authentication error. Logging out. Remote: " + e);
      reprompt();
      return;
    }
    if (callback != null) callback();
  } else if (response.status == 403) {
    alert("Access denied. Logging out.");
    reprompt();
  } else {
    alert("Authentication busy, try later.");
  }
}

async function replaceMain(url: string, callback: Function) {
  if (url == "" || url.charAt(0) == "?") {
    /* not configured */
    alert("Set service URL.");
    return;
  }
  /* do ajax style main template action */
  const response = await fetch(url, { method: "GET" });
  if (response.ok) {
    const r = DOMParser.parseFromString(response.text(), "text/html");
    /* so almost any kind of page to just replace main */
    const error = r.getElementsByTagName("parsererror");
    if (error) {
      alert("Malformed service response.");
    }
    const m = r.getElementsByTagName("main");
    if (m.length != 1) {
      /* prevent loading bad under privilige conditions */
      alert("Unexpected service response. Logging out.");
      reprompt();
      return;
    }
    /* direct XML save stringify and parse */
    const h = m[0];
    document.getElementsByTagName("main")[0] = h;
    /* supply XML and credential */
    callback(r, getCred());
  } else if (response.status == 403) {
    alert("Access denied. Logging out.");
    reprompt();
  } else {
    alert("Service not available, try later.");
  }
}

function getCred(): object {
  const c = getCookie("cred");
  const a = c.split(".");
  if (a.length != 3) return {};
  try {
    return JSON.parse(atob(a[1]));
  } catch (e) {
    return {};
  }
}

/* checks google's expired field */
function isTokenExpired(token: object) {
  if (token.exp == undefined) return true;
  return Math.floor(new Date().getTime() / 1000) >= token.exp;
}

/* checks if a google unique subscriber id is present */
function isGoogle(token: object) {
  /* raw google token has kid field in header not in payload */
  /* sub/jti can be session unique value */
  return token.kid == undefined;
}

function reprompt() {
  delCookie("cred");
  google.accounts.id.prompt();
}

/* replaces <main> sends json as query string GET
 * then calls callback(responeXML, siteCredential) */
function onRequest(url: string, json: object, callback: Function) {
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
function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  cvalue = encodeURIComponent(cvalue);
  // cookie adds onto inner cookie set
  // N.B. NOT a literal equality setting.
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname: string) {
  let name = cname + "=";
  let ca = document.cookie.split("; ");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    if (c.indexOf(name) == 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
}

function delCookie(cname: string) {
  setCookie(cname, "", -1);
}

/* exporting context
 * due to the compiler optimizer the global
 * window object has to be assigned to
 * to side effect the lambda generated
 * (() -> {})(); */
window.googleLogin = googleLogin;
window.onRequest = onRequest;
