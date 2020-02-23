import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '@material-ui/core';
import _filter from 'lodash/filter';
import theme from '../theme';

function If({
  children,
  conditions,
  Component,
  timeout,
  ...props
}) {
  const visible = useMemo(() => Boolean(_filter(conditions, Boolean).length), [conditions]);

  return (
    <Component
      in={visible}
      timeout={timeout}
      {...props}
    >
      {children}
    </Component>
  );
}

If.propTypes = {
  children: PropTypes.node,
  conditions: PropTypes.arrayOf(PropTypes.any).isRequired,
  Component: PropTypes.oneOfType([PropTypes.node, PropTypes.shape()]),
  timeout: PropTypes.shape(),
};

If.defaultProps = {
  children: null,
  Component: Collapse,
  timeout: {
    enter: theme.transitions.duration.standard,
    exit: theme.transitions.duration.standard,
  },
};

export default If;
