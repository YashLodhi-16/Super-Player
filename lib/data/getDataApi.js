// require getBucket to get grid fs bucket and types to convert id into objectid
const { getBucket } = require("../../middleware/uploadGFS");
const { Types } = require("mongoose");

// function to get username and email
function getUserData(req, res) {
  // set check to req.auth
  const check = req.auth;
  // check if user is login or not then this will fire
  if (check) {
    // get username and email from req.user
    const { username, email } = req.user;
    // send response with status code 200(ok) with a json object to client to know that data sended
    res.status(200).json({ check, username, email });
  } // else this will fire
  else res.status(400).json({ check });
}

// function to delete file from grid fs bucket
async function deleteFile(req, res) {
  // check if user is login or not then this will fire
  if (req.auth) {
    // try and catch block to handle error
    try {
      // get id from req.params by using object destructing
      const { id } = req.params;
      // convert id to objectid by using types.objectid
      const objectId = Types.ObjectId(id);
      // get grid fs bucket with thumbnail by using getBucket
      const thumbnaiBucket = getBucket("thumbnail");
      // get grid fs bucket with video by using getBucket
      const videoBucket = getBucket("video");
      // create regex with _, id and global by using RegExp
      const regex = new RegExp(`_${id}`, "g");
      // find video with (filename) regex by using videoBucket.find, convert it to an array and get first element
      const [videoIdArr] = await videoBucket
        .find({ filename: regex })
        .toArray();
      // delete video with videoIdArr._id by using videoBucket.delete
      await videoBucket.delete(videoIdArr._id);
      // delete thumbnail with objectId by using thumbnaiBucket.delete
      await thumbnaiBucket.delete(objectId);
      // send response with status code 202(accepted) with a json object to client to know that video is deleted
      res.status(202).json({ result: true });
    } catch (err) {
      // send response with status code 500(internal server) with a json object to client to know that error occured
      res.status(500).json({ ok: "failure" });
    }
  } // else this will fire
  else res.status(400).json({ ok: "failure" });
}

// function to get video
async function getData(req, res) {
  // check if user is login or not then this will fire
  if (req.auth) {
    // try and catch block to handle error
    try {
      // get grid fs bucket with video by using getBucket
      const bucket = getBucket("video");
      // convert req.params.id to objectid by using types.objectid
      const id = Types.ObjectId(req.params.id);
      // create regex with _, id and global by using RegExp
      const regex = new RegExp(`_${id}`, "g");
      // get video data with regex (filename) by using bucket.find, convert to array and get first element
      const [videoData] = await bucket.find({ filename: regex }).toArray();
      // get mimetype from videoData.metadata by using object destructing
      const { mimetype } = videoData.metadata;
      // create download stream with (filename) regex by using bucket.openDownloadStreamByName
      const download = bucket.openDownloadStreamByName(regex);
      // add data event on download
      download.on("data", (data) => {
        // convert data to string
        const dataString = data.toString();
        // send dataString to response
        res.write(dataString);
      });
      // add end event on download
      download.on("end", () => {
        // send mimetype to response
        res.write(mimetype);
        // end server response
        res.end();
      });
    } catch (err) {
      // send response with status code 500(interal server) with a json object to client to know that error occured
      res.status(500).json({ ok: "failure" });
    }
  } // else this will fire
  else res.status(400).json({ ok: "failure" });
}

// function to get thumbnail
async function getThumbnail(req, res) {
  // check if user is login or not then this will fire
  if (req.auth) {
    // try and catch block to handle error
    try {
      // get grid fs bucket with thumbnail by using getBucket
      const bucket = getBucket("thumbnail");
      // convert req.params.id to objectid by using types.objectid
      const id = Types.ObjectId(req.params.id);
      // create downloadable stream with id by using bucket.openDownloadStream
      const download = bucket.openDownloadStream(id);
      // piping stream to response
      download.pipe(res);
    } catch (err) {
      // send response with status code 500(internal server) with a json object to client to know that error occured
      res.status(500).json({ ok: "failure" });
    }
  } // else this will fire
  else res.status(400).json({ ok: "failure" });
}

// function to get thumbnail metadata
async function getVideoNum(req, res) {
  // try and catch block to handle error
  try {
    // get user id by using req.user._id.toString()
    const id = req.user._id.toString();
    // regex with _, id and global by using RegExp
    const filename = new RegExp(`_${id}`, "g");
    // get grid fs bucket with thumbnail by using getBucket
    const bucket = getBucket("thumbnail");
    // convert req.body.skipIndex into number
    const skipIndex = Number(req.params.skipIndex);
    // find thumbnail metadata by using bucket.find with limit of 10, skip using skipIndex and convert to array
    const files = await bucket
      .find({ filename })
      .limit(10)
      .skip(skipIndex)
      .toArray();
    // send response with status code 200(ok) with a json object to client to know that metadata is retrieved
    res.status(200).json({ files });
  } catch (err) {
    // send response with status code 400(bad request) with a json object to client to know that error occured
    res.status(400).json({ ok: "failure" });
  }
}

// export functions to use by its apis
module.exports = {
  getData,
  getVideoNum,
  getThumbnail,
  deleteFile,
  getUserData,
};
