import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import WidgetFormWrapper from '../WidgetFormWrapper';
import useFeature from './useFeature';

const form = [
  { accessor: 'name', label: 'Name', required: true },
  { accessor: 'description', label: 'Description' },
  { accessor: 'values', label: 'Effects', type: 'smartValues', defaultValue: [] },
];

function FeatureForm({ id }) {
  const {
    addToPage,
    create,
    deleteFeature,
    attribute,
    saving,
    update,
  } = useFeature(id);

  return (
    <Form
      form={form}
      FormItemProps={{ disabled: saving }}
      value={attribute}
      onSave={id ? update : create}
      Wrapper={WidgetFormWrapper}
      WrapperProps={{
        handleAddToPage: addToPage,
        handleDelete: deleteFeature,
        id,
        saving,
      }}
    />
  );
}

FeatureForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FeatureForm;
