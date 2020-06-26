import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { Fa } from '../utils';
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
import Notes from './Notes';
import { HideawayItem, HideawayList } from '../Hideaway';

function CharacterSheet({ id }) {
  const [{ attributes, name, notes }, updateCharacter] = useCharacter(id);

  if (!name) {
    return 'loading...';
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <Attributes
              attributes={attributes}
              updateCharacter={updateCharacter}
            />
        </Grid>

        <Grid item xs={12} sm={6} md={7} lg={5}>
          <Notes notes={notes} onSave={(notes) => updateCharacter({ notes: notes })} />
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper>
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
                <Typography variant="h6" align="center" className="content-header">Skills</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <Paper>
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
                <Typography variant="h6" align="center" className="content-header">Saving Throws</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Box p={2}>
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
                        value={attributes.inspiration}
                        label="Inspiration"
                        onSave={inspiration => updateCharacter({ attributes: { inspiration } })}
                      />
                    </Grid>
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
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Attacks
            attributes={attributes}
            updateCharacter={updateCharacter}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Equipment
            attributes={attributes}
            updateCharacter={updateCharacter}
          />
        </Grid>
      </Grid>

      <HideawayList>
        
        <HideawayItem
          title="Character"
          icon={<Fa icon="id-card" transform="grow-1" />}
          show={false}
        >
          <Paper>
            <Box p={2}>
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
                <Grid item xs={12} sm={6}>
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
              </Grid>
            </Box>
          </Paper>
        </HideawayItem>

        <HideawayItem
          title="AC/Init/Speed"
          icon={<Fa icon="user-shield" transform="grow-1 right-3" />}
          width={300}
          height={110}
        >
          <Box overflow="hidden">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper>
                  <ArmorClass attributes={attributes} updateCharacter={updateCharacter} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper>
                  <Initiative attributes={attributes} updateCharacter={updateCharacter} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper>
                  <Speed attributes={attributes} updateCharacter={updateCharacter} />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </HideawayItem>


        <HideawayItem
          title="Languages and Proficiencies"
          icon={<Fa icon="language" transform="grow-2" />}
          height={400}
          width={400}
        >
          <Paper>
            <TextSection
              accessor="languagesAndProficiencies"
              label="Languages And Proficiencies"
              updateCharacter={updateCharacter}
              value={attributes.languagesAndProficiencies}
            />
          </Paper>
        </HideawayItem>

        <HideawayItem
          title="Personality"
          icon={<Fa icon="user" transform="grow-1" />}
          height={400}
          width={400}
        >
          <Paper> 
            <TextSection
              accessor="personality"
              label="Personality"
              updateCharacter={updateCharacter}
              value={attributes.personality}
            />
          </Paper>
        </HideawayItem>

        <HideawayItem
          title="Features"
          icon={<Fa icon="address-book"/>}
          height={800}
          width={400}
        >
          <Features
            features={attributes.features}
            updateCharacter={updateCharacter}
          />
        </HideawayItem>
      </HideawayList>
    </Box>
  );
}

CharacterSheet.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CharacterSheet;
