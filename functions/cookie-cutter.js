/* login script generate new authentication cookie
 * with all site extras */

const days = 1;

function jsonError(err) {
  return btoa(
    JSON.stringify({
      error: err,
    }),
  );
}

function putCred(cred, json) {
  const a = cred.split(".");
  // just the header blank .
  if (a.length != 3) return "." + jsonError("Authentication cookie malformed.");
  a[0] = ""; // save space null headers
  a[1] = btoa(JSON.stringify(json));
  // keep signature for debug validation
  return a.join(".");
}

async function getVerify(token) {
  const j = await fetch(
    "https://oauth2.googleapis.com/tokeninfo?id_token=" + token,
    {
      method: "GET",
    },
  );
  if (!j.ok) return jsonError("Verification network error. " + j.status);
  return await j.json().catch((reason) => {
    return jsonError("Verification server parse error. " + reason);
  });
}

// cookies in decoded form
// let is block scope var
// be serious, it's not a complex function to need trailing clean of var
function getCookie(cookies, cname) {
  const name = cname + "=";
  const ca = cookies.split("; ");
  for (let i = 0; i < ca.length; i++) {
    c = ca[i];
    if (c.indexOf(name) == 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
}

// get request handler
export async function onRequestGet(context) {
  const v = await getVerify(cred); // start early async
  const request = context.request;
  const cookies = request.headers.get("Cookie");
  const csrf = getCookie(cookies, "csrf");
  const q = decodeURIComponent(request.url.split("?")[1]);
  var c;
  if (q != csrf) {
    c = {
      error: "CSRF miss-match.",
    };
  } else {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const cred = getCookie(cookies, "cred");
    /* add credentials and other required login here */
    v.exp = date / 1000; // set expires
    c = putCred(cred, v);
  }
  // produce response
  const response = new Response();
  response.headers.set(
    "Set-Cookie",
    "cred=" +
      encodeURIComponent(c) +
      "; Expires=" +
      date.toUTCString() +
      "; Path='/';",
  );
  return response;
}
