/* login script generate new authentication cookie
 * with all site extras */

const days = 1;

function jsonError(err) {
  return {
    error: err,
  };
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

function getVerify(token) {
  let x = jsonError("Default error.");
  // apparently the only way of not making getVerify async
  // So basically return an awaited promise from an async anon function
  // which is resolved by res(value) and so awaited
  (async () => {
    await new Promise((res, rej) => {
      fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + token, {
        method: "GET",
      })
        .then(async (result) => {
          return result
            .json()
            .then((result) => {
              // resolve promise in anon function
              res((x = result));
            })
            .catch((reason) => {
              res(
                (x = jsonError(
                  "Verification server parse error. " + reason.toString(),
                )),
              );
            });
        })
        // not a server but a net error
        .catch((reason) => {
          res(
            (x = jsonError("Verification network error. " + reason.toString())),
          );
        });
    });
  })();
  return x;
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
export function onRequestGet(context) {
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
    // const vv = await v;
    const v = getVerify(cred); // start early async
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
