import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import _isNil from 'lodash/isNil';
import _map from 'lodash/map';
import _startCase from 'lodash/startCase';
import FormItem from './FormItem';

function Form({
  form,
  value,
  setValue,
}) {
  function updateValue(newVal, accessor) {
    setValue({ ...value, [accessor]: newVal });
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {_map(form, ({
          label,
          accessor,
          defaultValue,
          xs = 12,
          sm,
          md,
          lg,
          ...formProps
        }) => (
          <Grid
            key={accessor}
            item
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
          >
            <FormItem
              accessor={accessor}
              label={label || _startCase(accessor)}
              updateValue={updateValue}
              value={_isNil(value[accessor]) ? defaultValue : value[accessor]}
              {...formProps}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

Form.propTypes = {
  form: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.shape().isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Form;
