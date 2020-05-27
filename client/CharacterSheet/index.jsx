import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
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
import Hideaway from '../Hideaway';

function CharacterSheet({ id }) {
  const [{ attributes, name, notes }, updateCharacter] = useCharacter(id);

  if (!name) {
    return 'loading...';
  }

  return (
    <Box>
      <Hideaway icon={<Fa icon="book" transform="grow-1" />}>
        <Notes notes={notes} onSave={(notes) => updateCharacter({ notes: notes })} />
      </Hideaway>

      <Hideaway icon={<Fa icon="swords" transform="grow-1" />}>
        <Attacks
          attributes={attributes}
          updateCharacter={updateCharacter}
        />
      </Hideaway>

      <Hideaway icon={<Fa icon="treasure-chest" transform="grow-1" />}>
        <Equipment
          attributes={attributes}
          updateCharacter={updateCharacter}
        />
      </Hideaway>

      <Hideaway icon={<Fa icon="medkit" transform="grow-1" />}>
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
      </Hideaway>

      <Hideaway icon={<Fa icon="id-card" transform="grow-1" />}>
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
      </Hideaway>

      <Hideaway icon={<Fa icon="male" transform="grow-2" />}>
        <Attributes
          attributes={attributes}
          updateCharacter={updateCharacter}
        />
      </Hideaway>

      <Hideaway icon={<Fa icon="user-shield" transform="grow-1 right-3" />}>
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
        </Grid>
      </Hideaway>

      <Hideaway icon={<Fa icon="running" transform="grow-1" />}>
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
      </Hideaway>

      <Hideaway icon={<Fa icon="language" transform="grow-2" />}>
        <TextSection
          accessor="languagesAndProficiencies"
          label="Languages And Proficiencies"
          updateCharacter={updateCharacter}
          value={attributes.languagesAndProficiencies}
        />
      </Hideaway>

      <Hideaway icon={<Fa icon="user" transform="grow-1" />}>
        <TextSection
          accessor="personality"
          label="Personality"
          updateCharacter={updateCharacter}
          value={attributes.personality}
        />
      </Hideaway>

      <Hideaway icon={<Fa icon="address-book"/>}>
        <Features
          features={attributes.features}
          updateCharacter={updateCharacter}
        />
      </Hideaway>
    </Box>
  );
}

CharacterSheet.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CharacterSheet;
