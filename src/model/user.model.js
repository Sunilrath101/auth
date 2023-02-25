const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const usesDetail = mongoose.model("usesDetail", userSchema);

module.exports = usesDetail;
