// require path to know to path of requested file
const path = require("path");
// function to get file by name
function getFile(fileName) {
  // get main file contain folder path
  const public = path.join(__dirname, "../", "../", "public", "html");
  // join file name with folder path
  const file = path.join(public, fileName);
  // return file path
  return file;
}
// export to use by its apis
module.exports = getFile;
