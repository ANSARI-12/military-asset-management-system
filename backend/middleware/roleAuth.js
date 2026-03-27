const roleAuth = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role ${
          req.user.role
        } not authorized for this action. Requires: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

module.exports = roleAuth;
