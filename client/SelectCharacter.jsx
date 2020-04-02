import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
} from '@material-ui/core';
import _map from 'lodash/map';
import AddButton from './Form/AddButton';
import Form from './Form';
import { useUser } from './hooks';
import { Confirm, constants, objToGraphqlStr } from './utils';

const { characterSchemas } = constants;

const NEW_CHARACTER_FORM = [
  {
    accessor: 'name',
    required: true,
  }, {
    accessor: 'schema',
    label: 'Character Type',
    required: true,
    type: 'select',
    options: characterSchemas.map(({ name, schema }) => ({ label: name, value: schema })),
  },
];

const useStyles = makeStyles(() => ({
  button: {
    height: '100%',
    fontSize: '1.5rem',
  },
}));

function SelectCharacter({
  setSelectedCharacter,
}) {
  const classes = useStyles();
  const { user, fetchUser } = useUser();
  const [saving, setSaving] = useState(false);
  const [newChar, setNewChar] = useState({ name: '', schema: '' });
  const { idPk, characters } = user;

  async function saveNewCharacter() {
    setSaving(true);

    const newCharacterMutation = `
      mutation {
        createCharacter(input: { character: {
          userFk: "${idPk}",
          name: "${newChar.name}",
          ${objToGraphqlStr({ attributes: newChar.schema })}
        }}) {
          character {
            idPk
          }
        }
      }
    `;

    try {
      const { data } = await axios.post('/query/graphql', { query: newCharacterMutation });

      await fetchUser();

      setSelectedCharacter(data.data.createCharacter.character.idPk);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Grid container spacing={2} justify="center">
      {_map(characters, ({ idPk: charId, name }) => (
        <Grid item key={name} xs={2}>
          <Paper>
            <Box height={120}>
              <Button onClick={() => setSelectedCharacter(charId)} className={classes.button} fullWidth>{name}</Button>
            </Box>
          </Paper>
        </Grid>
      ))}
      <Grid item xs={2}>
        <Confirm
          Component={({ onClick }) => (
            saving
              ? (
                <Box
                  height={120}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border={1}
                  borderColor="rgba(0, 0, 0, 0.42)"
                  borderRadius={4}
                >
                  <CircularProgress/>
                </Box>)
              : (
                <AddButton
                  BoxProps={{
                    bgcolor: 'none',
                    width: 1,
                    height: 120,
                  }}
                  onAdd={onClick}
                />)
          )}
          onConfirm={saveNewCharacter}
          text={(
            <Form
              form={NEW_CHARACTER_FORM}
              value={newChar}
              setValue={setNewChar}
            />
          )}
          title="Create New Character"
        />
      </Grid>
    </Grid>
  )
}

SelectCharacter.propTypes = {
  setSelectedCharacter: PropTypes.func.isRequired,
};

export default SelectCharacter;
