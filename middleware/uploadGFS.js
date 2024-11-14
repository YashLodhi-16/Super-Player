// require mongoose to create or retrieve grid fs bucket from mongodb and Readable to create readable stream from string
const mongoose = require("mongoose");
const { Readable } = require("stream");
// function to get grid fs bucket from mongodb
function getBucket(bucketName) {
  // get database from mongoose connection
  const { db } = mongoose.connection;
  // get grid fs bucket with db and bucketName by using new mongoose.mongo.GridFSBucket
  const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName });
  // return bucket
  return bucket;
}

// function to upload file into grid fs bucket
function uploadFile(obj, _id) {
  // return a promise
  return new Promise((res, rej) => {
    // create readable stream from string with obj.data by using Readable.from
    const stream = Readable.from(obj.data);
    // get grid fs bucket with obj.bucketName by using getBucket
    const bucket = getBucket(obj.bucketName);
    // create upload stream by using bucket.openUploadStream
    // first argument is joined obj.name, _ and id
    // second argument is options metadata with mimetype is obj.mimetype
    const bucketStream = bucket.openUploadStream(`${obj.name}_${_id}`, {
      metadata: { mimetype: obj.mimetype },
    });
    // pipe stream to bucketStream by using stream.pipe
    stream.pipe(bucketStream);
    // reject detail string
    const reject = "request rejected due to : ";
    // if error occured on stream then this will fire
    stream.on("error", (err) => rej(reject + err));
    // if error occured on bucketStream then this will fire
    bucketStream.on("error", (err) => rej(reject + err));
    // if bucketStream finish then this will fire
    bucketStream.on("finish", () => {
      // resolve promise with bucketStream.id
      res(bucketStream.id);
    });
  });
}

// export function to use a middleware
module.exports = {
  uploadFile,
  getBucket,
};
