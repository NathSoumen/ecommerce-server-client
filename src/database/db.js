module.exports = function () {
    const mongoose = require('mongoose')
  const dbURI = process.env.MONGODB_URI;

  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Event handlers for connection
  mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${dbURI}`);
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });

  // Gracefully close the Mongoose connection when the Node.js process is terminated
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Mongoose disconnected through app termination");
      process.exit(0);
    });
  });
};
