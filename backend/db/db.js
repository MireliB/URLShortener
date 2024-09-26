const mongoose = require("mongoose");

const initMongo = () => {
  try {
    mongoose.connect(
      "mongodb+srv://mireloosh2:csIGc5lcsaop3VCh@cluster0.qbs1p.mongodb.net/my-url-convertor"
    );
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  } catch (error) {
    console.log("Mongoose error: ", error);
  }
};

module.exports = initMongo;
