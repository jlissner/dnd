import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import EditorWrapper from './EditorWrapper';

function Editor({
  form,
  value,
  ...props
}) {
  return (
    <Form
      form={form}
      value={value}
      Wrapper={EditorWrapper}
      WrapperProps={props}
    />
  )
}

Editor.propTypes = {
  form: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
};

export default Editor;
