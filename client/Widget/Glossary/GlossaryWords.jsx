import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
} from '@material-ui/core';
import _map from 'lodash/map';
import EditableMarkdown from '../../EditableMarkdown';
import useGlossary from './useGlossary';

function GlossaryWords({
  id,
}) {
  const {
    glossary,
    updateWord,
    deleteWord,
  } = useGlossary(id);
  const [currentWord, setCurrentWord] = useState('');
  const [updatedWord, setUpdatedWord] = useState('')

  function handleChange(word) {
    return (evt, isExpanded) => {
      setCurrentWord(isExpanded && word.id);
      setUpdatedWord(word.word);
    }
  }

  function saveUpdatedWord(word) {
    return () => {
      const trimmedUpdatedWord = updatedWord.trim();

      if (trimmedUpdatedWord === word.word) {
        return;
      }

      updateWord({ ...word, word: updatedWord });
    }
  }

  return _map(glossary.words, (word) => (
    <ExpansionPanel expanded={currentWord === word.id} onChange={handleChange(word)}>
      <ExpansionPanelSummary>
        {
          currentWord === word.id
          ? (
              <TextField
                fullWidth
                onBlur={saveUpdatedWord(word)}
                onChange={(evt) => setUpdatedWord(evt.target.value)}
                value={updatedWord}
              />
            )
          : word.word
        }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <EditableMarkdown
          text={word.definition}
          update={(newText) => {
            return updateWord({ ...word, definition: newText });
          }}
        />
        <button onClick={() => deleteWord(word.id)}>delete</button>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
}

GlossaryWords.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GlossaryWords;
