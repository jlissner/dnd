import { useEffect, useState } from 'react';
import useWebsocket from './useWebsocket';

function useCharacter(id) {
  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/character/${id}`;
  const { message, readyState, send } = useWebsocket(url);
  const [character, setCharacter] = useState({});
  const loading = readyState === 0;

  useEffect(() => {
    if (message) {
      setCharacter(JSON.parse(message));
    }
  }, [message])

  function updateCharacter(attributes) {
    const type = 'UPDATE';
    const action = JSON.stringify({ type, payload: { ...character, ...attributes } });

    send(action);
  }

  return [
    character,
    updateCharacter,
    loading,
  ];
}

export default useCharacter
