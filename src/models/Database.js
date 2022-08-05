const { MONGO_CERT, DB_STRING } = require("../../config.json");
const mongoose = require("mongoose");

/**
 * Singleton Database instance. The database connection gets
 * set at the entry point (index.js)
 */

class MongoDB {
  constructor() {
    this.db = mongoose.connection;
  }
  init = async () => {
    const credentials = MONGO_CERT;
    await mongoose.connect(
      DB_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        sslValidate: true,
        sslKey: credentials,
        sslCert: credentials,
      },
      () => {
        console.log("Connected Successfully!");
      }
    );

    //Bind connection to error event (to get notification of connection errors)
    this.db.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
  };

  close = async () => {
    try {
      await this.db.close();
      console.log("connection closed");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new MongoDB();
