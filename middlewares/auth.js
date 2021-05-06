const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("../utils/google/OAuth");
const { profile } = require("../utils/google/services");

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

          const {
            data: { id },
          } = await profile.userinfo.get();

          req.userId = id;
          next();
        }
      );
    }
  },
};
