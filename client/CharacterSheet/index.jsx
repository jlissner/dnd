import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import useCharacter from '../hooks/useCharacter';
import SaveableInput from '../Form/SaveableInput';
import HorizontalInput from '../Form/HorizontalInput';
import ArmorClass from './ArmorClass';
import Attacks from './Attacks';
import Attributes from './Attributes';
import DeathSaves from './DeathSaves';
import Equipment from './Equipment';
import Features from './Features';
import Health from './Health';
import Initiative from './Initiative'
import Proficiencies from './Proficiencies';
import Speed from './Speed';
import TextSection from './TextSection';

function CharacterSheet({ id }) {
  const [{ attributes, name }, updateCharacter] = useCharacter(id);

  if (!name) {
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
          <li>[x] verify everything has notes</li>
          <li>[x] make the 'updateCharacter' function do as intended</li>
          <li>[x] update the route to group the websockets by character</li>
          <li>[x] create the db info needed</li>
          <li>[x] add smash character info into db</li>
          <li>[x] get the graphql is working</li>
          <li>[x] make the update call work for header</li>
          <li>[x] make the update call work for attributes</li>
          <li>[x] make the update call work for saving throws and skills</li>
          <li>[x] make the update call work for saving languages and proficiencies</li>
          <li>[x] make the update call work for saving personality</li>
          <li>[x] make the update call work for saving attacks</li>
          <li>[x] make the update call work for saving equipment</li>
          <li>[x] make the update call work for saving features and traits</li>
          <li>[x] make the update call work for saving health stuff</li>
          <li>[x] make ssl work?</li>
          <li>[x] get HMR working again</li>
          <li>[] create markdown helper</li>
        </ul>
      </Box>

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <SaveableInput
                  value={name}
                  label="Character Name"
                  onSave={(name) => updateCharacter({ name })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <SaveableInput
                      onSave={(className) => updateCharacter({ attributes: { className } })}
                      value={attributes.className}
                      label="Class"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SaveableInput
                      value={attributes.level}
                      label="Level"
                      onSave={level => updateCharacter({ attributes: { level } })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SaveableInput
                      value={attributes.background}
                      label="Background"
                      onSave={background => updateCharacter({ attributes: { background } })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SaveableInput
                      value={attributes.race}
                      label="Race"
                      onSave={race => updateCharacter({ attributes: { race } })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SaveableInput
                      value={attributes.alignment}
                      label="Alignment"
                      onSave={alignment => updateCharacter({ attributes: { alignment } })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SaveableInput
                      value={attributes.xp}
                      label="Experience Points"
                      onSave={xp => updateCharacter({ attributes: { xp } })}
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
                  attributes={attributes}
                  updateCharacter={updateCharacter}
                />
              </Grid>

              <Grid item xs={12} sm={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <HorizontalInput
                      value={attributes.inspiration}
                      label="Inspiration"
                      onSave={inspiration => updateCharacter({ attributes: { inspiration } })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <HorizontalInput
                      value={attributes.proficiencyBonus}
                      label="Proficiency Bonus"
                      onSave={proficiencyBonus => updateCharacter({
                        attributes: {
                          proficiencyBonus: parseInt(proficiencyBonus, 10),
                        },
                      })}
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box border={1} borderColor="rgba(0, 0, 0, 0.42)" borderRadius={4}>
                      <Box p={1.5}>
                        <Proficiencies
                          fixedList
                          category="savingThrows"
                          attributes={attributes}
                          updateCharacter={updateCharacter}
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
                          category="skills"
                          attributes={attributes}
                          updateCharacter={updateCharacter}
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
                  accessor="languagesAndProficiencies"
                  label="Languages And Proficiencies"
                  updateCharacter={updateCharacter}
                  value={attributes.languagesAndProficiencies}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <ArmorClass attributes={attributes} updateCharacter={updateCharacter} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Initiative attributes={attributes} updateCharacter={updateCharacter} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Speed attributes={attributes} updateCharacter={updateCharacter} />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <Health
                      attributes={attributes}
                      updateCharacter={updateCharacter}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <HorizontalInput
                          value={attributes.health.maxHp}
                          label="Max HP"
                          onSave={maxHp => updateCharacter({ attributes: { health: { ...attributes.health, maxHp } } })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <HorizontalInput
                          value={attributes.health.tempHp}
                          label="Temp HP"
                          onSave={tempHp => updateCharacter({ attributes: { health: { ...attributes.health, tempHp } } })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <HorizontalInput
                          value={attributes.health.totalHitDice}
                          label="Total Hit Die"
                          onSave={totalHitDice => updateCharacter({ attributes: { health: { ...attributes.health, totalHitDice } } })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <HorizontalInput
                          value={attributes.health.hitDice}
                          label="Hit Die"
                          onSave={hitDice => updateCharacter({ attributes: { health: { ...attributes.health, hitDice } } })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DeathSaves attributes={attributes} updateCharacter={updateCharacter} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Attacks
                  attributes={attributes}
                  updateCharacter={updateCharacter}
                />
              </Grid>

              <Grid item xs={12}>
                <Equipment
                  attributes={attributes}
                  updateCharacter={updateCharacter}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextSection
                  accessor="personality"
                  label="Personality"
                  updateCharacter={updateCharacter}
                  value={attributes.personality}
                />
              </Grid>

              <Grid item xs={12}>
                <Features
                  features={attributes.features}
                  updateCharacter={updateCharacter}
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
