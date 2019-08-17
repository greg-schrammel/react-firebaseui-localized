import React, { useEffect } from "react";
import useScript from "./useScript";

const FIREBASEUI_CONTAINER_ID = "firebaseui_container";
function FirebaseUIAuth({ firebase, auth, config, lang }) {
  const [loaded, error] = useScript(
    `https://www.gstatic.com/firebasejs/ui/4.1.0/firebase-ui-auth__${lang}.js`
  );

  useEffect(() => {
    if (!loaded) return;
    if (error) throw error;
    firebase = firebase;
    const firebaseUI = new firebaseui.auth.AuthUI(auth);
    firebaseUI.start(`#${FIREBASEUI_CONTAINER_ID}`, config);
  }, [auth, config, error, firebase, loaded]);

  return (
    <>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://www.gstatic.com/firebasejs/ui/4.1.0/firebase-ui-auth.css"
      />
      <div id={FIREBASEUI_CONTAINER_ID} />
    </>
  );
}

export default FirebaseUIAuth;
