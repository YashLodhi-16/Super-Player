// require signupmodel to create mongodb document, bcrypt to hash password and simpleValidater for validation
const simpleValidater = require("../../middleware/simpleValidater");
const bcrypt = require("bcrypt");
const signupmodel = require("../../model/signupSchema.js");
// function to handle post request
async function postSignupPage(req, res) {
  // validate confirm password by using simpleValidater
  const validateCheckPassword = simpleValidater(req.body, "checkPass");
  // if confirm password validated then this will fire
  if (validateCheckPassword) {
    // try and catch block to handle error
    try {
      // get email, username, password from req.body
      const { email, username, password } = req.body;
      // hash password by using bcrypt
      const hashPassword = await bcrypt.hash(password, 10);
      // create mongodb document by using signupmodel with email, password, username
      const signupDetails = new signupmodel({
        email,
        username,
        password: hashPassword,
      });
      // call document method to generate jwt token
      const token = await signupDetails.generateToken();
      // concat token into signupDetails.tokens
      signupDetails.tokens = [...signupDetails.tokens, { token }];
      // save data into mongodb
      await signupDetails.save();
      // set cookie with jwt(name) and token
      res.cookie("jwt", token, {
        sameSite: "None",
        httpOnly: true,
        secure: true,
      });
      // send response with status code 200(ok) with a json object to client to know that user is successfully signup
      res.status(200).json({ done: "ok" });
    } catch (err) {
      // send response with status code 500(internal server) with a json object to client to know that user is unable signup
      res.status(500).json({ done: "ko" });
    }
  } // else this will fire
  else res.status(400).json({ done: "ko" });
}

// export function to use by its api
module.exports = {
  postSignupPage,
};
