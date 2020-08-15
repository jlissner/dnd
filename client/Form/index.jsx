import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import _isNil from 'lodash/isNil';
import _get from 'lodash/get';
import _noop from 'lodash/noop';
import _map from 'lodash/map';
import _startCase from 'lodash/startCase';
import _transform from 'lodash/transform';
import DefaultForm from './DefaultForm';
import FormItem from './FormItem';
import validate from './validate';

function getValWithDefaults(value, form) {
  return _transform(form, (res, { accessor, defaultValue }) => {
    if (!accessor || !defaultValue) {
      return;
    }

    const currentValue = res[accessor];

    res[accessor] = _isNil(currentValue) ? defaultValue : currentValue;
  }, _cloneDeep(value));
}

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
  const initialValue = useMemo(() => getValWithDefaults(value, form), [value, form]);
  const [newValue, setNewValue] = useState(initialValue);
  const [formValidation, setFormValidation] = useState(form);
  const hasChanges = !_isEqual(value, newValue);

  function updateValue(newVal, accessor) {
    setNewValue({ ...newValue, [accessor]: newVal });
  }

  return (
    <Wrapper
      hasChanges={hasChanges}
      form={formValidation}
      setForm={setFormValidation}
      value={newValue}
      originalValue={value}
      validate={validate}
      handleSave={() => {
        const { hasError, validatedSchema } = validate(form, newValue);

        setFormValidation(validatedSchema);

        if (!hasError) {
          onSave(newValue);
        }
      }}
      reset={() => setNewValue(initialValue)}
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
              value={_get(newValue, accessor, defaultValue)}
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
  value: PropTypes.shape(),
  Wrapper: PropTypes.elementType,
  WrapperProps: PropTypes.shape(),
  onSave: PropTypes.func,
};

Form.defaultProps = {
  Wrapper: DefaultForm,
  value: {},
  FormItemProps: {},
  GridProps: {},
  GridItemProps: {},
  WrapperProps: {},
  onSave: _noop,
}

export default Form;
