import { useCallback, useEffect, useState } from 'react';
import _defaults from 'lodash/defaults';
import useWebsocket from './useWebsocket';

export const UPDATE_PAGE_LAYOUT = 'UPDATE_PAGE_LAYOUT';
export const UPDATE = 'UPDATE';
export const REFRESH = 'REFRESH';

function useCharacter(id) {
  const { protocol, host } = window.location;
  const wsProtocol = protocol.indexOf('https') > -1 ? 'wss' : 'ws';
  const url = `${wsProtocol}://${host}/character/${id}`;
  const { message, readyState, send } = useWebsocket(url);
  const [character, setCharacter] = useState({});
  const loading = readyState === 0;
  const updateCharacter = useCallback((payload, type) => {
    switch (type) {
      case UPDATE_PAGE_LAYOUT: {
        const action = { type, payload };

        send(action);
        break;
      }
      case UPDATE: {
        const {
          name = character.name,
          attributes = {},
          notes = character.notes,
        } = payload;
        const updatedAttributes = _defaults(attributes, character.attributes);
        const action = { type, payload: { name, attributes: updatedAttributes, notes } };

        send(action);

        break;
      }
      case REFRESH:
      default: {
        send({ type: REFRESH });

        break;
      }
    }
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
