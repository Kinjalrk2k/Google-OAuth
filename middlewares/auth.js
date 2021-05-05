module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.cookies.token) {
      res.status(401).json({ msg: "Unauthorized" });
    } else {
      next();
    }
  },
};
