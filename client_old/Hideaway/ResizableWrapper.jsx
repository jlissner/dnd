import React, { useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useRefresh } from "muuri-react";
import { ResizableBox } from "react-resizable"
import debounce from "lodash/debounce";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1),
    overflow: 'auto',
  },
}));

// Item component.
const ResizableWrapper = ({ children, width, height }) => {
  const classes = useStyles();
  // Muuri-react provides all the tools to manage scaling.
  // You can implement it however you want.
  const wrapperRef = useRef();
  const contentRef = useRef();
  const refresh = useRefresh();
  // Get the best performance with debouncing.
  // It is not mandatory to use.
  const refreshWithdebounce = debounce(
    () => window.requestAnimationFrame(refresh),
    50
  );

  useEffect(() => {
    const minWidth = contentRef.current.offsetWidth;
    const currentWidth = wrapperRef.current.style.width;

    if (currentWidth < minWidth) {
      wrapperRef.current.style.width = minWidth + "px";
    }
  }, [wrapperRef, contentRef]);

  return (
    <div
      ref={wrapperRef}
      style={{ width, height }}
    >
      <div className="muuri-item">
        {/* React-resizable is used to handle the resizing. */}
        <ResizableBox
          width={width}
          height={height}
          minConstraints={[width, 10]}
          className={classes.item}
          onResize={(_, { size }) => {
            const minWidth = contentRef.current.offsetWidth;
            const width = size.width > minWidth ? size : minWidth;

            wrapperRef.current.style.width = width + "px";
            wrapperRef.current.style.height = size.height + "px";

            refreshWithdebounce();
          }}
        >
          <div ref={contentRef}>
            {children}
          </div>
        </ResizableBox>
      </div>
    </div>
  );
};

export default ResizableWrapper;
