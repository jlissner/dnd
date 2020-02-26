import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import _map from 'lodash/map';
import HorizontalInput from '../../Form/HorizontalInput';

function Currency({
  money,
}) {
  return _map(money, (val, key) => (
    <Box key={key} pb={1}>
      <HorizontalInput
        label={key.toUpperCase()}
        onChange={() => {}}
        value={val}
        inputFirst={false}
      />
    </Box>
  ));
}

Currency.propTypes = {
  money: PropTypes.shape().isRequired,
};

export default Currency;
