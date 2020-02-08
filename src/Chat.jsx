import React, { useEffect, useMemo, useState } from 'react';

function Chat() {
  const [val, setVal] = useState('');
  const [loading, setLoading] = useState(true);
  const socket = useMemo(() => new WebSocket(`ws://${window.location.host}/echo`), []);

  useEffect(() => {
    socket.onmessage = (e) => setVal(e.data);
    socket.onopen = () => {
      setLoading(false);
    };
    socket.onclose = () => {
      console.log('closed')
    }
  }, [socket])


  function sendMsg(e) {
    socket.send(e.target.value);
  }

  if (loading) {
    return 'loading...'
  }

  return (
    <input value={val} onChange={sendMsg} />
  )
}

export default Chat;
