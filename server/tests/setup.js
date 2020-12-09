const mongoose = require("mongoose");
const { mongodbTestUri } = require("../config");

const setupDb = async () => {
  await mongoose.connect(mongodbTestUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

const clearDb = async () => {
  await mongoose.connection.dropDatabase();
};

module.exports = {
  setupDb,
  clearDb,
};
