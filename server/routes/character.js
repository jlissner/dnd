const express = require('express');
const router = express.Router();
const axios = require('axios');
const _ = require('lodash');
const charData = require('../../__mocks__/smashChar');
const { wsBroadcaster, graphql } = require('../lib');
const { callGraphql, objToGraphqlStr } = graphql;

async function updateCharacter(id, character) {
  const query = `
    mutation {
      updateCharacter(input: {
        idPk: "${id}"
        patch: { ${objToGraphqlStr(character)} }
      }) {
        clientMutationId
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
        LIST:characterLists {
          nodes {
            list {
              idPk
              title
              type
              showTitle
              listItems {
                nodes {
                  idPk
                  text
                  checked
                  listOrder
                }
              }
            }
          }
        }
        pages:characterPages {
          nodes {
            idPk
            title
            widgets:pageWidgetsByPageFk {
              nodes {
                idPk
                type
                widgetId
                x
                y
                h:height
                w:width
              }
            }
          }
        }
      }
    }
  `);

  const pages = _.map(character.pages.nodes, ({ idPk, title, widgets }) => ({
    idPk,
    title,
    widgets: widgets.nodes
  }));
  const LIST = _.map(character.LIST.nodes, ({ list }) => ({
    idPk: list.idPk,
    title: list.title,
    type: list.type,
    showTitle: list.showTitle,
    items: list.listItems.nodes,
  }));

  return {
    ...character,
    pages,
    LIST,
  };
}

async function updatePageLayout(payload) {
  const mutations = _.reduce(payload, (res, { idPk, ...update }) => res + `
    update_${idPk}:updatePageWidget(input: {
        idPk: "${idPk}",
        patch: { ${objToGraphqlStr(update)} }
      }) {
        clientMutationId
      }
  `, '');
  const query = `
    mutation { ${mutations} }
  `;
  
  await callGraphql(query);
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
          await updateCharacter(id, payload);
          const character = await fetchCharacter(id);

          return wsBroadcaster.broadcast({
            category: 'characters',
            key: id,
            data: JSON.stringify({ id, ...updatedCharacter }),
          });
        }
        case 'UPDATE_PAGE_LAYOUT': {
          const updatedPageLayout = await updatePageLayout(payload);
          const character = await fetchCharacter(id);

          return wsBroadcaster.broadcast({
            category: 'characters',
            key: id,
            data: JSON.stringify({ id, ...character }),
          });
        }
        case 'REFRESH': {
          const character = await fetchCharacter(id);

          return wsBroadcaster.broadcast({
            category: 'characters',
            key: id,
            data: JSON.stringify({ id, ...character }),
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
