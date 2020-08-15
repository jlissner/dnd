import React from 'react';
import Form from '../../Form';
import WidgetFormWrapper from '../WidgetFormWrapper';
import useStat from './useStat';

const form = [
  { accessor: 'name', label: 'Title', required: true },
  { accessor: 'baseValue', label: 'Value', defaultValue: '0', required: true },
  {
    accessor: 'type',
    label: 'Stat Type',
    type: 'select',
    defaultValue: 'BASIC',
    options: [
      { label: 'Basic', value: 'BASIC' },
      { label: 'Tracker', value: 'TRACKER' },
    ],
  },
];

function StatForm({ id }) {
  const {
    addToPage,
    create,
    remove,
    stat,
    saving,
    update,
    value,
  } = useStat(id);

  return (
    <Form
      form={form}
      FormItemProps={{ disabled: saving }}
      value={stat}
      onSave={id ? update : create}
      Wrapper={WidgetFormWrapper}
      WrapperProps={{
        handleAddToPage: addToPage,
        handleDelete: remove,
        id,
        saving,
      }}
    />
  );
}

export default StatForm;
