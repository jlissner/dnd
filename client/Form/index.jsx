import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import _isNil from 'lodash/isNil';
import _map from 'lodash/map';
import _startCase from 'lodash/startCase';
import FormItem from './FormItem';
import { If } from '../utils';


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
        }) => (//_map(formProps.conditions, (val, key) => value[key] !== val).filter(Boolean).length === 0 &&
          <Grid
            key={accessor}
            item
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
          >
            <FormItem
              label={label || _startCase(accessor)}
              setValue={(newValue) => updateValue(newValue, accessor)}
              value={_isNil(value[accessor]) ? defaultValue : value[accessor]}
              formValue={value}
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
