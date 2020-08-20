import loadScript from "./load-script";
import styles from "./index.module.css";
import { useState, useEffect } from "react";
const GoogleLogin = ({
  width = "auto",
  height = "42px",
  scope = "profile",
  longTitle = true,
  onInit,
  onSuccess,
  onFailure,
  instanceId = "googleSignIn",
}) => {
  useEffect(() => {
    loadScript(handleGoogleSignInButton);
  }, []);

  const getFunction = (fn) => {
    if (fn && typeof fn === "function") return fn;
    return () => {};
  };

  const handleGoogleSignInButton = (gapi) => {
    gapi.load("auth2", () => {
      gapi.auth2.init().then(() => {
        let authInstance = gapi.auth2.getAuthInstance();
        let signedIn = authInstance.isSignedIn.get();
        getFunction(onInit)(gapi, signedIn);
      });
    });

    gapi.signin2.render(instanceId, {
      scope: scope,
      width: width,
      height: height,
      longtitle: longTitle,
      onsuccess: getFunction(onSuccess),
      onfailure: getFunction(onFailure),
    });
  };

  return (
    <div id={instanceId} className={`${styles.googleBtn} customGPlusSignIn`}>
      <div className={styles.worker}></div>
    </div>
  );
};

export default GoogleLogin;
