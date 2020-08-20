const laodScript = (cb) => {
  if (window.gapi) {
    cb(window.gapi);
    return;
  }
  const s = document.createElement("script");
  s.src = "https://apis.google.com/js/platform.js";
  s.id = "lega-google-sign-in";
  s.addEventListener("load", () => {
    cb(window.gapi);
  });
  document.body.appendChild(s);
};

export default laodScript;
