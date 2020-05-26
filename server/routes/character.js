const express = require('express');
const router = express.Router();
const axios = require('axios');
const charData = require('../../__mocks__/smashChar');
const { wsBroadcaster, graphql } = require('../lib');
const { callGraphql, objToGraphqlStr } = graphql;

async function updateCharacter(id, character) {
  const query = `
    mutation {
      updateCharacter(input: {
        idPk: "${id}"
        patch: {
          ${objToGraphqlStr(character)}
        }}) {
        character {
          attributes
          name
          notes
        }
      }
    }
  `;
  const { updateCharacter } = await callGraphql(query);

  return updateCharacter.character;
}

async function fetchCharacter(id) {
  const { character } = await callGraphql(`
    query {
      character(idPk: "${id}") {
        attributes
        name
        notes
      }
    }
  `);

  return character;
}

async function openCharacterWs(id, ws) {
  wsBroadcaster.registerWs({ category: 'characters', key: id, ws });

  const character = await fetchCharacter(id);

  wsBroadcaster.broadcast({
    category: 'characters',
    key: id,
    data: JSON.stringify({ id, ...character }),
  });
}

router.ws('/:id', async (ws, req) => {
  const { id } = req.params;
  const { hostname, protocol } = req;

  openCharacterWs(id, ws);

  ws.on('message', async (action) => {
    try {
      const { type, payload } = JSON.parse(action);

      switch (type) {
        case 'UPDATE': {
          const updatedCharacter = await updateCharacter(id, payload);

          return wsBroadcaster.broadcast({
            category: 'characters',
            key: id,
            data: JSON.stringify({ id, ...updatedCharacter }),
          });
        }
        default: {
          return console.error(`Action type: ${type} is not recongnized.`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  });
});

module.exports = router;
