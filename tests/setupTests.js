const { DB_DEV_URI } = require("../config.json");
const MongoDB = require("../src/models/Database");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

beforeAll(async () => {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  const mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();
  await mongoose.connect(uri, { dbName: "MangoDevWorld5000" });
});

afterAll(async () => {
  await mongoose.disconnect();
});
