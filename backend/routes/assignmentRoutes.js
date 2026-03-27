const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

router.post("/", async (req, res) => {
  try {
    const data = new Assignment(req.body);
    await data.save();
    res.send("Assignment added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Assignment.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
