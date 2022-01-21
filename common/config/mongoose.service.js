const mongoose = require("mongoose");
let count = 0;
let db_url =
  "mongodb://" +
  process.env.MONGO_DB_HOST +
  ":" +
  process.env.MONGO_DB_PORT +
  "/" +
  process.env.MONGO_DB_NAME;

// Change the URI pattern for staging and production
if (
  process.env.ENVIRONMENT == "production" ||
  process.env.ENVIRONMENT == "staging" ||
  process.env.ENVIRONMENT == "preprod"
) {
  db_url =
    "mongodb://" +
    process.env.MONGO_USERNAME +
    ":" +
    process.env.MONGO_PASSWORD +
    "@" +
    process.env.MONGO_DB_URL +
    "/" +
    process.env.MONGO_DB_NAME +
    "?replicaSet=" +
    process.env.REPLICA_SET_NAME +
    "&readPreference=" +
    process.env.MONGO_DB_READ_PREFERENCE;
}
let options = {
  autoIndex: false, // Don't build indexes,
  authSource: process.env.DB_AUTHSOURCE,
  //geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectWithRetry = () => {
  console.log("Connecting... to MongoDB connection with retry");
  mongoose
    .connect(db_url, options)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds. ",
        ++count
      );
      console.log("Retry MongoDB connection...");
      console.log(process.env.ENVIRONMENT);
      console.log("ERROR");
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

module.exports = {
  connectWithRetry,
};
