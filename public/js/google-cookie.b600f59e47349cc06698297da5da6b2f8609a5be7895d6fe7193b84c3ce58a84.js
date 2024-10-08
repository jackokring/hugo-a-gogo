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
  function replaceMain(url) {
    if (url != null | url != "") {
    }
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
      delCookie("cred");
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
    replaceMain(url);
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
  window.setCookie = setCookie;
  window.getCookie = getCookie;
  window.delCookie = delCookie;
  window.onRequest = onRequest;
  window.getCred = getCred;
})();
