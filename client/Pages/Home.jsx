import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  Box,
} from '@material-ui/core';
import MarkdownHelper from '../Form/MarkdownHelper';
// import {
  // useGameBoard,
  // useGlobalState,
// } from '../hooks';
import { selectedCharacterState } from '../state';
import SelectCharacter from '../SelectCharacter';
// import GameBoard from '../GameBoard';
import CharacterBook from '../CharacterBook';
// import PlayerList from '../PlayerList';
// import CharacterSheet from '../CharacterSheet';

function Home() {
  // const gameBoard = useGameBoard();
  const selectedCharacter = useRecoilValue(selectedCharacterState);

  if (!selectedCharacter) {
    return <SelectCharacter />;
  }

  return (
    <>
      {/* <GameBoard gameBoard={gameBoard}/> */}

      {/* <Box width="25%" position="relative" zIndex="1"> */}
      {/*   <Grid container spacing={3}> */}
      {/*     <Grid item xs={12}> */}
      {/*       <PlayerList gameBoard={gameBoard} /> */}
      {/*     </Grid> */}
      {/*     <Grid item xs={12}> */}
      {/*       <CanvasMenu /> */}
      {/*     </Grid> */}
      {/*   </Grid> */}
      {/* </Box> */}
      <Box position="relative" zIndex="1" height={1}>
        {/* <CharacterSheet id={selectedCharacter} /> */}
        <CharacterBook id={selectedCharacter} />
      </Box>
      <MarkdownHelper />
    </>
  )
}

export default Home;
