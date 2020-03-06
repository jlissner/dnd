import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import _get from 'lodash/get';
import _map from 'lodash/map';
import useCharacter from '../hooks/useCharacter';
import HorizontalInput from '../Form/HorizontalInput';
import Attacks from './Attacks';
import Attributes from './Attributes';
import Equipment from './Equipment';
import DeathSaves from './DeathSaves';
import Features from './Features';
import Personality from './Personality';
import Proficiencies from './Proficiencies';
import TextSection from './TextSection';

function CharacterSheet({ id }) {
  const [character, updateCharacter] = useCharacter(id);

  if (!character.id) {
    return 'loading...';
  }

  return (
    <Paper component="form">
      <Box p={2}>
        TODO:
        <ul>
          <li>[x] finish initial form</li>
          <li>[x] make re-useable markdown editor</li>
          <li>[x] update death saves</li>
          <li>[x] update attacks</li>
          <li>[x] update currency</li>
          <li>[x] update equipment</li>
          <li>[x] update skills (need notes)</li>
          <li>[x] update languages and other proficiencies</li>
          <li>[] verify everything has notes</li>
          <li>[] create markdown helper</li>
          <li>[] make the 'updateCharacter' function do as intended</li>
          <li>[] update the route to group the websockets by character</li>
          <li>[] create the db info needed</li>
          <li>[] add smash character info into db</li>
          <li>[] get the graphql is working</li>
          <li>[] make the update call work</li>
        </ul>
      </Box>

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  value={character.characterName || ''}
                  fullWidth
                  variant="filled"
                  label="Character Name"
                  onChange={(e) => updateCharacter({ name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.className || ''}
                      fullWidth
                      variant="filled"
                      label="Class"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.level}
                      fullWidth
                      variant="filled"
                      label="Level"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.playerName}
                      fullWidth
                      variant="filled"
                      label="Player Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.race}
                      fullWidth
                      variant="filled"
                      label="Race"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.alignment}
                      fullWidth
                      variant="filled"
                      label="Alignment"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.xp}
                      fullWidth
                      variant="filled"
                      label="Experience Points"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Attributes
                  character={character}
                  onSave={() => console.log('make me work')}
                />
              </Grid>

              <Grid item xs={12} sm={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <HorizontalInput
                      label="Inspiration"
                      onChange={() => {}}
                      value={character.inspiration}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <HorizontalInput
                      label="Proficiency Bonus"
                      onChange={() => {}}
                      value={character.proficiencyBonus}
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box border={1} borderColor="rgba(0, 0, 0, 0.42)" borderRadius={4}>
                      <Box p={1.5}>
                        <Proficiencies
                          character={character}
                          onSave={() => alert('make me work!') }
                          proficiencies={character.savingThrows}
                        />
                      </Box>
                      <Box
                        p={1}
                        bgcolor="rgba(0, 0, 0, 0.09)"
                        borderColor="rgba(0, 0, 0, 0.42)"
                        borderRadius="0 0 4px 4px"
                        borderTop={1}
                      >
                        <Typography variant="h6" align="center">Saving Throws</Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box border={1} borderColor="rgba(0, 0, 0, 0.42)" borderRadius={4}>
                      <Box p={1.5}>
                        <Proficiencies
                          character={character}
                          onDelete={() => alert('make me work!') }
                          onSave={() => alert('make me work!') }
                          proficiencies={character.skills}
                        />
                      </Box>
                      <Box
                        p={1}
                        bgcolor="rgba(0, 0, 0, 0.09)"
                        borderColor="rgba(0, 0, 0, 0.42)"
                        borderRadius="0 0 4px 4px"
                        borderTop={1}
                      >
                        <Typography variant="h6" align="center">Skills</Typography>
                      </Box>
                    </Box>
                  </Grid>

                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextSection
                  label="Languages And Proficiencies"
                  onSave={() => console.log('make me work')}
                  value={character.languagesAndProficiencies}
                />
              </Grid>
            </Grid>

          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={character.ac || ''}
                  fullWidth
                  variant="filled"
                  label="Armor Class"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={`${character.initiative > -1 ? '+' : ''}${character.initiative || ''}`}
                  fullWidth
                  variant="filled"
                  label="Initiative"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={character.speed || ''}
                  fullWidth
                  variant="filled"
                  label="Speed"
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      value={_get(character, 'health.maxHp', '')}
                      fullWidth
                      variant="filled"
                      label="Max Hit Points"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={_get(character, 'health.currentHp', '')}
                      fullWidth
                      variant="filled"
                      label="Current Hit Points"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={_get(character, 'health.tempHp', '')}
                  fullWidth
                  variant="filled"
                  label="Temporary Hit Points"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      value={_get(character, 'health.totalHitDice', '')}
                      fullWidth
                      variant="filled"
                      label="Total Hit Dice"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={_get(character, 'health.hitDice', '')}
                      fullWidth
                      variant="filled"
                      label="Hit Dice"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <DeathSaves deathSaves={_get(character, 'health.deathSaves')}/>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Attacks
                  character={character}
                  onDelete={() => alert('make me work')}
                  onSave={() => alert('make me work')}
                />
              </Grid>

              <Grid item xs={12}>
                <Equipment
                  character={character}
                  onDelete={() => alert('make me work')}
                  onSave={() => alert('make me work')}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Personality personality={character.personality}/>
              </Grid>

              <Grid item xs={12}>
                <Features
                  features={character.featuresAndTraits}
                  onDelete={() => alert('make me work')}
                  onSave={() => alert('make me work')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

CharacterSheet.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CharacterSheet;
