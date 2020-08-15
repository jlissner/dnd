import React from 'react';
import Form from '../../Form';
import WidgetFormWrapper from '../WidgetFormWrapper';
import useTextBox from './useTextBox';

const form = [
  { accessor: 'name', label: 'Title', required: true, md: 6 },
  { accessor: 'showTitle', label: 'Show Title', type: 'checkbox', defaultValue: true, md: 6 },
];

function TextBoxForm({ id }) {
  const {
    addToPage,
    create,
    deleteTextBox,
    textBox,
    saving,
    update,
  } = useTextBox(id);

  return (
    <Form
      form={form}
      FormItemProps={{ disabled: saving }}
      value={textBox}
      onSave={id ? update : create}
      Wrapper={WidgetFormWrapper}
      WrapperProps={{
        handleAddToPage: addToPage,
        handleDelete: deleteTextBox,
        id,
        saving,
      }}
    />
  );
}

export default TextBoxForm;
