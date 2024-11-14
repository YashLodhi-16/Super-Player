// create alert class that inherit from HTMLElement class
class Alert extends HTMLElement {
  // get type and status attribute status
  static get observedAttributes() {
    // return type and status attribute
    return ["type", "status"];
  }

  // create constructor function to get all parameter
  constructor() {
    // call super function to call parent class constructor
    super();
    // attach shadow root to this(this means reference to this object)
    this._dom = this.attachShadow({ mode: "open" });
    // this._timer to contain setTimeout
    this._timer = null;
  }

  // create attributeChangedCallback function to get value of updated attribute value
  attributeChangedCallback(name, oldValue, newValue) {
    // get type and status attribute of this
    const type = this.getAttribute("type");
    const status = this.getAttribute("status");
    // if type and status exits then call this.createAlert function with type and status else nothing will happen
    type && status ? this.createAlert(type, status) : null;
  }

  // function to create alert
  createAlert(type, status) {
    // get color, spanColor and backgroundColor by using object destructing and ternery operators
    // if type equals to success then return green color shades else return red color shades
    const { color, spanColor, backgroundColor } =
      type === "success"
        ? {
            color: "green",
            spanColor: "darkgreen",
            backgroundColor: "lightgreen",
          }
        : {
            color: "red",
            spanColor: "white",
            backgroundColor: "lightcoral",
          };
    // get first character of type and convert it to uppercase
    const fChar = type.charAt(0).toUpperCase();
    // get substring from type by remove first character
    const lWord = type.substring(1);
    // join fChar with lWord
    const finalWord = fChar + lWord;
    // create style element by using document.createElement
    const style = document.createElement("style");
    // set style textContent to backtick string
    style.textContent = `
      .${type}AlertContainer{
        padding: 2% 4%;
        border: 1px solid ${color};
        background-color: ${backgroundColor};
        border-radius: 5px;
        display: flex;
        margin: 2% 0px;
      }
      .color-${spanColor}{
        color: ${spanColor}
      }
      .${type}AlertRemover{
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
  `;
    // create div element
    const div = document.createElement("div");
    // set div id attribute to type(variable)AlertContainer
    div.setAttribute("id", `${type}AlertContainer`);
    // set div class attribute to backtick string
    div.setAttribute("class", `${type}AlertContainer`);
    // create template with type, spanColor, finalWord and status by using backtick
    const template = `<p id="${type}AlertPara" class="${type}AlertPara">
                      <span id="${type}AlertSpan" class="${type}AlertSpan color-${spanColor}">${finalWord}:</span>
                      we have ${status} to complete your request.
                      </p>
                      <button id="${type}AlertRemover" class="${type}AlertRemover">&times;</button>`;
    // set div innerHTML to template
    div.innerHTML = template;
    // append link and div into this._dom
    this._dom.append(style, div);
    // call this.removeAlert function
    this.removeAlert(type);
  }

  // function to hide alert
  removeAlert(type) {
    // get button with type(variable)AlertRemover by using this._dom.querySelector
    const btn = this._dom.querySelector(`#${type}AlertRemover`);
    // add click event on btn and add none class to this
    btn.addEventListener("click", () => this.classList.add("none"));
  }

  // function to show or hide alert
  addTimer(remove) {
    // if remove not equals to true then this will fire
    if (!remove) {
      // remove none class from this
      this.classList.remove("none");
      // clear this._timer setTimeout
      clearTimeout(this._timer);
      // set this._timer to setTimeout with 5 seconds timeout and add none class to this
      this._timer = setTimeout(() => this.classList.add("none"), 5000);
    } // else this will fire
    else this.classList.add("none");
  }
}
// create custom element with simple-alert(name) and Alert class by using customElements.define
customElements.define("simple-alert", Alert);

// arrow function to get alert by using type
const getCustomElement = (type) => {
  // create simple-alert element
  const alert = document.createElement("simple-alert");
  // if type equals to success then return sucessfully else return unsucessfully by using ternery operator
  const status = type === "success" ? "sucessfully" : "unsucessfully";
  // set alert type, id and status attribute to type and status
  alert.setAttribute("type", type);
  alert.setAttribute("id", type);
  alert.setAttribute("status", status);
  // add none class to alert
  alert.classList.add("none");
  // return alert
  return alert;
};
// get success and failure alert with given argument by using getCustomElement
const success = getCustomElement("success"),
  failure = getCustomElement("failure");
// prepend success and failure to document.body
document.body.prepend(success, failure);
