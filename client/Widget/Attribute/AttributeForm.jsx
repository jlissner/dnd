import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import WidgetFormWrapper from '../WidgetFormWrapper';
import useAttribute from './useAttribute';

const form = [
  { accessor: 'name', label: 'Name', required: true },
  { accessor: 'abbr', label: 'Abbreviation', required: true },
  { accessor: 'value', label: 'Base Value', required: true, defaultValue: '0' },
];

function AttributeForm({ id }) {
  const {
    addToPage,
    create,
    deleteAttribute,
    attribute,
    saving,
    update,
  } = useAttribute(id);

  return (
    <Form
      form={form}
      FormItemProps={{ disabled: saving }}
      value={attribute}
      onSave={id ? update : create}
      Wrapper={WidgetFormWrapper}
      WrapperProps={{
        handleAddToPage: addToPage,
        handleDelete: deleteAttribute,
        id,
        saving,
      }}
    />
  );
}

AttributeForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AttributeForm;
