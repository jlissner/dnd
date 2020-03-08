class WsBroadcaster {
  constructor() {
    this.broadcasters = {};
  }

  cleanupBroadcasts({ indexes, category, key }) {
    const newBroadcasters = this.broadcasters[category][key].map((ws, i) => (
      indexes.indexOf(i) > -1 ? false : ws
    )).filter(Boolean);

    this.broadcasters[category][key] = newBroadcasters;
  }

  registerWs({ category, key, ws }) {
    try {
      this.broadcasters[category] = this.broadcasters[category] || {};
      this.broadcasters[category][key] = this.broadcasters[category][key] || [];

      this.broadcasters[category][key].push(ws);

    } catch (err) {
      console.error('register error');
      console.error(err)
    }
  }

  broadcast({ category, key, data }) {
    const broadcastersToRemove = [];

    try {
      this.broadcasters[category][key].forEach((ws, i) => {
        if (ws.readyState === 1) {
          ws.send(data);
        }

        if (ws.readyState > 1) {
          broadcastersToRemove.push(i)
        }
      });

      this.cleanupBroadcasts({ indexes: broadcastersToRemove, category, key });
    } catch (err) {
      console.error('broadcast error');
      console.error(err);
    }
  }
}

const wsBroadcaster = new WsBroadcaster();

module.exports = wsBroadcaster;
