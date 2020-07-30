import React from 'react';
import PropTypes from 'prop-types';
import { SortableHandle } from 'react-sortable-hoc';
import { Fa } from '../../utils';

function SortGrip({ className }) {
  return <Fa className={className} icon="grip-vertical" />;
}

SortGrip.propTypes = {
  className: PropTypes.string,
};

SortGrip.defaultProps = {
  className: '',
};

export default SortableHandle(SortGrip);
