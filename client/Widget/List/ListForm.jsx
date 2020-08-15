import React from 'react';
import Form from '../../Form';
import WidgetFormWrapper from '../WidgetFormWrapper';
import useList from './useList';

const form = [
  { accessor: 'name', label: 'Title', required: true, md: 6 },
  { accessor: 'showTitle', label: 'Show Title', type: 'checkbox', defaultValue: true, md: 6 },
  {
    accessor: 'type',
    label: 'List Type',
    type: 'select',
    defaultValue: 'ORDERED',
    options: [
      { label: 'Ordered', value: 'ORDERED' },
      { label: 'Unordered', value: 'UNORDERED' },
      { label: 'Check List', value: 'CHECK' },
    ],
  },
];

function ListForm({ id }) {
  const {
    addToPage,
    create,
    deleteList,
    list,
    saving,
    update,
  } = useList(id);

  return (
    <Form
      form={form}
      FormItemProps={{ disabled: saving }}
      value={list}
      onSave={id ? update : create}
      Wrapper={WidgetFormWrapper}
      WrapperProps={{
        handleAddToPage: addToPage,
        handleDelete: deleteList,
        id,
        saving,
      }}
    />
  );
}

export default ListForm;
