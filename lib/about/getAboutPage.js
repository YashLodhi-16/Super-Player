// function to get about page
function getAboutPage(req, res) {
  // check user is login or not
  // if login then send about page
  // else redirect him to home page
  req.auth
    ? require("../../middleware/sendResFile")(req, res)
    : res.redirect("/");
}

// export getAboutPage function to use by its api
module.exports = {
  getAboutPage,
};
