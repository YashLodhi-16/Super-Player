// use strict mode for no crazy bugs
"use strict";

// import fetchData to make api request and alert to show or hide alert
import { fetchData } from "./utilityFunctions/utility.js";
import { alert } from "./utilityFunctions/utility.js";

// utility functions
// function to get original base64 string
const getBase64 = (mimetype, data) => {
  return `data:${mimetype};base64,${data}`;
};

// function to add or remove utility class from given element
const changeClass = (element, job, className) => {
  job ? element.classList.add(className) : element.classList.remove(className);
};

// function to get element by its id
const elementById = (name) => {
  return document.getElementById(name);
};

// data to access in whole app
let APP = {
  skipIndex: 0,
  hitted: false,
  none: "none",
};

// function to add video thumbnail into mainOtherVideoContainer
const addVideoThumbnail = (src, name, index, id) => {
  // get mainOtherVideoContainer by using elementById
  const mainOtherVideoContainer = elementById("mainOtherVideoContainer");
  // create template with index, src and name by using backticks
  const template = `<img id="thumbnail-${index}" class="thumbnail border1px-white b-radius-30px width-100" src="${src}" alt="video thumbnail">
							      <span class="thumbnailName none" id="thumbnailName-${index}">${name}</span>
                    <img src="https://res.cloudinary.com/dblq992uw/image/upload/v1731517874/Web_Development/PROJECT_14/img/deleteIcon_ieupg2.png" class="absolute color-white bold deleteIcon font-x-larger border-circle" id="deleteIcon-${index}">
						        `;
  // create div element by using document.createElement
  const div = document.createElement("div");
  // set div id to id(variable)
  div.setAttribute("id", id);
  // set div class to (given string)
  div.setAttribute("class", "thumbnailContainer pointer");
  // set div innerHTML to template
  div.innerHTML = template;
  // add div into mainOtherVideoContainer.innerHTML
  mainOtherVideoContainer.appendChild(div);
};

// arrow function to watch video
const watchVideo = async (id) => {
  // get video and spinner by using elementById
  const video = elementById("video"),
    spinner = elementById("spinner");
  // set spinner status attribute to run
  spinner.setAttribute("status", "run");
  // remove none class from spinner by using changeClass
  changeClass(spinner, false, APP.none);
  // add none class to video by using changeClass
  changeClass(video, true, APP.none);
  // get video base64 string with id by using fetchData
  let data = await fetchData(`/getData/${id}`, null, false);
  // create regex to extract mimetype from data
  const regex = /video.+/g;
  // get mimetype with array destructing by using regex.exec
  const [mimetype] = regex.exec(data);
  // replace mimetype with ""(empty portion) in data
  data = data.replace(mimetype, "");
  // set video first element child src to original base64 string with mimetype and data by using getBase64
  video.firstElementChild.src = getBase64(mimetype, data);
  // add loadeddata event on video
  video.addEventListener("loadeddata", () => {
    // add none class to spinner by using changeClass
    changeClass(spinner, true, APP.none);
    // set spinner status attribute to stop
    spinner.setAttribute("status", "stop");
    // remove none class from video by using changeClass
    changeClass(video, false, APP.none);
  });
  // load video
  video.load();
};

// arrow function to add events
const addEvent = (id) => {
  // get tCon with id by using elementById
  const tCon = elementById(id);
  // get all children of thumbnailContainer by using array destructing
  const [thumbnail, name, deleteSpan] = tCon.children;
  // add click event on deleteSpan
  deleteSpan.addEventListener("click", async () => {
    // post request main data
    const postData = {
      method: "DELETE",
    };
    // delete video with id and postData by using fetchData
    const res = await fetchData(`/deleteFile/${id}`, postData, true);
    // if res.result equals to true then this will fire
    if (res.result) {
      // remove tCon
      tCon.remove();
      // show success alert
      alert("success");
    } // else this will fire
    else alert("failure");
  });

  // utility function to add or remove utility classes from name and thumbnail
  const sameFunc = (nameClass, thumbnailClass) => {
    // utility class to change opacity to 50 percent
    const opacity50 = "opacity-50";
    // add or remove utility class with name, nameClass and APP.none by using changeClass
    changeClass(name, nameClass, APP.none);
    // add or remove utility class with thumbnail, thumbnailClass and opacity50 by using changeClass
    changeClass(thumbnail, thumbnailClass, opacity50);
  };
  // add click event on name and call watchVideo with id
  name.addEventListener("click", () => watchVideo(id));
  // add click event on thumbnail and call watchVideo with id
  thumbnail.addEventListener("click", () => watchVideo(id));
  // add mouseover event on tCon and add or remove utility classes with false and true by using sameFunc
  tCon.addEventListener("mouseover", () => sameFunc(false, true));
  // add mouseout event on tCon and add or remove utility classes with true and false by using sameFunc
  tCon.addEventListener("mouseout", () => sameFunc(true, false));
  // add touchstart event on tCon and add or remove utility classes with false and true by using sameFunc
  tCon.addEventListener("touchstart", () => sameFunc(false, true));
  // add touchmove event on tCon and add or remove utility classes with false and true by using sameFunc
  tCon.addEventListener("touchmove", () => sameFunc(false, true));
  // add touchend event on tCon and add or remove utility classes with true and false by using sameFunc
  tCon.addEventListener("touchend", () => sameFunc(true, false));
  // add touchcancel event on tCon and add or remove utility classes with true and false by using sameFunc
  tCon.addEventListener("touchcancel", () => sameFunc(true, false));
};

// arrow function to add videos thumbnail in mainOtherVideoContainer
const getThumbnail = async (skipIndex) => {
  // if type of skipIndex equals to number then this will fire
  if (typeof skipIndex === "number") {
    // set APP.hitted to true
    APP.hitted = true;
    // get thumbnail data with skipIndex by using fetchData
    const { files } = await fetchData(`/getNumber/${skipIndex}`, null, true);
    // get length from files by using object destructing
    const { length } = files;
    // if length not equals to 0 and files exits then this will fire
    if (length !== 0 && files) {
      // loop to iterate all thumbnails
      files.forEach(async (element, index) => {
        // get originalIndex by add index with APP.skipIndex
        const originalIndex = index + APP.skipIndex;
        // get length and _id from element by using object destructing
        const { length, _id } = element;
        // get first element of element.filename by using split with _
        const [videoName] = element.filename.split("_");
        // if length not less than or equals to 0 then this will fire
        if (!length <= 0) {
          // get mimetype from element.metadata
          const { mimetype } = element.metadata;
          // get thumbnail base64 string with _id by using fetchData
          const data = await fetchData(`/getThumbnail/${_id}`, null, false);
          // get original base64 string with mimetype and data by using getBase64
          const thumbnailDataString = getBase64(mimetype, data);
          // add thumbnail to mainOtherVideoContainer
          addVideoThumbnail(thumbnailDataString, videoName, originalIndex, _id);
        } // else this will fire
        else {
          // default thumbnail url
          const defaultUrl =
            "https://res.cloudinary.com/dblq992uw/image/upload/v1731517875/Web_Development/PROJECT_14/img/default_icie74.png";
          // add thumbnail to mainOtherVideoContainer
          addVideoThumbnail(defaultUrl, videoName, originalIndex, _id);
        }
        // if _id exits then set timeout to send _id copy to addEvent at loop end else do nothing
        if (_id) setTimeout(() => addEvent(_id.slice()), 0);
      });
      // add length into APP.skipIndex
      APP.skipIndex += length;
    } // else this will fire
    else APP.skipIndex = false;
  }
  // setTimeout with 1 second timer
  setTimeout(() => {
    // set APP.hitted to false
    APP.hitted = false;
  }, 1000);
};

// anonymous arrow function to check whether user is login or not and hide or show navigating options
(async () => {
  // get list and convert it to an array
  const list = Array.from(document.getElementsByClassName("list"));
  // utility class name
  const listHover = "listHover";
  // loop to iterate list element
  list.forEach((li) => {
    // add touch events on li and add or remove list hover class by using changeClass
    li.addEventListener("touchstart", () => changeClass(li, true, listHover));
    li.addEventListener("touchmove", () => changeClass(li, true, listHover));
    li.addEventListener("touchend", () => changeClass(li, false, listHover));
    li.addEventListener("touchcancel", () => changeClass(li, false, listHover));
  });
  // check user is login or not by using fetchData
  const data = await fetchData("/homeLinkAuth", null, true);
  // if data.check is true then this will fire
  if (data.check) {
    // get elements with id by using elementById and show or hide them with boolean by using changeClass
    changeClass(elementById("list-2"), false, APP.none);
    changeClass(elementById("list-3"), true, APP.none);
    changeClass(elementById("list-4"), true, APP.none);
    changeClass(elementById("list-5"), false, APP.none);
    changeClass(elementById("list-6"), false, APP.none);
    // call getThumbnail with APP.skipIndex
    getThumbnail(APP.skipIndex);
  }
})();
// self execution of anonymous arrow function

// get all elements
const mainHamburgerContainer = elementById("mainHamburgerContainer"),
  searchBar = elementById("searchBar"),
  mainContainer = elementById("mainContainer"),
  searchBtn = elementById("searchBtn");

// add click event on mainHamburgerContainer
mainHamburgerContainer.addEventListener("click", () => {
  // get mainNavbarContainer with id by using elementById
  const mainNavbarContainer = elementById("mainNavbarContainer");
  // toggle mainNavbarContainer toggle class
  mainNavbarContainer.classList.toggle("toggle");
});

// arrow function to search videos by name
const searchVideo = () => {
  // get searchBar value
  const { value } = searchBar;
  // get videos name and convert it to an array
  const videoName = Array.from(
    document.getElementsByClassName("thumbnailName")
  );
  // forEach loop to iterate videoName
  videoName.forEach((event) => {
    // if event innerText includes searchBarValue then remove none class from parentElement of event
    // else add none class to parentElement of event
    event.innerText.includes(value)
      ? event.parentElement.classList.remove("none")
      : event.parentElement.classList.add("none");
  });
};
// add input event on search bar
searchBar.addEventListener("input", searchVideo);
// add click event on search button
searchBtn.addEventListener("click", searchVideo);

// add scroll event on mainContainer
mainContainer.addEventListener("scroll", async () => {
  // get offHeight (height of element, including vertical padding and borders) of mainContainer
  // get scrollHeight (height of element including padding, but excluding borders, scrollbars and margins) of mainContainer
  // get scrollTop (number of pixels than an element content is scrolled vertically) of mainContainer
  // get all properties from mainContainer by using object destructing
  const { offsetHeight, scrollHeight, scrollTop } = mainContainer;
  // get scrollTopMax with minus 50 pixels from mainContainer
  const scrollTopMax = mainContainer.scrollTopMax - 50;
  // add scrollTop with scrollHeight
  const scrolled = scrollTop + offsetHeight;
  // if APP.hitted is true and scrollTop is greater than or equals to scrollTopMax then this will fire
  if (APP.hitted && scrollTop >= scrollTopMax) {
    // scroll vertically mainContainer to scrollTopMax
    mainContainer.scrollTo(0, scrollTopMax);
  } //else if scrolled greater than or equals to scrollHeight and App.skipIndex equals to true(not undefined or null) then this will fire
  else if (scrolled >= scrollHeight && APP.skipIndex) {
    // getThumbnail function will be call with APP.skipIndex
    getThumbnail(APP.skipIndex);
  }
});
