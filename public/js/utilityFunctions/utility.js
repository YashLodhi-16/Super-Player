// function to make api request
/*
 * @param {String} url of post request
 * @param {Object} postData request data
 * @param {Boolean} json check response type is json or not
 */
const fetchData = (url, postData, json) => {
  // return new Promise
  return new Promise(async (res, rej) => {
    // try and catch block to handle error
    try {
      // if type of url, postData and json not equals to their request type then throw type error
      if (
        typeof url !== "string" ||
        typeof postData !== "object" ||
        typeof json !== "boolean"
      )
        throw new TypeError("Invalid type of url or postData or json");
      // make api request with url, postData by using fetch
      const response = await fetch(url, postData);
      // if json equals to true then use response.json else use response.text
      const data = json ? response.json() : response.text();
      // resolve promise with data
      res(data);
    } catch (err) {
      // reject promise with err
      rej(err);
    }
  });
};

// function to change password and confirm password type
/*
 * @param {Object} pass  password and confirm password can be string only.
 * @param {Object} cPass
 * @param {Boolean} checked to check checkbox is checked or not
 */
const changePassType = (pass, cPass, checked) => {
  // try and catch block to hanle error handle
  try {
    // if type of pass, cPass and checked not equals to their request type then throw type error
    if (
      typeof pass !== "object" ||
      typeof cPass !== "object" ||
      typeof checked !== "boolean"
    )
      throw new TypeError("Invalid type of pass or cPass or checked");
    // get password types
    const text = "text";
    const password = "password";
    // if checked equals to true then this will fire
    if (checked) {
      // set pass and cPass type to text
      pass.type = text;
      cPass.type = text;
    } // else this will fire
    else {
      // set pass and cPass type to password
      pass.type = password;
      cPass.type = password;
    }
  } catch (err) {
    // log error to console
    console.log(err);
  }
};

// function show or hide alert
/*
 * @param {String} type alert type
 */
const alert = (type) => {
  // if type of type not equals to its request type then throw type error
  if (typeof type !== "string") throw new TypeError("Invalid type of type");
  // if type equals to success then this will fire
  if (type === "success") {
    // add none class to failure
    failure.addTimer(true);
    // remove none class from success
    success.addTimer(false);
  } // else this will fire
  else {
    // add none class to success
    success.addTimer(true);
    // remove none class from failure
    failure.addTimer(false);
  }
};

// export function to use by scripts
export { alert, fetchData, changePassType };
