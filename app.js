const express = require("express");
const mongoose = require("mongoose");

const { isLoggedIn } = require("./middlewares/auth");

require("dotenv").config();
const app = express();

app.use(require("cookie-parser")());

const db = process.env.mongoURI;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(`Error connecting mongodb ` + err));

const { profile } = require("./utils/google/services");

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
  console.log("Your MONGODB User ID is:", req.user.id);
  const { data } = await profile.userinfo.get();
  res.json(data);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT} 🚀`)
);
