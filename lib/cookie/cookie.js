// require signupmodel to get user from mongodb
const signupmodel = require("../../model/signupSchema");
// function to clear cookie from cookies and user tokens
async function clearCookie(req, res) {
  // check if user is login or not then this will fire
  if (req.auth) {
    // try and catch block to handle error
    try {
      // get jwt token from req.cookies
      const { jwt } = req.cookies;
      // find user with jwt token by using signupmodel.findOne
      const user = await signupmodel.findOne({ "tokens.token": jwt });
      // get _id from user
      const { _id } = user;
      // filter user.tokens to remove jwt token from it.
      const tokens = user.tokens.filter((value) => {
        // if value.token not equals to jwt then return value.token else do nothing
        return value.token !== jwt;
      });
      // update user tokens with tokens(variable) by using signupmodel.findOneAndUpdate
      await signupmodel.findOneAndUpdate({ _id }, { tokens });
      // clear jwt cookie by using res.clearCookie
      res.clearCookie("jwt");
      // redirect user to home page
      res.redirect("/");
    } catch (err) {
      // send response with status code 500(internal server) with a json object to client to know that user is unsuccessfull to logout
      res.status(500).json({ ok: "failure" });
    }
  } // else this will fire
  else res.status(403).json({ ok: "failure" });
}
// export function to use by its api
module.exports = {
  clearCookie,
};
