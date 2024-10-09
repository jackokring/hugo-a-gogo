(() => {
  // <stdin>
  var loginUrl = "";
  function googleLogin(cred) {
    console.log(cred);
    setCookie("cred", cred.credential, 1);
    doSiteLogin(null);
  }
  function doSiteLogin(callback) {
    if (loginUrl == "") {
      alert("Set login URL.");
      return;
    }
    const uuid = crypto.randomUUID();
    setCookie("csrf", uuid, 1);
    const f = new FormData();
    f.append("csrf", uuid);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(ev) {
      if (this.status == 200) {
        if (callback != null) callback();
      } else {
        alert("Authentication busy, try later.");
      }
    };
    xhttp.onerror = function(ev) {
      alert("Authentication network error, try later.");
    };
    xhttp.open("POST", loginUrl, true);
    xhttp.send(f);
  }
  function replaceMain(url, callback) {
    if (url == "" || url.charAt(0) == "?") {
      alert("Set service URL.");
      return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(ev) {
      if (this.status == 200) {
        const r = this.responseXML;
        const m = r.getElementsByTagName("main");
        if (m.length != 1) {
          alert("Unexpected service response. Logging out.");
          reprompt();
          return;
        }
        const h = m[0];
        document.getElementsByTagName("main")[0] = h;
        callback(r, getCred());
      } else if (this.status == 403) {
        alert("Access denied. Logging out.");
        reprompt();
      } else {
        alert("Service not available, try later.");
      }
    };
    xhttp.onerror = function(ev) {
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
  function isTokenExpired(token) {
    if (token.exp == void 0) return true;
    return Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3) >= token.exp;
  }
  function isGoogle(token) {
    return token.sub != void 0;
  }
  function reprompt() {
    delCookie("cred");
    google.accounts.id.prompt();
  }
  function onRequest(url, json, callback) {
    const cb = function() {
      const j = JSON.stringify(json);
      if (url == null) url = "";
      url += "?" + encodeURIComponent(j);
      replaceMain(url, callback);
    };
    const c = getCred();
    if (isTokenExpired(c)) {
      alert("You were logged out.");
      reprompt();
      return;
    }
    if (isGoogle(c)) {
      doSiteLogin(cb);
    } else cb();
  }
  function setCookie(cname, cvalue, exdays) {
    const d = /* @__PURE__ */ new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
    let expires = "expires=" + d.toUTCString();
    cvalue = encodeURIComponent(cvalue);
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
  window.googleLogin = googleLogin;
  window.onRequest = onRequest;
})();
