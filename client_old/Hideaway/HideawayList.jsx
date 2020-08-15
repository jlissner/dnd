import React, {
  Children,
  useCallback,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Tooltip,
  Fab,
} from '@material-ui/core';
import { MuuriComponent } from 'muuri-react';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _xor from 'lodash/xor';
import classnames from 'classnames';
import ResizableWrapper from './ResizableWrapper';

const useStyles = makeStyles((theme) => ({
  fab: {
    top: 0,
    position: 'relative',
    transition: 'all .15s ease-in-out',
  },
  active: {
    top: theme.spacing(-1),
  },
}));

function formatChildren(children) {
  return _map(children, ({ props }) => props);
}

function getInitialKeys(childProps) {
  return childProps
    .filter(({ show }) => show)
    .map(({ title }) => title);
}

function HideawayList({
  children,
}) {
  const classes = useStyles();
  const formattedChildren = formatChildren(Children.toArray(children));
  const [hideawayKeys, setHideawayKeys] = useState(getInitialKeys(formattedChildren));
  const toggleHideaway = useCallback((key) => {
    const updatedHideaways = _xor(hideawayKeys, [key]);

    setHideawayKeys(updatedHideaways);
  }, [hideawayKeys, setHideawayKeys]);
  const hideawayTabs = useMemo(() => _map(hideawayKeys, ({ title, icon, show }, i) => (
    <Tooltip title={title} placement="right" arrow key={title}>
      <Fab
        onClick={() => toggleHideaway(title)}
        size="small"
        color="primary"
        className={classnames({
          [classes.active]: show,
          [classes.fab]: true,
        })}
      >
        {icon}
      </Fab>
    </Tooltip>
  )), [hideawayKeys, classes, toggleHideaway]);

  const hideawayContent = _map(hideawayKeys, (key) => {
    const {
      title,
      children,
      show,
      width,
      height,
    } = _find(formattedChildren, ['title', key]);

    return (
      <ResizableWrapper show={show} key={title} width={width} height={height}>
        <Box height={1} width={1} overflow="auto">
          {children}
        </Box>
      </ResizableWrapper>
    );
  });

  return (
    <Box>
      <Box mb={3}>
        {hideawayTabs}
      </Box>
      <Box bgcolor="rgba(0, 0, 0, 0.09)">
        <MuuriComponent
          dragEnabled
          dragStartPredicate={{ handle: ".content-header" }}
        >
          {hideawayContent}
        </MuuriComponent>
      </Box>
    </Box>
  )
}

HideawayList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HideawayList;
