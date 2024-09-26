const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    base62Id: String,
    shortUrl: String,
    longUrl: String,
    dateToExpireUrl: Date,
    country: String,
    visited: { type: Number, default: 0 },
    converted: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("urls", schema);
