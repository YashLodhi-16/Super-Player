// require mongoose to create mongoose schema and mongoose model and jwt to sign token
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// schema for signup page
// email, username, password and tokens are required and their type must be string only
// email must be unique
const options = {
  required: true,
  type: String,
};
// create mongoose schema with input fields name and options by using mongoose.Schema
const schema = new mongoose.Schema({
  email: {
    ...options,
    unique: true,
  },
  username: options,
  password: options,
  tokens: [{ token: options }],
});

// document method to generate jwt token
schema.methods.generateToken = async function () {
  // convert this (reference to itself) ._id to string
  const _id = this._id.toString();
  // sign a token with _id and UNIQUEKEY (got from dotenv npm package) by using jwt.sign
  const token = await jwt.sign({ _id }, process.env.UNIQUEKEY);
  // return token
  return token;
};

// create mongoose model from mongoose schema with collection signup(name) (signup will change into its plural form when saving data to mongodb)
const model = new mongoose.model("signup", schema);

// export function to use as a middleware
module.exports = model;
