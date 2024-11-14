// create Home_Button class that inherit from HTMLElement class
class Home_Button extends HTMLElement {
  // create constructor function to get all parameter
  constructor() {
    // call super function to call parent class constructor
    super();
    // attach shadowroot to this (this means reference to this object)
    this._dom = this.attachShadow({ mode: "open" });
    // call this.createButton
    this.createButton();
  }

  // createButton function to create simple button
  createButton() {
    // add contents class to this
    this.classList.add("contents");
    // create style element
    const style = document.createElement("style");
    // set style textContent to backtick string
    style.textContent = `
      .sentToHome{
        outline: none;
        margin: 1%;
        padding: 1%;
        border-radius: 5px;
        border: 1px solid black;
      }

      .homeLink{
        text-decoration: none;
        color: green;
      }
    `;
    // create a(anchor tag) element
    const anchor = document.createElement("a");
    // set anchor innerText to << Home
    anchor.innerText = "<< Home";
    // set anchor href attribute to "/"
    anchor.setAttribute("href", "/");
    // set anchor class attribute to homeLink
    anchor.setAttribute("class", "homeLink");
    // create button element
    const button = document.createElement("button");
    // set button class attribute to sentToHome
    button.setAttribute("class", "sentToHome");
    // append anchor into button
    button.appendChild(anchor);
    // append style and button into this._dom
    this._dom.append(style, button);
  }
}
// create custom element with simple-btn(name) and Home_Button class by using customElements.define
customElements.define("simple-btn", Home_Button);
// create simple-btn tag with Home_Button class by using new keyword
const sentToHomeBtn = new Home_Button();
// append sentToHomeBtn into document.body
document.body.appendChild(sentToHomeBtn);
