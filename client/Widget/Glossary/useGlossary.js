import { useMemo } from 'react';
import { v4 } from 'uuid';
import { useRecoilState, useRecoilValue } from 'recoil';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import {
  selectedCharacterState,
  widgetTypesState,
  characterWidgetsState
} from '../../state';
import { removeByIndex } from '../../utils';
import { createWidget } from '../widgetActions';
import useWidget from '../useWidget';

function useGlossary(id) {
  const characterId = useRecoilValue(selectedCharacterState);
  const types = useRecoilValue(widgetTypesState);
  const typeId = _find(types, ['name', 'Glossary']).idPk;
  const [characterWidgets, setCharacterWidgets] = useRecoilState(characterWidgetsState({
    characterId,
    typeId,
  }));
  const {
    widget: glossary,
    saving,
    updateDumbValue,
    remove,
    addToPage,
    attemptSaveable,
  } = useWidget(id);

  return useMemo(() => ({
    glossary,
    saving,
    remove,
    addToPage,
    create: attemptSaveable(async () => {
      const createdGlossary = await createWidget({
        name: 'Glossary',
        characterId,
        widgetTypeId: typeId,
        dumbValues: {
          words: [{
            word: 'Using the Glossary',
            definition: 'Its *markdown* accessible, double click to edit or add a new word',
          }],
        },
      });

      setCharacterWidgets([...characterWidgets, createdGlossary.idPk]);
    }),
    addWord: attemptSaveable(async () => {
      const updatedWords = _cloneDeep(glossary.words);
      const newWordId = v4();

      updatedWords.push({
        id: newWordId,
        word: 'New Word',
        definition: 'A whole new word!'
      })

      await updateDumbValue('words', updatedWords);

      return newWordId;
    }),
    updateWord: attemptSaveable(async (updatedWord) => {
      const updatedWords = _cloneDeep(glossary.words);
      const indexOfWordToUpdate = _findIndex(updatedWords, ['id', updatedWord.id]);

      updatedWords[indexOfWordToUpdate] = updatedWord;

      await updateDumbValue('words', updatedWords);

      return updatedWord;
    }),
    deleteWord: attemptSaveable(async (wordId) => {
      const indexOfWordToUpdate = _findIndex(glossary.words, ['id', wordId]);
      const updatedWords = removeByIndex(glossary.words, indexOfWordToUpdate);

      await updateDumbValue('words', updatedWords);

      return wordId;
    }),
  }), [
    glossary,
    saving,
    remove,
    addToPage,
    updateDumbValue,
    attemptSaveable,
    characterId,
    characterWidgets,
    setCharacterWidgets,
    typeId,
  ]);
}

export default useGlossary;
