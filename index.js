import React, { useEffect, useRef, Fragment } from "react";
import useScript from "./useScript";

const FIREBASEUI_CONTAINER_ID = "firebaseui_container";

function FirebaseUIAuth({ auth, config, lang, version, rtl, firebase }) {
  const state = useScript(
    `https://www.gstatic.com/firebasejs/ui/${version}/firebase-ui-auth__${lang}.js`
  );
  const container = useRef();
  const app = useRef();

  useEffect(() => {
    if (firebase) window.firebase = firebase;
  }, []);
  useEffect(() => {
    if (state.value === "loading") return;
    if (state.value === "error") throw state.payload;
    (async () => {
      if (app.current) await app.current.delete();
      container.current.innerHTML = "";
      const firebaseUI =
        window.firebaseui.auth.AuthUI.getInstance() ||
        new window.firebaseui.auth.AuthUI(auth);
      firebaseUI.start(`#${FIREBASEUI_CONTAINER_ID}`, config);
      app.current = window.firebase.app("[DEFAULT]-firebaseui-temp");
    })();
  }, [auth, config, state.value]);

  return (
    /*#__PURE__*/
    React.createElement(Fragment, null, /*#__PURE__*/React.createElement("link", {
      type: "text/css",
      rel: "stylesheet",
      href: `https://www.gstatic.com/firebasejs/ui/${version}/firebase-ui-auth${rtl ? "-rtl" : ""}.css`
    }), /*#__PURE__*/React.createElement("div", {
      ref: container,
      id: FIREBASEUI_CONTAINER_ID
    }))
  );
}

export default FirebaseUIAuth;
