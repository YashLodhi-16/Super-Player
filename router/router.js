// require express router for files routing, auth to check user is original or not and sendResFile to send files as response
const router = require("express").Router();
const auth = require("../middleware/auth");
const sendResFile = require("../middleware/sendResFile");

// main apis path
const root = "/";
const signup = "/signup";
const signin = "/signin";
const contact = "/contact";
const about = "/about";
const upload = "/upload";
const forgotPassword = "/forgotPassword";

// side apis path
const getData = "/getData/:id";
const getNumber = "/getNumber/:skipIndex";
const getThumbnail = "/getThumbnail/:id";
const logout = "/logout";
const deleteFile = "/deleteFile/:id";
const getUserData = "/getUserData";
const homeLinkAuth = "/homeLinkAuth";

// home page apis
router.get(root, auth, require("../lib/root/getRootPage").getHomePage);
router.get(homeLinkAuth, auth, require("../lib/root/getRootPage").homeCheck);
router.get(getData, auth, require("../lib/data/getDataApi").getData);
router.get(getNumber, auth, require("../lib/data/getDataApi").getVideoNum);
router.get(getThumbnail, auth, require("../lib/data/getDataApi").getThumbnail);
router.get(getUserData, auth, require("../lib/data/getDataApi").getUserData);
router.get(logout, auth, require("../lib/cookie/cookie").clearCookie);
router.delete(deleteFile, auth, require("../lib/data/getDataApi").deleteFile);

// signup page apis
router.get(signup, sendResFile);
router.post(signup, require("../lib/signup/signupRoute").postSignupPage);

// signin page apis
router.get(signin, sendResFile);
router.post(signin, require("../lib/signin/getSinginPage").postSigninPage);

// forgot password page apis
router.get(forgotPassword, sendResFile);
router.post(
  forgotPassword,
  require("../lib/forgotPassword/getForgotPassword").postForgotPassword
);

// contact page apis
router.get(contact, sendResFile);
router.post(contact, require("../lib/contact/getContactPage").postContactPage);

// upload page apis
router.get(upload, auth, require("../lib/upload/getUploadPage").getUploadPage);
router.post(
  upload,
  auth,
  require("../lib/upload/getUploadPage").postUploadPage
);

// about page apis
router.get(about, auth, require("../lib/about/getAboutPage").getAboutPage);

// export router to use in app.js
module.exports = router;
