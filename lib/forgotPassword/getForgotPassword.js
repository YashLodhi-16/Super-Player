// require bcrypt to hash and compare password, signUpModel to find and update user password and simpleValidater to validate
const bcrypt = require("bcrypt");
const signUpModel = require("../../model/signupSchema");
const simpleValidater = require("../../middleware/simpleValidater");
// function to handle post request
async function postForgotPassword(req, res) {
  // try and catch block to handle error
  try {
    // validate username and password
    const validateUsername = simpleValidater(req.body, "username");
    const validatePassword = simpleValidater(req.body, "password");
    // if username and password validated then this will fire
    if (validatePassword && validateUsername) {
      // get email, password, username from request.body
      const { email, password, username } = req.body;
      // find user with email and username by using signUpModel.findOne
      const userData = await signUpModel.findOne({ email, username });
      // if user exits then this will fire
      if (userData) {
        // hash current password by using bcrypt
        const hashPass = await bcrypt.hash(password, 10);
        // find user with email and user to overwrite old password with new password
        await signUpModel.findOneAndUpdate({ email }, { password: hashPass });
        // send response with status code 200(ok) and a json object to client to know that password is changed now
        res.status(200).json({ ok: "success" });
      } // else this will fire
      else res.status(404).json({ ok: "failure" });
    } // else this will fire
    else res.status(400).json({ ok: "failure" });
  } catch (err) {
    // send response with status code 500(internal server) and a json object to client to know that error occured
    res.status(500).json({ ok: "failure" });
  }
}

// export postForgotPassword to use by its api
module.exports = {
  postForgotPassword,
};
