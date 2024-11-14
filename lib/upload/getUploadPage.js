// require sendResFile to send file by using req.path, uploadFile to upload files into grid fs by using mongoose
const { uploadFile } = require("../../middleware/uploadGFS");
const sendResFile = require("../../middleware/sendResFile");
// function to handle get request
function getUploadPage(req, res) {
  // if req.auth is true then it will call sendResFile function else redirect to home page
  req.auth ? sendResFile(req, res) : res.redirect("/");
}

// function to convert data into base64 string
function getBase64(data) {
  // return base64 string
  return Buffer.from(data, "base64").toString("base64");
}

// function to get main object
function getObject(bucketName, name, data, mimetype) {
  // return object
  return {
    bucketName,
    name,
    mimetype,
    data: getBase64(data),
  };
}

// function to check whether thumbnail is provided or not
function getThumbnail(thumbnail, name) {
  // get thumbnail grid fs bucket name
  const bucketName = "thumbnail";
  // if thumbnail is not given then this will fire
  if (!thumbnail) {
    // return main object
    return {
      bucketName,
      name,
      data: "",
    };
  } // else this will fire
  else return getObject(bucketName, name, thumbnail.data, thumbnail.mimetype);
}

// function to handle post request
async function postUploadPage(req, res) {
  // try and catch block for error handling
  try {
    // get file and thumbnail from req.files
    const { file, thumbnail } = req.files,
      { mimetype } = file;
    // if thumbnail present then check its mimetype equals to image/(anything) else true
    const thumbnailRegex = thumbnail
      ? /image\/.+/.test(thumbnail.mimetype)
      : true;
    // check file mimetype equals to video/(anything)
    const fileRegex = /video\/.+/.test(mimetype);
    // if fileRegex and thumbnailRegex equals to true then this will fire
    if (fileRegex && thumbnailRegex) {
      // get file and thumbnail object by using getObject and getThumbnail function
      const fileObject = getObject(
        "video",
        file.name,
        file.data,
        file.mimetype
      );
      const mainThumbnail = getThumbnail(thumbnail, file.name);
      // call upload file function to store thumbnail in gird fs, get uploaded thumbnail id
      const thumbnailUpload = await uploadFile(mainThumbnail, req.user._id);
      // call upload file function to store video in grid fs, by using thumbnail id
      await uploadFile(fileObject, thumbnailUpload);
      // send response with status code 201(created) with a json object to client to know that file is uploaded
      res.status(201).json({ ok: "success" });
    } // else this will fire
    else res.status(400).json({ ok: "failure" });
  } catch (err) {
    // send response with status code 500(internal server) with a json object to client to know that unable to upload file
    res.status(500).json({ ok: "failure" });
  }
}

// export function to use by its api
module.exports = {
  getUploadPage,
  postUploadPage,
};
