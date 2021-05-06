const express = require("express");
const { isLoggedIn } = require("./middlewares/auth");

const google = require("googleapis").google;

const { OAuth2Client } = require("./utils/google/OAuth");

require("dotenv").config();
const app = express();

app.use(require("cookie-parser")());

app.get("/", (req, res) => {
  res.json({
    msg: "Hello, World!",
    routes: {
      auth: [
        `${process.env.URL}/auth/google`,
        `${process.env.URL}/auth/logout`,
      ],
      protected: `${process.env.URL}/protected`,
      profile: `${process.env.URL}/profile`,
    },
  });
});

app.use("/auth", require("./routes/auth"));

app.get("/protected", isLoggedIn, (req, res) => {
  res.json({ msg: "You are viewing protected resources" });
});

app.get("/profile", isLoggedIn, async (req, res) => {
  const profile = google.oauth2({ auth: OAuth2Client, version: "v2" });

  const { data } = await profile.userinfo.get();
  res.json(data);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT} 🚀`)
);
