const mongoose = require("mongoose");

const clearDb = (done) => {
  mongoose.connection.dropDatabase();
  return done();
};

beforeEach(async (done) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
  return clearDb(done);
});

afterEach(async (done) => {
  await mongoose.connection.close();
  return done();
});
