/* login script generate new authentication cookie
 * with all site extras */

// not strictly needed
import * as _ from "underscore";

const days = 1;

function jsonError(err: string) {
  return {
    error: err,
  };
}

// not sure if the reference to "index.d.ts" for json works
function putCred(cred: string, json: json) {
  const a = cred.split(".");
  // just the header blank .
  if (a.length != 3) return "." + jsonError("Authentication cookie malformed.");
  a[0] = ""; // save space null headers
  a[1] = btoa(JSON.stringify(json));
  // keep signature for debug validation
  return a.join(".");
}

async function getVerify(token: string) {
  return await fetch(
    "https://oauth2.googleapis.com/tokeninfo?id_token=" + token,
    {
      method: "GET",
    },
  )
    .then(async (resp) => {
      return await resp
        .json()
        // express json parse unknown??
        // the jti is like a unique session issue key
        // along with the sub key a unique session
        // can be located
        // maybe also use the IP number to screen
        // VPN/botnet share of spam access
        .then((data: { jti?: string }): json => {
          if (data.jti != undefined) return data;
          return jsonError("Wrong JSON object kind.");
        })
        .catch((reason) => {
          return jsonError(
            "Verification server parse error. " + reason.toString(),
          );
        });
    })
    .catch((reason) => {
      return jsonError("Verification network error. " + reason.toString());
    });
}

// cookies in decoded form
// let is block scope var
// be serious, it's not a complex function to need trailing clean of var
function getCookie(cookies: string, cname: string) {
  const name = cname + "=";
  const ca = cookies.split("; ");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    if (c.indexOf(name) == 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
}

// The typscript additions to the event context such that features can be
// used from the environment or datastores
interface Env {}

interface Data {}

// get request handler
export async function onRequestGet(context: EventContext<Env, string, Data>) {
  const request = context.request;
  const cookies = request.headers.get("Cookie");
  const csrf = getCookie(cookies, "csrf");
  const q = decodeURIComponent(request.url.split("?")[1]);
  let v;
  let d = new Date();
  const cred = getCookie(cookies, "cred");
  if (q != csrf) {
    v = {
      error: "CSRF miss-match.",
    };
  } else {
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    /* add credentials and other required login here */
    // const vv = await v;
    v = await getVerify(cred); // start early async
    v.exp = d.getTime() / 1000; // set expires
  }
  // produce response
  const response = new Response();
  const c = putCred(cred, v);
  response.headers.set(
    "Set-Cookie",
    "cred=" +
      encodeURIComponent(c) +
      "; Expires=" +
      d.toUTCString() +
      "; Path='/';",
  );
  return response;
}
