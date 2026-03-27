const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  fromBase: String,
  toBase: String,
  assetName: String,
  quantity: Number,
  type: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transfer", transferSchema);
