const express = require('express');
const router = express.Router();
const expressWs = require('express-ws');
const charData = require('./__mocks__/smashChar');

module.exports = app => {
  const wss = expressWs(app);

  wss.broadcast = (msg) => {
    wss.getWss().clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(msg)
      }
    });
  };

  router.ws('/echo', (ws, req) => {
    ws.on('message', wss.broadcast);
  });

  router.ws('/character/:id', (ws, req) => {
    ws.send(JSON.stringify(charData));
  });

  router.get('/ping', function (req, res) {
   res.send('pong');
  });

  return router;
};
