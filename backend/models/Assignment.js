const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assetName: String,
  assignedTo: String,
  status: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
