(() => {
  // <stdin>
  function googleLogin(cred) {
    console.log(cred);
    setCookie("cred", cred.credential, 1);
    doSiteLogin();
  }
  function doSiteLogin() {
    return false;
  }
  function replaceMain(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          const r = this.responseXML;
          const m = r.getElementsByTagName("main");
          if (m.length != 1) {
            alert("Unexpected service response. Logging out.");
            reprompt();
            return;
          }
          const h = m[0].innerHTML;
          document.getElementsByTagName("main")[0].innerHTML = h;
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
  function isTokenExpired(token) {
    return Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3) >= token?.exp;
  }
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
      alert("You were logged out.");
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
