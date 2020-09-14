import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import useGlossary from './useGlossary';
import WidgetFormWrapper from '../WidgetFormWrapper';

const form = [
  {
    accessor: 'text',
    text: 'You should only have one Glossary per Game',
    type: 'static-text',
    variant: 'h6',
  },
];

function GlossaryForm({ id }) {
  const {
    glossary,
    create,
    saving,
    remove,
    addToPage,
  } = useGlossary(id);

  return (
    <Form
      form={form}
      FormItemProps={{ disabled: saving }}
      value={glossary}
      onSave={id ? () => {} : create}
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

GlossaryForm.propTypes = {
  id: PropTypes.string,
};

GlossaryForm.defaultProps = {
  id: '',
};

export default GlossaryForm;
