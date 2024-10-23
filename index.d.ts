export {};

declare global {
  interface Window {
    // make assignments to window.<x> possible no error
    googleLogin: ({ credential: string }) => void;
    // callback can take recieved DOM and credential json arguments
    onRequest: (
      url: string,
      json: json,
      callback: (doc: Document, json: json) => Promise<void>,
    ) => Promise<void>;
    reprompt: () => void;
    onLoad: () => void;
  }
  interface json {
    [propName: string]: any;
  }
}
