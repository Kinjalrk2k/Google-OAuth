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

          OAuth2Client.setCredentials({
            access_token: decoded.access_token,
            refresh_token: decoded.refresh_token,
          });

          const {
            data: { id },
          } = await profile.userinfo.get();

          /**
           * check in database by the google id
           * if present, set it in req.user
           * if not create a user and then set it to req.user
           */
          req.userId = id;
          next();
        }
      );
    }
  },
};
