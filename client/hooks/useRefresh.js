import { useCallback, useState } from 'react';

function useRefresh(logCount) {
  const [count, setCount] = useState(0);
  const refresh = useCallback(() => {
    setCount(curCount => curCount + 1);
  }, []);
  
  if (logCount) {
    console.log(count);
  }

  return refresh
}

export default useRefresh;
