// import fetchData to make api request and alert to show or hide alert
import { fetchData } from "./utilityFunctions/utility.js";
import { alert } from "./utilityFunctions/utility.js";

// get all element
const form = document.querySelector("form");
const spinner = document.getElementById("spinner");
const thumbnail = document.getElementById("thumbnail");
const file = document.getElementById("file");
const sumbitFile = document.getElementById("sumbitFile");
// error audio to play on error
const errorAudio = new Audio(
  "https://res.cloudinary.com/dblq992uw/video/upload/v1731519318/Web_Development/PROJECT_14/music/error_kc7fp8.mp3"
);
// reset form data to select fresh files
form.reset();
// function to validate file type and file existense
function changeName(element) {
  // return a promise
  return new Promise((res, rej) => {
    // get first element of element.labels by using array destructing
    const [label] = element.labels;
    // get input field name with id by using slice
    const inputNameText = label.id.slice(8);
    // try and catch block to handle error
    try {
      // get id from element
      const { id } = element;
      // get first element of element.files (file or thumbnail)
      const [file] = element.files;
      // get type from file
      const { type } = file;
      // check id according to input field and validate file type by using regex
      const regex =
        (id === "thumbnail" && /image/g.test(type)) ||
        (id === "file" && /video/g.test(type));
      // if file exist and regex test success then this will fire
      if (file && regex) {
        // hide error
        error.addTimer(true);
        // get name from file
        const { name } = file;
        // set label innerText to name
        label.innerText = name;
        // resolve promise and send true
        res(true);
      } // else this will fire
      else throw false;
    } catch (err) {
      // show no file or wrong file type error
      error.addTimer(false);
      // set label innerText to backtick string with inputNameText
      label.innerText = `Choose a ${inputNameText}`;
      // play error audio
      errorAudio.play();
      // reject promsie and send error
      rej(err);
    }
  });
}

// add change event on input fields and call changeName function with e.target(reference to this object)
thumbnail.addEventListener("change", (e) => changeName(e.target));
file.addEventListener("change", (e) => changeName(e.target));

// add click event on sumbitFile
sumbitFile.addEventListener("click", async (e) => {
  // prevent default behaviour
  e.preventDefault();
  // validate input file field
  const fileCheck = await changeName(file);
  // if thumbnail.files first element exits then return it
  //else default(wraped in array because we are using array destructing to get first element of thumbnail.files)
  const [mainthumbnailFile] = thumbnail.files[0]
    ? thumbnail.files
    : ["default"];
  // validate input thumbnail field
  const thumbnailCheck =
    mainthumbnailFile !== "default" ? await changeName(thumbnail) : true;
  // if input fields validated then this will fire
  if (fileCheck && thumbnailCheck) {
    // set spinner status attribute to run
    spinner.setAttribute("status", "run");
    // remove none class from spinner
    spinner.classList.remove("none");
    // create new form data
    const formdata = new FormData();
    // append file.files first element to formdata
    formdata.append("file", file.files[0]);
    // append mainthumbnailFile to formdata
    formdata.append("thumbnail", mainthumbnailFile);
    // create post request data
    const postData = {
      method: "POST",
      body: formdata,
    };
    // use fetchData for api request
    const data = await fetchData("/upload", postData, true);
    // if data.ok equals to success then this will fire
    if (data.ok === "success") {
      // add none class to spinner
      spinner.classList.add("none");
      // set spinner status attribute to stop
      spinner.setAttribute("status", "stop");
      // show success alert
      alert("success");
      // reset form tag data
      form.reset();
      // set input fields label innerText to given strings
      file.labels[0].innerText = "Choose a File";
      thumbnail.labels[0].innerText = "Choose a Thumbnail";
      // set location pathname to "/" (home page)
      location.pathname = "/";
    } // else this will fire
    else alert("failure");
  } // else this will fire
  else {
    // play error audio
    errorAudio.play();
    // show no data or data type error
    error.addTimer(false);
  }
});
