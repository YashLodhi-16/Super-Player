// create Simple_Error class that inherit from HTMLSpanElement class
class Simple_Error extends HTMLSpanElement {
  // create constructor function to get all parameter
  constructor() {
    // call super function to call parent class constructor
    super();
    // attach shadowroot to this(this means reference to this object)
    this._dom = this.attachShadow({ mode: "open" });
    // this._timer to contain setTimeout
    this._timer = null;
  }
  // create connectedCallback function to append span into this._dom
  connectedCallback() {
    // create style element by using document.createElement
    const style = document.createElement("style");
    // set style textContent to backtick string
    style.textContent = `
      .error{
        color: red;
        text-decoration: underline;
        display: flex;
        margin: 3% 0px;
      }
    `;
    // create span element
    const span = document.createElement("span");
    // set this id attribute to error
    this.setAttribute("id", "error");
    // set this class attribute to none
    this.setAttribute("class", "none");
    // set span class attribute to error
    span.setAttribute("class", "error");
    // set span innerText to given string
    span.innerText = "Please Fill All The Fields Properly.";
    // append style and span element into this._dom
    this._dom.append(style, span);
  }
  // function to show or hide error
  addTimer(remove) {
    // if remove not equals to true then this will fire
    if (!remove) {
      // remove none class from this
      this.classList.remove("none");
      // clear this._timer setTimeout
      clearTimeout(this._timer);
      // set this._timer to setTimeout with 5 seconds timeout and add none class to this
      this._timer = setTimeout(() => {
        // add none class to this
        this.classList.add("none");
      }, 5000);
    } // else this will fire
    else this.classList.add("none");
  }
}
// create custom element with simple-error(name) and Simple_Error class by using customElements.define
customElements.define("simple-error", Simple_Error, { extends: "span" });
// create simple-error tag with Simple_Error class by using new keyword
const error = new Simple_Error();
// get mainSummaryContainer by using document.getElementById
const mainSummaryContainer = document.getElementById("mainSummaryContainer");
// append error into mainSummaryContainer
mainSummaryContainer.appendChild(error);
