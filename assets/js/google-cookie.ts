/* set to activate */
let loginUrl = "/cookie-cutter";

/* called on google login from upper right dialog */
function googleLogin(cred: { credential: string }) {
  // console.log(cred.credential);
  /* this is sent by cookie sending to verification server */
  setCookie("cred", cred.credential, 1);
  (async () => {
    await doSiteLogin(
      async () => {},
    ); /* in event of no other page in an hour? */
  })();
}

function onLoad() {
  // on load process
  let u = getCred().name;
  if (u == undefined) u = "Anonymous User"; // must be a name?
  //html escape little johny drop tables
  $(".loginName").text(u);
  //then there's val() for inner things of container sets
}

/* optimize one less cookie decode */
async function doSiteLogin(callback: () => Promise<void>) {
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
    onLoad(); // on load expectations redo
    await callback();
  } else if (response.status == 403) {
    alert("Access denied. Logging out.");
    reprompt();
  } else {
    alert("Authentication busy, try later.");
  }
}

async function replaceMain(
  url: string,
  callback: (json: json) => Promise<void>,
) {
  if (url == "" || url.charAt(0) == "?") {
    /* not configured */
    alert("Set service URL.");
    return;
  }
  /* do ajax style main template action */
  const response = await fetch(url, { method: "GET" });
  if (response.ok) {
    // can't use $ as not THE DOM, but another document
    const d = new DOMParser();
    const r = d.parseFromString(await response.text(), "text/html");
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
    const h = m[0].innerHTML;
    // check for nil main
    if (h != undefined) {
      // assignment direct is apparently ignored
      $$.html(h);
      // and set subdom
      //$$ = $(".subdom");
      // hidden div jQuery object, so .find() ...
    }
    /* supply XML and credential */
    callback(getCred());
  } else if (response.status == 403) {
    alert("Access denied. Logging out.");
    reprompt();
  } else {
    alert("Service not available, try later.");
  }
}

function getCred(): json {
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
function isTokenExpired(token: { exp?: number }) {
  if (token.exp == undefined) return true;
  return Math.floor(new Date().getTime() / 1000) >= token.exp;
}

/* checks if a google unique subscriber id is present */
function isGoogle(token: { kid?: string }) {
  /* raw google token has kid field in header not in payload */
  /* sub/jti can be session unique value */
  return token.kid == undefined;
}

function reprompt() {
  delCookie("cred");
  onLoad(); // redo any loaded expectations
  google.accounts.id.prompt();
}

/* replaces <main> sends json as query string GET
 * then calls callback(siteCredential) */
async function onRequest(
  url: string,
  json: json,
  callback: (json: json) => Promise<void>,
) {
  const cb = async function () {
    const j = JSON.stringify(json);
    if (url == null) url = "";
    url += "?" + encodeURIComponent(j);
    /* so as singular component, as ?=& encoded */
    await replaceMain(url, callback);
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
    await doSiteLogin(cb);
  } else await cb();
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

function logOut() {
  delCookie("cred");
  location.reload();
}

/* exporting context
 * due to the compiler optimizer the global
 * window object has to be assigned to
 * to side effect the lambda generated
 * (() -> {})(); */
// setup the hidden div sun DOM element for filling
// triggers load order needing bump of jquery higher on page
// might as well name the subdom in a short way
var $$ = $("#subdom");
var $_ = $("main");
var elm = Elm.Main.init();
// for easy access to the restricted dom elements
// with .find(selector) for copy
window.$$ = $$;
window.$_ = $_;

window.googleLogin = googleLogin; // clicked login
window.onRequest = onRequest; // main replace ajax
window.reprompt = reprompt; // logout
window.onLoad = onLoad; // set loaded details such as logged in classes
window.logOut = logOut;
// e.g. class loginName for the user's name

export { $$, $_, elm, googleLogin, onRequest, reprompt, onLoad, logOut };
