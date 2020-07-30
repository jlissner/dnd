import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import _isNil from 'lodash/isNil';
import _noop from 'lodash/noop';
import _map from 'lodash/map';
import _startCase from 'lodash/startCase';
import FormItem from './FormItem';
import validate from './validate';

function Form({
  form,
  FormItemProps,
  GridProps,
  GridItemProps,
  value,
  onSave,
  Wrapper,
  WrapperProps,
}) {
  const [newValue, setNewValue] = useState(value);
  const [formValidation, setFormValidation] = useState(form);

  function updateValue(newVal, accessor) {
    setNewValue({ ...newValue, [accessor]: newVal });
  }

  return (
    <Wrapper
      form={formValidation}
      setForm={setFormValidation}
      value={newValue}
      originalValue={value}
      validate={validate}
      onSave={() => {
        const { hasError, validatedSchema } = validate(form, newValue);

        setFormValidation(validatedSchema);

        if (!hasError) {
          onSave(newValue);
        }
      }}
      updateValue={updateValue}
      {...WrapperProps}
    >
      <Grid container spacing={2} {...GridProps}>
        {_map(formValidation, ({
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
            {...GridItemProps}
          >
            <FormItem
              label={label || _startCase(accessor)}
              setValue={(val) => updateValue(val, accessor)}
              value={_isNil(newValue[accessor]) ? defaultValue : newValue[accessor]}
              formValue={newValue}
              {...formProps}
              {...FormItemProps}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

Form.propTypes = {
  form: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  FormItemProps: PropTypes.shape(),
  GridProps: PropTypes.shape(),
  GridItemProps: PropTypes.shape(),
  value: PropTypes.shape().isRequired,
  Wrapper: PropTypes.elementType,
  WrapperProps: PropTypes.shape(),
  onSave: PropTypes.func,
};

Form.defaultProps = {
  Wrapper: ({ children }) => <Box p={2}>{children}</Box>,
  FormItemProps: {},
  GridProps: {},
  GridItemProps: {},
  WrapperProps: {},
  onSave: _noop,
}

export default Form;
