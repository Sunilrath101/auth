require("dotenv").config({ path: "./.env" });

var jwt = require("jsonwebtoken");
const express = require("express");
const db = require("./src/config/db");
const cors = require("cors");
const User = require("./src/model/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const PORT = 5000;
const app = express();
app.use(express.json());

app.use(cors());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPass = await bcrypt.hash(password, saltRounds);

  try {
    let existUser = await User.find({ email });

    if (existUser.length > 0) {
      res.status(202).json({ message: "User already registered" });
      return;
    }

    let newUser = await User.create({ email, password: hashedPass });
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ message: "Something went wrong" });
  }
});

// app.get("/login", passport.authenticate("google"));
// app.get(
//   "/auth/callback/google",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect to your app.
//     res.redirect("/");
//   }
// );

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let existUser = await User.find({ email });

    const hashedPass = await bcrypt.compare(password, existUser[0].password);
    console.log("hashedPass:", hashedPass);

    if (!hashedPass) {
      res.status(404).json({ message: "Email or Password is wrong" });
      return;
    }
    var token = jwt.sign({ _id: existUser[0]._id }, "masai");
    res.status(201).json({ user: existUser[0], token });
  } catch (err) {
    console.log("err:", err);
    res.status(404).json({ message: "Something went wrong" });
  }
});
app.listen(PORT, () => {
  db();
  console.log(`Server is runnig at ${PORT}`);
});
