import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Grid } from '@material-ui/core';
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import _isNil from 'lodash/isNil';
import _map from 'lodash/map';
import _startCase from 'lodash/startCase';
import _transform from 'lodash/transform';
import FormItem from '../Form/FormItem';
import validate from '../Form/validate';

function getValWithDefaults(value, schema) {
  return _transform(schema, (res, { accessor, defaultValue }) => {
    if (!accessor || !defaultValue) {
      return;
    }

    const currentValue = res[accessor];

    res[accessor] = _isNil(currentValue) ? defaultValue : currentValue;
  }, _cloneDeep(value));
}

function useForm({
  schema,
  FormItemProps,
  GridProps,
  GridItemProps,
  value,
  onSave,
}) {
  const [newValue, setNewValue] = useState(getValWithDefaults(value, schema));
  const hasChanges = !_isEqual(value, newValue);
  const [formValidation, setFormValidation] = useState(schema);
  const reset = useCallback(() => {
    setNewValue(value);
    setFormValidation(schema);
  }, [value, schema]);
  const handleSave = useCallback(() => {
    const { hasError, validatedSchema } = validate(formValidation, newValue);

    setFormValidation(validatedSchema);

    if (!hasError) {
      onSave(newValue, reset);
    }
  }, [newValue, onSave, reset, formValidation]);
  const form = useMemo(() => (
    <Grid container spacing={2} {...GridProps}>
      {_map(formValidation, ({
        label,
        accessor,
        defaultValue,
        xs = 12,
        sm,
        md,
        lg,
        key,
        ...formProps
      }) => (
        <Grid
          key={key || accessor}
          item
          xs={xs}
          sm={sm}
          md={md}
          lg={lg}
          {...GridItemProps}
        >
          <FormItem
            label={label || _startCase(accessor)}
            setValue={(val) => setNewValue({ ...newValue, [accessor]: val })}
            value={_isNil(newValue[accessor]) ? defaultValue : newValue[accessor]}
            formValue={newValue}
            {...formProps}
            {...FormItemProps}
          />
        </Grid>
      ))}
    </Grid>
  ), [formValidation, FormItemProps, newValue, GridProps, GridItemProps]);

  useEffect(() => {
    setFormValidation(schema);
  }, [schema]);

  useEffect(() => {
    setNewValue(getValWithDefaults(value, schema));
  }, [schema, value]);

  return useMemo(() => ({
    form,
    handleSave,
    reset,
    hasChanges,
  }), [
    form,
    handleSave,
    reset,
    hasChanges,
  ]);
}

export default useForm;
