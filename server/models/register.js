
//const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const registerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
});

registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

registerSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const hashedPassword = await bcrypt.hash(update.password, 10);
      this.setUpdate({ ...update, password: hashedPassword });
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Register = mongoose.model("Register", registerSchema);

export default Register;


//module.exports = Register;
