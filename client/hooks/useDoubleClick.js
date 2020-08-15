import { useCallback, useEffect, useState } from 'react';

function useDoubleClick(onDoubleClick) {
  const [doubleClicking, setDoubleClicking] = useState(false);

  useEffect(() => {
    const clearDoubleClicking = setTimeout(setDoubleClicking, 200, false);

    return () => {
      clearTimeout(clearDoubleClicking);
    }
  }, [doubleClicking]);

  const handleDoubleClick = useCallback((evt) => {
    if (doubleClicking) {
      onDoubleClick(evt);
    } else {
      setDoubleClicking(true);
    }
  }, [onDoubleClick, doubleClicking]);

  return handleDoubleClick;
}

export default useDoubleClick;
