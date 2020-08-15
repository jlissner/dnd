import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertTitle,
} from '@material-ui/lab';
import TextBoxComponent from './TextBoxComponent';
import useTextBox from './useTextBox';

function TextBoxWrapper({ id }) {
  const { textBox } = useTextBox(id);

  if (!textBox) {
    return (
      <Alert severity="error">
        <AlertTitle>This Text Box Has Been Deleted</AlertTitle>
        <p>
          This text box has been deleted and can no longer be shown.
        </p>
        <p>
          Please remove this from this page.
        </p>
      </Alert>
    );
  }

  return <TextBoxComponent id={id} />;
}

TextBoxWrapper.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TextBoxWrapper;
