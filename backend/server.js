require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

const purchaseRoutes = require("./routes/purchaseRoutes");
const transferRoutes = require("./routes/transferRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

const Purchase = require("./models/Purchase");
const Transfer = require("./models/Transfer");
const Assignment = require("./models/Assignment");

app.use("/purchases", auth, purchaseRoutes);
app.use("/transfers", auth, transferRoutes);
app.use("/assignments", auth, assignmentRoutes);

app.get("/dashboard", auth, async (req, res) => {
  try {
    const opening = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);
    const openingTotal = opening[0]?.total || 0;

    const transfersIn = await Transfer.aggregate([
      { $match: { type: "IN" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);
    const inTotal = transfersIn[0]?.total || 0;

    const transfersOut = await Transfer.aggregate([
      { $match: { type: "OUT" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);
    const outTotal = transfersOut[0]?.total || 0;

    const expended = await Assignment.aggregate([
      { $match: { status: "expended" } },
      { $group: { _id: null, total: { $sum: 1 } } },
    ]);
    const expendedTotal = expended[0]?.total || 0;

    const closing = openingTotal + inTotal - outTotal - expendedTotal;
    const net = closing - openingTotal;

    res.json({ opening: openingTotal, closing, net });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Failed to compute dashboard" });
  }
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
