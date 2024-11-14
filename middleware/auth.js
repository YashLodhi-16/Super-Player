// require jwt to verify user and signupSchema to get user from mongodb
const jwt = require("jsonwebtoken");
const user = require("../model/signupSchema");
// function to authenticate user
async function auth(req, res, next) {
  // try, catch and finally block to handle error
  try {
    // get cookie from req.cookies.jwt
    const cookie = req.cookies.jwt;
    // verify cookie with UNIQUEKEY (got from dotenv npm package) by using jwt.verify
    const data = jwt.verify(cookie, process.env.UNIQUEKEY);
    // convert data._id to string
    const _id = data._id.toString();
    // find user with _id
    const userData = await user.findOne({ _id });
    // if user exits then will fire
    if (userData) {
      // set req.user and req.auth to userData and true
      req.user = userData;
      req.auth = true;
    } // else this will fire
    else req.auth = false;
  } catch (err) {
    // set req.auth to false
    req.auth = false;
  } finally {
    // call next function for exection of main api handler
    next();
  }
}

// export function to use as a middleware
module.exports = auth;
