// create Spinner class that inherit from HTMLElement class
class Spinner extends HTMLElement {
  // get status of status attribute
  static get observedAttributes() {
    // return status attribute
    return ["status"];
  }

  // create constructor function to get all parameter
  constructor() {
    // call super function to call parent class constructor
    super();
    // attach shadow root to this( this means reference of this object)
    this.shadow = this.attachShadow({ mode: "open" });
    // call this.createSpinner
    this.createSpinner();
  }

  // create attributeChangedCallback function to get value of updated attribute
  attributeChangedCallback(name, oldValue, newValue) {
    // get this.shadow first children
    const [, element] = this.shadow.children;
    // if oldValue equals to run then remove runSpinner class from element else add runSpinner class to element
    oldValue === "run"
      ? element.classList.remove("runSpinner")
      : element.classList.add("runSpinner");
  }

  // createSpinner function to create simple loading spinner
  createSpinner() {
    // create div tag by using document.createElement
    const div = document.createElement("div");
    // set div id attribute to spinner
    div.setAttribute("id", "spinner");
    // create style element
    const style = document.createElement("style");
    // set style textContent to backtick string
    style.textContent = `
		
			#spinner{
				width: 25px;
 				height: 25px;
 				border: 3px solid gray;
 				border-radius: 50%;
 				border-top-color: white;
			}
			
			.runSpinner{
  			animation: spinner 750ms infinite ;
			}

			@keyframes spinner{
				100%{
					rotate: 360deg;
				}
			}

		`;
    // append style and div to this.shadow
    this.shadow.append(style, div);
  }
}
// create custom element with loading-spinner(name) and Spinner class by using customElements.define
customElements.define("loading-spinner", Spinner);
