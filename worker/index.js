const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function gS(k) {
  if (k < 1) return 0;

  var a1 = 2;

  return a1*k**(k-1);
}

sub.on('message', (channel, k) => {
  redisClient.hset('results', k, [gS(k), Date.now()].toString());
});
sub.subscribe('insert');
