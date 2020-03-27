const session = require('express-session');

function getSessionConfig() {
  if (process.env.NODE_ENV === 'production') {
    const redis = require('redis');
    const redisClient = redis.createClient({
      host: 'rpg-together-redis.rtrpch.0001.usw2.cache.amazonaws.com',
      port: 6379,
    });
    const RedisStore = require('connect-redis')(session);

    redisClient.on('error', (err) => {
      console.log('Redis error: ', err);
    });

    return {
      secret: process.env.SESSION_SECRET,
      name: '_rpgTogether',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      store: new RedisStore({
        client: redisClient,
        ttl: 86400,
      }),
    }
  }

  return {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }
}


module.exports = (app) => {
  const sessionConfig = getSessionConfig();

  app.use(require('express-session')(sessionConfig));
}
