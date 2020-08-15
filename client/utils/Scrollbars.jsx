import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars as CustomScrollbars } from 'react-custom-scrollbars';

function Scrollbars({
  children,
  dontScrollToTop,
  stickyBottom,
  ...props
}) {
  const scrollbarsRef = useRef(null);
  const scrollHeightRef = useRef(null);

  useEffect(() => {
    if (dontScrollToTop) {
      return;
    }

    const intervalId = setInterval(() => {
      const { clientHeight } = scrollbarsRef.current.getValues();

      if (clientHeight) {
        scrollbarsRef.current.scrollToTop();

        clearInterval(intervalId);
      }
    }, 100);
  }, [scrollbarsRef, dontScrollToTop]);

  function handleUpdate({ scrollHeight }) {
    if (!stickyBottom) {
      return;
    }

    if (scrollHeightRef.current !== scrollHeight) {
      scrollbarsRef.current.scrollToBottom();
      scrollHeightRef.current = scrollHeight;
    }
  }

  return (
    <CustomScrollbars
      ref={scrollbarsRef}
      autoHide
      hideTracksWhenNotNeeded
      onUpdate={handleUpdate}
      {...props}
    >
      {children}
    </CustomScrollbars>
  )
}

Scrollbars.propTypes = {
  children: PropTypes.node.isRequired,
  dontScrollToTop: PropTypes.bool,
  stickyBottom: PropTypes.bool,
};

Scrollbars.defaultProps = {
  dontScrollToTop: false,
  stickyBottom: false,
}

export default Scrollbars;
