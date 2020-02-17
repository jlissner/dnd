import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import useCharacter from '../hooks/useCharacter';
import HorizontalInput from '../Form/HorizontalInput';
import Attribute from './Attribute';
import DeathSaves from './DeathSaves';
import Features from './Features';
import Personality from './Personality';
import Proficiency from './Proficiency';

function CharacterSheet({ id }) {
  const [character, updateCharacter] = useCharacter(id);

  function getModifier(attr, mod, proficient) {
    const { modifier } = _find(character.attributes, { abbv: attr });
    const proficiencyBonus = proficient ? character.proficiencyBonus : 0;
    const totalModifier = modifier + mod + proficiencyBonus;
    const symbol = totalModifier > 0 ? '+' : '';

    return `${symbol}${totalModifier}`;
  }

  if (!character.id) {
    return 'loading...';
  }

  return (
    <Paper component="form">
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
                <Grid container spacing={3}>
                  {_map(character.attributes, (attr, i) => (
                    <Grid item xs={12} key={attr.name}>
                      <Attribute {...attr} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <HorizontalInput
                      label="Inspiration"
                      onChange={() => {}}
                      value={character.inspiration} />
                  </Grid>

                  <Grid item xs={12}>
                    <HorizontalInput
                      label="Proficiency Bonus"
                      onChange={() => {}}
                      value={character.proficiencyBonus} />
                  </Grid>

                  <Grid item xs={12}>
                    <Box border={1} p={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                      {_map(character.attributes, attr => (
                        <Proficiency key={attr.name} {...attr} proficiencyBonus={character.proficiencyBonus} />
                      ))}
                      <Box mt={1}>
                        <Typography variant="subtitle1" align="center">Saving Throws</Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box border={1} p={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                        {_map(character.skills, skill => {
                          const { modifier } = _find(character.attributes, ({ abbv }) => abbv === skill.type);

                          return (
                            <Proficiency
                              key={skill.name}
                              modifier={modifier}
                              name={skill.name}
                              proficient={skill.proficient}
                              proficiencyBonus={character.proficiencyBonus}
                            />
                          );
                        })}
                        <Box mt={1}>
                          <Typography variant="subtitle1" align="center">Skills</Typography>
                        </Box>
                    </Box>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>

            <Box mt={2} border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
              <Typography align="center" variant="h5">Languages</Typography>
              <Box p={2}>
                {_map(character.languages, language => (
                  <Typography key={language.name}>{language.name}</Typography>
                ))}
              </Box>

              <Typography align="center" variant="h5">Other Proficiencies</Typography>
              <Box p={2}>
                {_map(character.proficiencies, proficiency => (
                  <Typography key={proficiency.name}>{proficiency.name}</Typography>
                ))}
              </Box>
            </Box>
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
                <Grid container spacing={1}>
                  still need to show notes and correct damage/attack options
                  {_map(_get(character, 'equipment.weapons'), wep => (
                    <React.Fragment key={wep.name}>
                      <Grid item xs={4}>
                        <Typography>{wep.quantity > 1 ? `${wep.quantity}x ` : ''}{wep.name}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>{wep.properties.toLowerCase().indexOf('finesse') > -1 ? `${getModifier('str', wep.modifier, wep.proficient)} | ${getModifier('dex', wep.modifier, wep.proficient)}` : getModifier('str', wep.modifier, wep.proficient)}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>{wep.dmg instanceof Array ? wep.dmg.reduce((r, d) => r ? `${r} | ${d}` : d) : wep.dmg}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>{wep.dmgType}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <Grid container spacing={4}>
                      {_map(character.money, (val, key) => (
                        <Grid item key={key} xs={12}>
                          <Typography>{key}: {val}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container spacing={1}>
                      {_map(_get(character, 'equipment.other'), ({ name, properties }) => (
                        <Grid item key={name} xs={12}>
                          <Typography><strong>{name}{properties ? ':' : ''}</strong> {properties}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Personality personality={character.personality}/>
              </Grid>
              
              <Grid item xs={12}>
                <Features features={character.featuresAndTraits} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box p={2}>
        TODO:
          - finish initial form
          - add notes to everything
          - make re-useable markdown editor
          - do death saves
          - refactor and update design
      </Box>
    </Paper>
  );
}

CharacterSheet.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CharacterSheet;
