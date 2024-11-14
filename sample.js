/*const uploadRouter = require("express").Router();
different ways of uploading a file in node js
 
 
*********************************************************************************************************************************************************
by using multer middleware
// api route
router.post(upload, require("../lib/upload/getUploadPage").uploadFile.single("video"), require("../lib/upload/getUploadPage").postUploadPage);

const path = require("path");

const fs = require("fs");

const { promisify } = require("util");

const unlink = promisify(fs.unlink);

const multer = require("multer");

const uploadFolder = path.join( __dirname, "../../", "public", "uploads");
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb){
    const uniqueFilename = Date.now().toString(36)+Math.random().toString(36).substr(2);
    cb(null, uniqueFilename);
  }
})

const uploadFile = multer({storage});

const myModel = require("../../model/uploadSchema");

function postUploadPage(req, res){
  const requestedFile = req.file;
  const requestedFileLocation = path.join(uploadFolder, requestedFile.filename);
  const fileObject = {
    name: requestedFile.originalname,
    encoding: requestedFile.encoding,
    videoData: fs.readFileSync(requestedFileLocation),
    contentType: requestedFile.mimetype
  };

  const finalModel = new myModel(fileObject);
  finalModel.save()
    .then(() => unlink(requestedFile.path))
    .catch(err => console.log(err));
  res.status(200).send(requestedFile);
};




*****************************************************************************************************************************************************
by using normal post request
uploadRouter.post("/upload", async (req, res) => {
client side code
fetch("/upload", {
	method: "POST",
	body: file.files[0]
});

server side code
	let buff = Buffer.from([]);
	req.on("data", data => {
		buff = Buffer.concat([buff, data]);
	});
	req.on("end", () => {
		const fs = require("fs");
		fs.writeFile(__dirname+"/output.mp4", buff, (err) => console.log(err));
	});
});



*****************************************************************************************************************************************************
 by using base64 string and formdata only
uploadRouter.post("/upload", async (req, res) => {
client side code
const selectedFile = file.files[0];
const fileReader = new FileReader();
fileReader.onload = function(event){
	const base64FileData = event.target.result.slice(22);
	const formdata = new FormData();
	formdata.append("video", base64FileData);
	fetch("/upload", {
		method: "POST",
		body: formdata
	});
};
fileReader.readAsDataURL(selectedFile);

server side code
send base64 string inside a formdata
	let str = "";
	req.on("data", data => {
		str += data.toString();
	});
	req.on("end", () => {
		let head = req.headers["content-type"];
		head = head.slice(head.lastIndexOf("-") + 1);
		const regex = new RegExp(`${head}|-`, "g");
		str = str.replace(regex, "");
		str = str.replace(`ContentDisposition: formdata; name="video"`, "");
		const fs = require("fs");
		fs.writeFile(__dirname + "/video.mp4", str, {encoding: "base64"}, err => console.log(err));
		res.status(200).json({done: true});
	});
});



****************************************************************************************************************************************************
schema for multer middleware method
const mongoose = require("mongoose");
const videoSchema = mongoose.Schema({
        name: String,
        encoding: String,
        videoData: Buffer,
        contentType: String
});

const uploadModel = mongoose.model("Video",videoSchema );

module.exports = uploadModel;



****************************************************************************************************************************************************
to send right data from client side
const fileReader = new FileReader();
fileReader.onload = function(event){
    const data = event.target.result;
    const video = document.createElement("video");
    video.src = data;
    video.addEventListener("loadeddata", ()=> {
        const canvas = document.createElement("canvas");
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL();
        const formdata = new FormData();
        formdata.append("file", data.slice(22));
        formdata.append("thumbnail", thumbnail);
        formdata.append("name", file.files[0].name);
        formdata.append("lastModified", file.files[0].lastModified);
        formdata.append("type", file.files[0].type);
        formdata.append("size", file.files[0].size);
        fetch("/upload", {
                method: "POST",
                body: formdata
                });
    });
    video.load();
};
fileReader.readAsDataURL(file.files[0]);

 to use in server side 
         let buff = Buffer.from([]);
         req.on("data", data => buff = Buffer.concat([buff, data]));
         req.on("end", () => {
                const parser = require("/middleware/multipartParser");
                const fs = require("fs");
                const obj = parser(request, buffer.toString());
                fs.writeFile(__dirname+"/output.mp4", obj.file, {encoding: "base64"}, err => console.log(err));
                fs.writeFile(__dirname+"/output2.png", obj.thumbnail, {encoding: "base64"}, err => console.log(err));
         });

function parser(req, data){
        const header = req.headers["content-type"];
        const boundaryPrefix = "boundary="
        const boundary = header.split(boundaryPrefix)[1];
        let dataArr = data;
        dataArr = dataArr.replaceAll("Content-Disposition: form-data; name=", "");
        dataArr = dataArr.slice(0, dataArr.lastIndexOf("--"));
        dataArr = dataArr.split("--"+boundary)
        dataArr = dataArr.splice(1,6);
        const arr = {};
        for(let i = 0; i < dataArr.length; i++){
                        const arrObject = dataArr[i].match(/.+/g);
                        const key = JSON.parse(arrObject[0]);
                        const value = arrObject[1];
                        arr[key] = value;
        };
        return arr;
};

module.exports = parser;
****************************************************************************************************************************************************



module.exports = uploadRouter;*/

