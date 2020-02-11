import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@material-ui/icons';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import useCharacter from './hooks/useCharacter';
import Attribute from './Form/Attribute';

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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={character.characterName || ''}
                  fullWidth
                  variant="outlined"
                  label="Character Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.className || ''}
                      fullWidth
                      variant="outlined"
                      label="Class"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.level}
                      fullWidth
                      variant="outlined"
                      label="Level"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.playerName}
                      fullWidth
                      variant="outlined"
                      label="Player Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.race}
                      fullWidth
                      variant="outlined"
                      label="Race"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.alignment}
                      fullWidth
                      variant="outlined"
                      label="Alignment"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={character.xp}
                      fullWidth
                      variant="outlined"
                      label="Experience Points"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <Grid container spacing={4}>
                  {_map(character.attributes, attr => (
                    <Grid item xs={12} key={attr.name}>
                      <Attribute {...attr} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      label="Inspiration"
                      value={character.inspiration}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Proficiency Bonus"
                      value={`+${character.proficiencyBonus}`}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                      <Grid container spacing={1}>
                        {_map(character.attributes, attr => (
                          <React.Fragment key={attr.name}>
                            <Grid item xs={2}>
                              <Checkbox
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={<RadioButtonChecked />}
                                checked={attr.proficient}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                fullWidth
                                value={`${attr.modifier > -1 ? '+' : ''}${attr.modifier + (attr.proficient ? character.proficiencyBonus : 0)}`}
                              />
                            </Grid>
                            <Grid item xs={7}>
                              <Typography>{attr.name}</Typography>
                            </Grid>
                          </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" align="center">Saving Throws</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                      <Grid container spacing={1}>
                        {_map(character.skills, skill => {
                          const { modifier } = _find(character.attributes, ({ abbv }) => abbv === skill.type);

                          return (
                            <React.Fragment key={skill.name}>
                              <Grid item xs={2}>
                                <Checkbox
                                  icon={<RadioButtonUnchecked />}
                                  checkedIcon={<RadioButtonChecked />}
                                  checked={skill.proficient}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  fullWidth
                                  value={`${modifier > -1 ? '+' : ''}${modifier + (skill.proficient ? character.proficiencyBonus : 0)}`}
                                />
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>{skill.name}</Typography>
                              </Grid>
                            </React.Fragment>
                          )
                        })}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" align="center">Skills</Typography>
                        </Grid>
                      </Grid>
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

          <Grid item xs={12} sm={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={character.ac || ''}
                  fullWidth
                  variant="outlined"
                  label="Armor Class"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={`${character.initiative > -1 ? '+' : ''}${character.initiative || ''}`}
                  fullWidth
                  variant="outlined"
                  label="Initiative"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={character.speed || ''}
                  fullWidth
                  variant="outlined"
                  label="Speed"
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      value={_get(character, 'health.maxHp', '')}
                      fullWidth
                      variant="outlined"
                      label="Max Hit Points"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={_get(character, 'health.currentHp', '')}
                      fullWidth
                      variant="outlined"
                      label="Current Hit Points"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={_get(character, 'health.tempHp', '')}
                  fullWidth
                  variant="outlined"
                  label="Temporary Hit Points"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      value={_get(character, 'health.totalHitDice', '')}
                      fullWidth
                      variant="outlined"
                      label="Total Hit Dice"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={_get(character, 'health.hitDice', '')}
                      fullWidth
                      variant="outlined"
                      label="Hit Dice"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    death saves: {JSON.stringify(_get(character, 'health.deathSaves'))}
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

          <Grid item xs={12} sm={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box p={2} mb={1} border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                  <Typography>{_get(character, 'personality.traits', '')}</Typography>
                  <Typography variant="h6">Personality Traits</Typography>
                </Box>

                <Box p={2} mb={1} border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                  <Typography>{_get(character, 'personality.ideals', '')}</Typography>
                  <Typography variant="h6">Ideals</Typography>
                </Box>

                <Box p={2} mb={1} border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                  <Typography>{_get(character, 'personality.bonds', '')}</Typography>
                  <Typography variant="h6">Bonds</Typography>
                </Box>

                <Box p={2} mb={1} border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                  <Typography>{_get(character, 'personality.flaws', '')}</Typography>
                  <Typography variant="h6">Flaws</Typography>
                </Box>

                <Box p={2} mb={1} border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                  <Typography>{_get(character, 'personality.backstory', '')}</Typography>
                  <Typography variant="h6">Backstory</Typography>
                </Box>

                <Box p={2} mb={1} border={1} borderColor="rgba(0, 0, 0, 0.23)" borderRadius="4px">
                  <Typography>{_get(character, 'personality.notes', '')}</Typography>
                  <Typography variant="h6">Notes</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {_map(character.featuresAndTraits, ({ title, text, tags }) => (
                    <Grid item xs={12} key={title}>
                      <small>{tags.join(', ')}</small>
                      <Typography><strong>{title}:</strong> {text}</Typography>
                    </Grid>
                  ))}
                </Grid>
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
