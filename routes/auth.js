const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { OAuth2Client, loginLink } = require("../auth/OAuth");

router.get("/google", (req, res) => {
  // res.json({ login: loginLink });
  res.redirect(loginLink);
});

router.get("/google/callback", (req, res) => {
  if (req.query.error) {
    // TODO: Handle Error
    console.error("Sign In error0");
    return res.redirect("/");
  } else {
    OAuth2Client.getToken(req.query.code, (err, token) => {
      if (err) {
        console.error("Sign In error1");
        console.error(err);
        // TODO: Handle Error
        return res.redirect("/");
      }

      res.cookie("token", jwt.sign(token, process.env.SECRET));
      return res.redirect("/protected");
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
