// require simpleValidater module for validation and user mongoose model to save data into mongodb.
const simpleValidater = require("../../middleware/simpleValidater");
const user = require("../../model/contactSchema");

// function to handle post request
async function postContactPage(req, res) {
  // validate username and textarea input field
  const validateTextarea = simpleValidater(req.body, "textarea");
  const validateUsername = simpleValidater(req.body, "username");
  // if username and textarea validated then this will fire
  if (validateUsername && validateTextarea) {
    // using try and catch to handle error
    try {
      // create a mongodb document by using req.body
      const data = new user(req.body);
      // save data into mongodb
      await data.save();
      // send response with status code 200(ok) and a json object to confirm client that data is saved into mongodb.
      res.status(200).json({ ok: "success" });
    } catch (err) {
      // send response with status code 500(internal server) and a json object to confirm client that data is not saved into mongodb.
      res.status(500).json({ not_ok: "failure" });
    }
  }
  // else this will fire
  else res.status(400).json({ not_ok: "failure" });
}

// export postContactPage function to use by its api
module.exports = {
  postContactPage,
};
