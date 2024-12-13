const app = require("./app");
const mongoose = require("mongoose");
const { mongodbUri, port } = require("./config");

const connect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

// if was run directly from the command line
if (require.main === module) {
  app.listen(port || 3000);
  connect(mongodbUri);
  mongoose.connection.on("error", console.log);
}

module.exports = { connect };
