// require sendResFile to send requested file according to path
const sendResFile = require("../../middleware/sendResFile");
// function to handle get root request
function getHomePage(req, res) {
  // join req.path with home
  const path = `${req.path}home`;
  // call sendResFile with path (wraped in a object) and res
  sendResFile({ path }, res);
}

// function to check whether user is login or not
function homeCheck(req, res) {
  // set login to req.auth
  const login = req.auth;
  // set statusCode if login is true then 200(ok) else 404(not found);
  const statusCode = login ? 200 : 404;
  // sending response with status code statusCode(variable) with a json object to client to know user is login or not
  res.status(statusCode).json({
    check: login,
  });
}
// export functions to use by its api
module.exports = {
  getHomePage,
  homeCheck,
};
