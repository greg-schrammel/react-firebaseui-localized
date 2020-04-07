import React, { useEffect, useRef } from "react";
import useScript from "./useScript";

const firebaseui_src = lang =>
  `https://www.gstatic.com/firebasejs/ui/4.1.0/firebase-ui-auth__${lang}.js`;
const FIREBASEUI_CONTAINER_ID = "firebaseui_container";

function FirebaseUIAuth({ auth, config, lang, firebase }) {
  const [loaded, error] = useScript(firebaseui_src(lang));
  const container = useRef();
  const app = useRef();

  useEffect(() => {
    window.firebase = firebase;
  }, [])
  useEffect(() => {
    if (!loaded) return;
    if (error) throw error;
    (async () => {
      if (app.current) await app.current.delete();
      container.current.innerHTML = "";
      const firebaseUI = window.firebaseui.auth.AuthUI.getInstance() || new window.firebaseui.auth.AuthUI(auth);
      firebaseUI.start(`#${FIREBASEUI_CONTAINER_ID}`, config);
      app.current = window.firebase.app("[DEFAULT]-firebaseui-temp");
    })();
  }, [auth, config, error, loaded]);

  return (
    <>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://www.gstatic.com/firebasejs/ui/4.1.0/firebase-ui-auth.css"
      />
      <div ref={container} id={FIREBASEUI_CONTAINER_ID} />
    </>
  );
}

export default FirebaseUIAuth;
