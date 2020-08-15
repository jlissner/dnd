import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilCallback, useRecoilState } from 'recoil';
import _forEach from 'lodash/forEach';
import { fetchInitialLoad } from '../actions';
import {
  flagState,
  pageLayoutState,
  smartValueModifierState,
  smartValueState,
  widgetState,
} from '../state';
import CharacterBookComponent from './CharacterBookComponent';
import CharacterBookSkeleton from './CharacterBookSkeleton';

function CharacterBook(props) {
  const { id } = props;
  const [loading, setLoading] = useRecoilState(flagState(`char${id}:loading`));
  const [loaded, setLoaded] = useRecoilState(flagState(`char${id}:loaded`));
  const setInitialState = useRecoilCallback(({ set }) => ({ widgets, smartValues, smartValueModifiers, layouts }) => {
    _forEach(widgets, (widget) => set(widgetState(widget.idPk), widget));
    _forEach(smartValues, (smartValue) => set(smartValueState(smartValue.idPk), smartValue));
    _forEach(smartValueModifiers, (smartValueModifier) => set(smartValueModifierState(smartValueModifier.idPk), smartValueModifier));
    _forEach(layouts, (layout) => set(pageLayoutState(layout.idPk), layout));
  });

  useEffect(() => {
    if (!loading && !loaded) {
      setLoading(true);

      fetchInitialLoad(id)
        .then(setInitialState)
        .then(() => setLoaded(true))
        .catch((error) => console.error(error));
    }
  }, [id, loaded, setLoaded, setInitialState, loading, setLoading]);

  if (!loaded) {
    return <CharacterBookSkeleton />; 
  }

  return (
    <React.Suspense fallback={<CharacterBookSkeleton />}>
      <CharacterBookComponent {...props} />
    </React.Suspense>
  )
}

export { CharacterBookSkeleton };

CharacterBook.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CharacterBook;
