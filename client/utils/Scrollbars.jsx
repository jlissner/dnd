import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars as CustomScrollbars } from 'react-custom-scrollbars';

function Scrollbars({
  children,
  dontScrollToTop,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (dontScrollToTop) {
      return;
    }

    const intervalId = setInterval(() => {
      const { clientHeight } = ref.current.getValues();

      if (clientHeight) {
        ref.current.scrollToTop();

        clearInterval(intervalId);
      }
    }, 100);
  }, [ref, dontScrollToTop]);

  return (
    <CustomScrollbars
      ref={ref}
      autoHide
      hideTracksWhenNotNeeded
      {...props}
    >
      {children}
    </CustomScrollbars>
  )
}

Scrollbars.propTypes = {
  children: PropTypes.node.isRequired,
  dontScrollToTop: PropTypes.bool,
};

Scrollbars.defaultProps = {
  dontScrollToTop: false,
}

export default Scrollbars;
