const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_change_me";

const auth = async (req, res, next) => {
  try {
    // 1. Get token from header
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.substring(7);
    }
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Find user (optional but good practice)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. Attach user to request
    req.user = user;

    // 5. Continue
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
