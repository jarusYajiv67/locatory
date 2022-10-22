const { Client } = require("cassandra-driver");

const clientConfig = {
  cloud: {
    secureConnectBundle: "./secure-connect-locatory.zip"
  },
  credentials: {
    username: process.env.ASTRA_CLIENT_ID,
    password: process.env.ASTRA_CLIENT_SECRET
  },
  keyspace: process.env.ASTRA_DB_KEYSPACE
};

const client = new Client(clientConfig);

client.connect()
  .then(() => console.log(`[SERVER] Connected to ASTRA DB`));

module.exports = client;