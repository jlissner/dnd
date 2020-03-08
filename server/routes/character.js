const express = require('express');
const router = express.Router();
const axios = require('axios');
const expressWs = require('express-ws');
const charData = require('../../__mocks__/smashChar');
const { wsBroadcaster } = require('../lib');

module.exports = app => {
  const wss = expressWs(app);

  wss.broadcast = (msg) => {
    wss.getWss().clients.forEach(client => {
      console.log(JSON.stringify(client));
      if (client.readyState === 1) {
        client.send(msg)
      }
    });
  };

  router.ws('/echo', (ws, req) => {
    ws.on('message', wss.broadcast);
  });

  router.ws('/:id', (ws, req) => {
    const { id } = req.params;

    wsBroadcaster.registerWs({ category: 'characters', key: id, ws });
    
    axios.post('http://localhost:3000/graphql', {
      query: `
        query {
          character(idPk: "${id}") {
            name
          }
        }
      `
    }).then(({ data }) => {
      wsBroadcaster.broadcast({
        category: 'characters',
        key: id,
        data: JSON.stringify({ ...charData, ...data.character })
      });
    });

  });

  return router;
};
