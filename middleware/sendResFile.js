// require getFile to get file path
const getFile = require("../lib/getFile/getFile.js");
// arrow function to send file by using req.path
const sendResFile = (req, res) => {
  // file extension
  const extensionRequirer = ".html";
  // replace all / with "" in req.path by using replaceAll
  const fileName = req.path.replaceAll("/", "");
  // file end name
  const fileSurname = "Page";
  // join filename with fileSurname with extensionRequirer
  const page = fileName + fileSurname + extensionRequirer;
  // send response with getFile by using sendFile
  res.sendFile(getFile(page));
};

// export function to use by its api
module.exports = sendResFile;
