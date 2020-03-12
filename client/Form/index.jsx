import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
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
          type = 'text',
          options,
          defaultValue,
          xs = 12,
          sm,
          md,
          lg,
          required,
          error,
          disabled,
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
              disabled={disabled}
              accessor={accessor}
              label={label || _startCase(accessor)}
              options={options}
              updateValue={updateValue}
              type={type}
              value={value[accessor] || defaultValue}
              required={required}
              error={error}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

Form.propTypes = {
  form: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.shape().isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Form;
