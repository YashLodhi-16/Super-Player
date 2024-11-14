// import fetchData module to use get request
import { fetchData } from "./utility.js";

// api endpoint
const url = "/getUserData";
// get data with url and (json argument) true by using fetchData
const data = await fetchData(url, null, true);
// if data.check is true then this will fire
if (data.check) {
  // get all input field and convert to a array
  const inputs = Array.from(document.getElementsByTagName("input"));
  // set input elements value to data keys value
  inputs[0].value = data.username;
  inputs[1].value = data.email;
}
