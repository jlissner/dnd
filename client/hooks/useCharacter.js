import { useCallback, useEffect, useState } from 'react';
import _defaults from 'lodash/defaults';
import useWebsocket from './useWebsocket';

function useCharacter(id) {
  const { protocol, host } = window.location;
  const wsProtocol = protocol.indexOf('https') > -1 ? 'wss' : 'ws';
  const url = `${wsProtocol}://${host}/character/${id}`;
  const { message, readyState, send } = useWebsocket(url);
  const [character, setCharacter] = useState({});
  const loading = readyState === 0;
  const updateCharacter = useCallback(({ name = character.name, attributes = {}, notes = character.notes }) => {
    const type = 'UPDATE';
    const updatedAttributes = _defaults(attributes, character.attributes);
    const action = JSON.stringify({ type, payload: { name, attributes: updatedAttributes, notes } });

    send(action);
  }, [send, character]);

  useEffect(() => {
    if (message) {
      setCharacter(JSON.parse(message));
    }
  }, [message]);

  return [
    character,
    updateCharacter,
    loading,
  ];
}

export default useCharacter
