import { useEffect, useMemo, useState } from 'react';

function useWebsocket(url) {
  const ws = useMemo(() => new WebSocket(url), []);
  const [readyState, setReadyState] = useState(ws.readyState)
  const [message, setMessage] = useState('')

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

  function send(msg) {
    if (msg === null || msg === undefined) {
      ws.send('');
    }

    ws.send(msg);
  }

  return {
    readyState,
    message,
    send,
    ws,
  }
}

export default useWebsocket;
