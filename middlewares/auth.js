const jwt = require("jsonwebtoken");
const google = require("googleapis").google;

const { OAuth2Client } = require("../utils/OAuth");

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.cookies.token) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      jwt.verify(
        req.cookies.token,
        process.env.SECRET,
        async (err, decoded) => {
          if (err) {
            return res.status(403).json({ msg: "Forbidden" });
          }

          OAuth2Client.setCredentials({ access_token: decoded.access_token });
        }
      );
      next();
    }
  },
};
