import React, { useEffect, useMemo, useState } from 'react';
import useWebsocket from './hooks/useWebsocket';

function Chat() {
  const { send, readyState, message } = useWebsocket(`ws://${window.location.host}/echo`);

  function sendMsg(e) {
    send(e.target.value);
  }

  if (readyState === 0) {
    return 'loading...';
  }

  return (
    <input value={message} onChange={sendMsg} />
  )
}

export default Chat;
