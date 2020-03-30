import { useCallback, useEffect, useState } from 'react';

const globalState = {};

function useGlobalState(name, initialState) {
  globalState[name] = globalState[name] === undefined
    ? initialState
    : globalState[name];
  const [gs, setGs] = useState(globalState[name]);
  const updateState = useCallback(() => {
    setGs(globalState[name]);
  }, [name])
  const setGlobalState = useCallback((detail) => {
    globalState[name] = detail;

    window.dispatchEvent(new Event('ugs'))
  }, [name]);

  useEffect(() => {
    window.addEventListener('ugs', updateState)

    return () => {
      window.removeEventListener('ugs', updateState);
    }
  }, [updateState]);

  return [gs, setGlobalState];
}

export default useGlobalState;
