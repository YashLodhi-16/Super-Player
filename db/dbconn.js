// require mongoose for connecting to mongodb
const mongoose = require("mongoose");

// anonymous function for connecting to mongodb
(async () => {
  // try and catch block to handle error
  try {
    // connect to mongodb
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // if connected successfully to mongodb then this will log to console
    console.log("Connection Successfull");
  } catch (err) {
    // if not connected successfully to mongodb then this will log to console
    console.log(`no Connection due to ${err}`);
  }
})();
// its a self execute function
