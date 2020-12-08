const app = require("./app");
const mongoose = require("mongoose");

const connect = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

// if was run directly from the command line
if (require.main === module) {
  app.listen(process.env.PORT || 3000);
  connect(process.env.MONGODB_URI);
  mongoose.connection.on("error", console.log);
}

module.exports = { connect };
