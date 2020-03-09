const express = require('express');
const router = express.Router();
const axios = require('axios');
const charData = require('../../__mocks__/smashChar');
const { wsBroadcaster } = require('../lib');

async function updateCharacterName(id, name) {
  const res = await axios.post('http://localhost:3000/graphql', {
    query: `
      mutation {
        updateCharacter(input: {
          idPk: "${id}"
          patch: {
            name: "${name}"
          }}) {
          character {
            name
          }
        }
      }
    `
  });

  return res.data.data.updateCharacter.character;
}

async function fetchCharacter(id) {
  const res = await axios.post('http://localhost:3000/graphql', {
    query: `
      query {
        character(idPk: "${id}") {
          name
        }
      }
    `
  });

  return res.data.data.character;
}

async function openCharacterWs(id, ws) {
  wsBroadcaster.registerWs({ category: 'characters', key: id, ws });

  const character = await fetchCharacter(id);

  wsBroadcaster.broadcast({
    category: 'characters',
    key: id,
    data: JSON.stringify({ ...charData, ...character }),
  });
}

router.ws('/:id', async (ws, req) => {
  const { id } = req.params;

  openCharacterWs(id, ws);

  ws.on('message', async (msg) => {
    const { name } = JSON.parse(msg);
    const updatedCharacter = await updateCharacterName(id, name);

    wsBroadcaster.broadcast({
      category: 'characters',
      key: id,
      data: JSON.stringify({ ...charData, ...updatedCharacter }),
    });
  });
});

module.exports = router;
