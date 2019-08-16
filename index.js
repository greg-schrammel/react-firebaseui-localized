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
    window.firebase = firebase;
    const firebaseUI = new window.firebaseui.auth.AuthUI(auth);
    firebaseUI.start(`#${FIREBASEUI_CONTAINER_ID}`, config);
  }, [error, loaded]);

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
