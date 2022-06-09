const keys = require("./keys");

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS results (k INT, ts timestamp)")
    .catch((err) => console.error(err));
});

const redis = require("redis");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();

function transform(array) {
  if (array == null) return []
  return Object.entries(array).map((value) => {
    datab = value[1].split(",");
    return {
      k: value[0],
      result: datab[0],
      ts: datab[1],
    };
  });
}

function sortTime(a, b) {
  return parseInt(a["ts"]) < parseInt(b["ts"]) ? 1 : -1
}

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from results ORDER BY ts desc LIMIT 5");
  res.send(values.rows);
});

app.get("/values/history", async (req, res) => {
  redisClient.hgetall("results", (err, values) => {
    let entries = transform(values)
    entries.sort(sortTime)
    res.send(entries.slice(0, 5));
  });
});

app.post("/values", async (req, res) => {
  const k = req.body.k;

  if (parseInt(k) > 30) {
    return res.status(422).send("Index too high");
  }

  redisClient.hset("results", k, "");
  redisPublisher.publish("insert", k);
  pgClient.query("INSERT INTO results(k, ts) VALUES($1, to_timestamp($2))", [k, Date.now()]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("Listening");
});
