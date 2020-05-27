import React, { useState } from 'react';
import {
  Box,
} from '@material-ui/core';
import MarkdownHelper from '../Form/MarkdownHelper';
import { useGameBoard } from '../hooks';
import SelectCharacter from '../SelectCharacter';
// import PlayerList from '../PlayerList';
import GameBoard from '../GameBoard';
import CharacterSheet from '../CharacterSheet';

function Home() {
  const gameBoard = useGameBoard();
  const [selectCharacter, setSelectedCharacter] = useState();

  if (!selectCharacter) {
    return <SelectCharacter setSelectedCharacter={setSelectedCharacter} />;
  }

  return (
    <>
      <GameBoard gameBoard={gameBoard}/>

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
      <Box position="relative" zIndex="1">
        <CharacterSheet id={selectCharacter} />
      </Box>
      <MarkdownHelper />
    </>
  )
}

export default Home;
