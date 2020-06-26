import { useCallback, useEffect, useMemo, useState } from 'react';

function useWebsocket(url) {
  const ws = useMemo(() => new WebSocket(url), [url]);
  const [readyState, setReadyState] = useState(ws.readyState);
  const [message, setMessage] = useState('');
  const send = useCallback((msg) => {
    if (msg === null || msg === undefined) {
      return;
    }

    if (typeof msg === 'object') {
      ws.send(JSON.stringify(msg));

      return;
    }

    ws.send(msg);
  }, [ws]);

  useEffect(() => {
    ws.onopen = () => {
      setReadyState(ws.readyState);
    }

    ws.onclose = () => {
      setReadyState(ws.readyState);
    }

    ws.onerror = () => {
      setReadyState(ws.readyState);
    }

    ws.onmessage = (e) => {
      setMessage(e.data);
    }

    return () => {
      ws.close();
    }
  }, [ws]);

  return {
    readyState,
    message,
    send,
    ws,
  }
}

export default useWebsocket;
