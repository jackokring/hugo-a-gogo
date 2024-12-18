(() => {
  // <stdin>
  var loginUrl = "/cookie-cutter";
  function googleLogin(cred) {
    setCookie("cred", cred.credential, 1);
    (async () => {
      await doSiteLogin(
        async () => {
        }
      );
    })();
  }
  function onLoad() {
    let u = getCred().name;
    if (u == void 0) u = "Anonymous User";
    $(".loginName").text(u);
  }
  async function doSiteLogin(callback) {
    if (loginUrl == "") {
      alert("Set login URL.");
      return;
    }
    const uuid = crypto.randomUUID();
    setCookie("csrf", uuid, 1);
    const url = loginUrl + "?" + encodeURIComponent(uuid);
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      const e = getCred().error;
      if (e != void 0) {
        alert("Authentication error. Logging out. Remote: " + e);
        reprompt();
        return;
      }
      onLoad();
      await callback();
    } else if (response.status == 403) {
      alert("Access denied. Logging out.");
      reprompt();
    } else {
      alert("Authentication busy, try later.");
    }
  }
  async function replaceMain(url, callback) {
    if (url == "" || url.charAt(0) == "?") {
      alert("Set service URL.");
      return;
    }
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      const d = new DOMParser();
      const r = d.parseFromString(await response.text(), "text/html");
      const error = r.getElementsByTagName("parsererror");
      if (error) {
        alert("Malformed service response.");
      }
      const m = r.getElementsByTagName("main");
      if (m.length != 1) {
        alert("Unexpected service response. Logging out.");
        reprompt();
        return;
      }
      const h = m[0].innerHTML;
      if (h != void 0) {
        $$.html(h);
      }
      callback(getCred());
    } else if (response.status == 403) {
      alert("Access denied. Logging out.");
      reprompt();
    } else {
      alert("Service not available, try later.");
    }
  }
  function getCred() {
    const c = getCookie("cred");
    const a = c.split(".");
    if (a.length != 3) return {};
    try {
      return JSON.parse(atob(a[1]));
    } catch (e) {
      return {};
    }
  }
  function isTokenExpired(token) {
    if (token.exp == void 0) return true;
    return Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3) >= token.exp;
  }
  function isGoogle(token) {
    return token.kid == void 0;
  }
  function reprompt() {
    delCookie("cred");
    onLoad();
    google.accounts.id.prompt();
  }
  async function onRequest(url, json, callback) {
    const cb = async function() {
      const j = JSON.stringify(json);
      if (url == null) url = "";
      url += "?" + encodeURIComponent(j);
      await replaceMain(url, callback);
    };
    const c = getCred();
    if (isTokenExpired(c)) {
      alert("You were logged out.");
      reprompt();
      return;
    }
    if (isGoogle(c)) {
      await doSiteLogin(cb);
    } else await cb();
  }
  function setCookie(cname, cvalue, exdays) {
    const d = /* @__PURE__ */ new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
    const expires = "expires=" + d.toUTCString();
    cvalue = encodeURIComponent(cvalue);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
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
  function delCookie(cname) {
    setCookie(cname, "", -1);
  }
  function logOut() {
    delCookie("cred");
    location.reload();
  }
  var $$ = $("#subdom");
  var $_ = $("main");
  window.$$ = $$;
  window.$_ = $_;
  window.googleLogin = googleLogin;
  window.onRequest = onRequest;
  window.reprompt = reprompt;
  window.onLoad = onLoad;
  window.logOut = logOut;
})();
