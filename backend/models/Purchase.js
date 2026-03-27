const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  assetName: String,
  base: String,
  quantity: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
