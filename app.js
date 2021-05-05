const express = require("express");
const { isLoggedIn } = require("./middlewares/auth");

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
    },
  });
});

app.use("/auth", require("./routes/auth"));

app.get("/protected", isLoggedIn, (req, res) => {
  res.json({ msg: "You are viewing protected resources" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT} 🚀`)
);
