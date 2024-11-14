// require signUpModel to find user and update its token, bcrypt to compare password and jwt to sign token
const signUpModel = require("../../model/signupSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// function to handle signin post request
async function postSigninPage(req, res) {
  // try and catch block to handle error
  try {
    // get email and password from req.body by using object destructing
    const { email, password } = req.body;
    // find user with email from mongodb by using signUpModel.findOne
    const userData = await signUpModel.findOne({ email });
    // convert user id to string
    const _id = userData._id.toString();
    // compare password with user password by using bcrypt
    const checkedPass = await bcrypt.compare(password, userData.password);
    // if checkedPass is true then this will fire
    if (checkedPass) {
      // sign token by using jwt with id and UNIQUEKEY (got from .env file by using dotenv npm package)
      const token = jwt.sign({ _id }, process.env.UNIQUEKEY);
      // concat token into user tokens
      userData.tokens = [...userData.tokens, { token }];
      // update user tokens with userData.tokens by using signUpModel.findOneAndUpdate
      await signUpModel.findOneAndUpdate(
        { email },
        { tokens: userData.tokens }
      );
      // set cookie by using res.cookie with jwt(name), token option(object)
      res.cookie("jwt", token, {
        sameSite: "None",
        httpOnly: true,
        secure: true,
      });
      // send response with status code 200(ok) with a json object to client to know that user is login successfully
      res.status(200).json({ ok: "success" });
    } // else this will fire
    else res.status(404).json({ ok: "failure" });
  } catch (err) {
    // send response with status code 500(internal server) with a json object to client to know that user is unable to login
    res.status(500).json({ ok: "failure" });
  }
}

// export function to use by its api
module.exports = {
  postSigninPage,
};
