import { useEffect, useState } from 'react';
import useWebsocket from './useWebsocket';

function useCharacter(id) {
  const url = `ws://${window.location.host}/character/${id}`;
  const { message, readyState, send } = useWebsocket(url);
  const [character, setCharacter] = useState({});

  if (readyState !== 1) {
    console.log('loading...')
  }

  useEffect(() => {
    if (message) {
      setCharacter(JSON.parse(message));
    }
  }, [message])

  function updateCharacter(char) {
    send(char);
  }

  return [
    character,
    updateCharacter,
  ];
}

export default useCharacter
