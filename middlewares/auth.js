const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("../utils/google/OAuth");
const { profile } = require("../utils/google/services");
const User = require("../models/User");

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

          const { data } = await profile.userinfo.get();

          let user = await User.findOne({ googleId: data.id });
          if (!user) {
            user = new User({
              googleId: data.id,
              name: data.name,
              picture: data.picture,
            });
            await user.save();
          }
          req.user = user;
          next();
        }
      );
    }
  },
};
