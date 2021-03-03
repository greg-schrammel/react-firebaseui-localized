import { useState, useEffect, useRef } from "react";

function useScript(src) {
  const [state, setState] = useState({ value: "loading", payload: undefined }); // value { loading | loaded | error }
  const script = useRef();

  useEffect(() => {
    script.current = document.createElement("script");
    script.current.src = src;
    script.current.async = true;

    const onScriptLoad = () => setState({ value: "loaded" });

    const onScriptError = (e) => {
      script.current.remove();
      setState({ value: "error", payload: e });
    };

    script.current.addEventListener("load", onScriptLoad);
    script.current.addEventListener("error", onScriptError);

    document.body.appendChild(script.current);
    return () => {
      script.current.removeEventListener("load", onScriptLoad);
      script.current.removeEventListener("error", onScriptError);
    };
  }, [src]);

  return state;
}

export default useScript;
