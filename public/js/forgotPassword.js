// import simpleValidater to validate data, fetchData to make api request, changePassType to change password type and alert to show or hide alert
import { fetchData } from "./utilityFunctions/utility.js";
import { simpleValidater } from "./utilityFunctions/simpleValidater.js";
import { changePassType } from "./utilityFunctions/utility.js";
import { alert } from "./utilityFunctions/utility.js";

// error audio to play on error
const errorAudio = new Audio(
  "https://res.cloudinary.com/dblq992uw/video/upload/v1731519318/Web_Development/PROJECT_14/music/error_kc7fp8.mp3"
);
// get all elements
const password = document.getElementById("password");
const showPasswordCheckbox = document.getElementById("showPasswordCheckbox");
const loginBtn = document.getElementById("loginBtn");
// call changePassType with password, {} (empty object instead of confirm password argument) and showPasswordCheckbox.checked
changePassType(password, {}, showPasswordCheckbox.checked);
// add click event on showPasswordCheckbox and loginBtn
showPasswordCheckbox.addEventListener("click", (e) => {
  // check e.target (this element) is checked or not
  const checked = e.target.checked;
  // use arrow function to run another function with arguments
  changePassType(password, {}, checked);
});

loginBtn.addEventListener("click", async () => {
  // get email and username
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  // get password, email and username value
  const passVal = password.value;
  const emailVal = email.value;
  const usernameVal = username.value;
  // post request body data
  const data = {
    password: passVal,
    email: emailVal,
    username: usernameVal,
  };
  // validate username and password with data by using simpleValidater
  const validateUsername = simpleValidater(data, "username");
  const validatePassword = simpleValidater(data, "password");
  // if username and password validated then this will fire
  if (validatePassword && validateUsername) {
    // hide error
    error.addTimer(true);
    // post request main data
    // method type is post
    // body is stringified data
    // headers Content type is application/json
    const postData = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    // use fetchData for api request
    const resData = await fetchData("/forgotPassword", postData, true);
    // if resData.ok equals to success then this will fire
    if (resData.ok === "success") {
      // show success alert
      alert("success");
      // reset input fields value
      email.value = "";
      username.value = "";
      password.value = "";
      // set location pathname to "/" (home page)
      location.pathname = "/signin";
    } // else this will fire
    else alert("failure");
  } // else this will fire
  else {
    // show input no data or wrong data error
    error.addTimer(false);
    // play error audio
    errorAudio.play();
  }
});
