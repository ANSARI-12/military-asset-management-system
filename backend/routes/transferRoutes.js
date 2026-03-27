const express = require("express");
const router = express.Router();
const Transfer = require("../models/Transfer");

router.post("/", async (req, res) => {
  try {
    const data = new Transfer(req.body);
    await data.save();
    res.send("Transfer added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Transfer.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
