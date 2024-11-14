// import simpleValidater to validate data, fetchData to make api request, changePassType to change password type and alert to show or hide alert
import { fetchData } from "./utilityFunctions/utility.js";
import { simpleValidater } from "./utilityFunctions/simpleValidater.js";
import { changePassType } from "./utilityFunctions/utility.js";
import { alert } from "./utilityFunctions/utility.js";
// error audio to play on error
const errorAudio = new Audio("../music/error.mp3");
// get all element
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const registerBtn = document.getElementById("registerBtn");
const showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

// call changePassType
changePassType(password, confirmPassword, showPasswordCheckbox.checked);

showPasswordCheckbox.addEventListener("click", (e) => {
  // check e.target (this element) is checked or not
  const checked = e.target.checked;
  // use arrow function to run another function with arguments
  changePassType(password, confirmPassword, checked);
});
registerBtn.addEventListener("click", async (e) => {
  // prevent default behaviour of form tag
  e.preventDefault();
  // get username, email, password and confirmPassword value
  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const passVal = password.value;
  const cPassVal = confirmPassword.value;
  // post request body data
  const data = {
    username,
    email,
    password: passVal,
    confirmPassword: cPassVal,
  };
  // validate username, email, password and confirmPassword
  const validateUsername = simpleValidater(data, "username"),
    validatePassword = simpleValidater(data, "password"),
    validateCPassword = simpleValidater(data, "checkPass"),
    validateAll = validateUsername && validatePassword && validateCPassword;
  // if all input field validated then this will fire
  if (validateAll) {
    // hide error
    error.addTimer(true);
    // post request main data
    // method type is post
    // body is stringified data
    // headers Content type is application/json
    const postData = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    // use fetchData to make api request
    const resData = await fetchData("/signup", postData, true);
    // resData.done equals to ok then this will fire
    if (resData.done === "ok") {
      // show success alert
      alert("success");
      // reset form tag data
      document.getElementsByTagName("form")[0].reset();
      // set location pathname to "/" (home page)
      location.pathname = "/";
    } // else this will fire
    else alert("failure");
  } // else this will fire
  else {
    // show input field no data or wrong data error
    error.addTimer(false);
    // play error audio
    errorAudio.play();
  }
});
