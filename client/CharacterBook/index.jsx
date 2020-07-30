import React from 'react';
import CharacterBookComponent from './CharacterBookComponent';
import CharacterBookSkeleton from './CharacterBookSkeleton';

function CharacterBook(props) {
  return (
    <React.Suspense fallback={<CharacterBookSkeleton />}>
      <CharacterBookComponent {...props} />
    </React.Suspense>
  )
}

export { CharacterBookSkeleton };

export default CharacterBook;
