/* login script generate new authentication cookie
 * with all site extras */

const days = 1;

function putCred(cred, json) {
  const a = cred.split(".");
  if (a.length != 3) return null;
  a[1] = btoa(JSON.stringify(json));
  return a.join(".");
}

async function getVerify(token) {
  const j = await fetch(
    "https://oauth2.googleapis.com/tokeninfo?id_token=" + token,
    {
      method: "GET",
    },
  );
  return await j.json();
}

function getCookie(cookies, key) {
  if (cookies) {
    const allCookies = cookies.split("; ");
    const cookie = allCookies.find((cookie) => cookie.includes(key));
    if (cookie) {
      const [_, value] = cookie.split("=");
      return value;
    }
  }
  return null;
}

export default {
  async fetch(request) {
    const response = new Response();
    const cookies = request.headers.get("Cookie");
    const csrf = getCookie(cookies, "csrf");
    const q = request.url.split("?")[1];
    var c;
    if (q != csrf) {
      c = {
        error: "CSRF miss-match.",
      };
    } else {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const cred = decodeURIComponent(getCookie(cookies, "cred"));
      const v = await getVerify(cred);
      /* add credentials and other required login here */
      v.exp = date / 1000; // set expires
      c = putCred(v);
    }
    response.headers.set(
      "Set-Cookie",
      "cred=" +
        encodeURIComponent(c) +
        "; Expires=" +
        date.toString() +
        "; Path='/';",
    );
    return response;
  },
};
