const express = require('express');
const router = express.Router();
const expressWs = require('express-ws');

module.exports = app => {
  const wss = expressWs(app);

  router.ws('/echo', (ws, req) => {
    ws.on('message', (msg) => wss.getWss().clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(msg)
      }
    }));
  });

  router.get('/ping', function (req, res) {
   res.send('pong');
  });

  return router;
};
