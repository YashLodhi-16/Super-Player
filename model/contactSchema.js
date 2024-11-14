// require mongoose to create mongoose schema and mongoose model
const mongoose = require("mongoose");

// create mongoose schema with username, email and textarea
// all field must be required and their type must be string only
const options = {
  type: String,
  required: true,
};
// create schema with option and input fields name
const schema = new mongoose.Schema({
  username: options,
  email: options,
  textarea: options,
});

// create mongoose model from mongoose schema with collection contact(name) (contact will change into its plural form when saving data to mongodb)
const model = mongoose.model("contact", schema);

// export function to use as a middleware
module.exports = model;
