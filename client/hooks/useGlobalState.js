import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import _isEqual from 'lodash/isEqual';

const globalState = {};

window.getState = () => globalState

function useGlobalState(name, initialState) {
  globalState[name] = globalState[name] === undefined
    ? initialState
    : globalState[name];
  const [gs, setGs] = useState(globalState[name]);
  const updateState = useCallback(() => {
    setGs(globalState[name]);
  }, [name])
  const setGlobalState = useCallback((detail) => {
    const newVal = typeof detail === 'function'
      ? detail(globalState[name])
      : detail;

    if (_isEqual(newVal, globalState[name])) {
      return;
    }

    globalState[name] = newVal;

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
