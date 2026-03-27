const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");

router.post("/", async (req, res) => {
  const data = new Purchase(req.body);
  await data.save();
  res.send("Purchase added");
});

router.get("/", async (req, res) => {
  const data = await Purchase.find();
  res.json(data);
});

module.exports = router;
