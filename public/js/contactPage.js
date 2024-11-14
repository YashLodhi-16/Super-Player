// import simpleValidater to validate data, fetchData to make api request and alert to show or hide alert
import { simpleValidater } from "./utilityFunctions/simpleValidater.js";
import { fetchData } from "./utilityFunctions/utility.js";
import { alert } from "./utilityFunctions/utility.js";
// error audio to play on error
const errorAudio = new Audio("../music/error.mp3");
// get sumbit button
const sumbitBtn = document.getElementById("sumbitBtn");
// add click event to sumbitBtn
sumbitBtn.addEventListener("click", async (e) => {
  // prevent default behaviour of form tag
  e.preventDefault();
  // get username, email, textarea (query) input fields value to use in post request
  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const textarea = document.getElementById("query").value;
  const inputFieldsData = { email, username, textarea };
  // validate username and textarea input fields by using simpleValidater
  const validateUsername = simpleValidater(inputFieldsData, "username");
  const validateTextarea = simpleValidater(inputFieldsData, "textarea");
  // if username and textarea validated then this will fire
  if (validateUsername && validateTextarea) {
    // hide error
    error.addTimer(true);
    // data to send in api
    // method type to post request
    // set body to stringify input fields data
    // headers to Content type application/json for server to understand what kind of data is this
    const params = {
      method: "POST",
      body: JSON.stringify(inputFieldsData),
      headers: { "Content-Type": "application/json" },
    };
    // send post request with "/contact" (api endpoint) by using fetchData
    const data = await fetchData("/contact", params, true);
    // if data ok equals to success then this will fire
    if (data.ok === "success") {
      // show success alert
      alert("success");
      // set location pathname to "/" (home page)
      location.pathname = "/";
      // reset form tag input fields value
      document.getElementById("form").reset();
    } // else this will fire
    else alert("failure");
  } // else this will fire
  else {
    // play error audio
    errorAudio.play();
    // show input field no data error
    error.addTimer(false);
  }
});
