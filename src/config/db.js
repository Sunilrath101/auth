const mongoose = require("mongoose");
const URL = process.env.URL;

mongoose.set("strictQuery", true);
const db = () => {
  mongoose
    .connect(URL)
    .then((res) => {
      console.log(`DB is connected`);
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

module.exports = db;
