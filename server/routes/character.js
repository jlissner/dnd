const express = require('express');
const router = express.Router();
const axios = require('axios');
const charData = require('../../__mocks__/smashChar');
const { wsBroadcaster, graphql } = require('../lib');

const { objToGraphqlStr } = graphql;

async function updateCharacter(id, attributes) {
  const query = `
    mutation {
      updateCharacter(input: {
        idPk: "${id}"
        patch: {
          ${objToGraphqlStr({ attributes })}
        }}) {
        character {
          attributes
        }
      }
    }
  `;
  const res = await axios.post('http://localhost:3000/graphql', { query });

  return res.data.data.updateCharacter.character.attributes;
}

async function fetchCharacter(id) {
  const res = await axios.post('http://localhost:3000/graphql', {
    query: `
      query {
        character(idPk: "${id}") {
          attributes
        }
      }
    `
  });

  return res.data.data.character.attributes;
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