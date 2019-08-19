import { useState, useEffect, useRef } from 'react';

function useScript(src) {
  const [state, setState] = useState({ loaded: false, error: false });
  const script = useRef();

  useEffect(() => {
    script.current = document.createElement('script');
    script.current.src = src;
    script.current.async = true;

    const onScriptLoad = () => setState({ loaded: src, error: false });

    const onScriptError = e => {
      script.current.remove();
      setState({ loaded: false, error: e });
    };

    script.current.addEventListener('load', onScriptLoad);
    script.current.addEventListener('error', onScriptError);

    document.body.appendChild(script.current);
    return () => {
      script.current.removeEventListener('load', onScriptLoad);
      script.current.removeEventListener('error', onScriptError);
    };
  }, [src]);

  return [state.loaded, state.error];
}

export default useScript;
