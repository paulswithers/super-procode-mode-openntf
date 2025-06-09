/**
 * (C) 2024, HCL, Apache-2.0 License
 * A simple web component to display a top message bar
 */

const template = document.createElement('template');
template.innerHTML = `
          <style>
             .message {
              position: fixed;
              left: 0px;
              top: 0;
              width: 100%;
              text-align: center;
              padding: 20px;
              font-size: 18px;
              font-weight: 800;
              color: white;
              background-color: red;
              border-radius: 4px;
            }
         </style>
            <div id="message" class="message"></div>
`;
export default class DemoMessage extends HTMLElement {
  /**
   * Construct & render Render the component to be visible in the DOM
   */
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'closed' });
    let clone = template.content.cloneNode(true);
    this.root.append(clone);
    this.connected = false;
  }

  /** Define the attributes to observe */
  static get observedAttributes() {
    return ['msg'];
  }

  get msg() {
    return this.getAttribute('msg');
  }

  set msg(value) {
    this.setAttribute('msg', value);
  }

  /**
   * called when the element is inserted into the DOM
   */
  connectedCallback() {
    console.log('message connected');
    this.render();
    this.connected = true;
  }

  render() {
    console.log(`Message value ${this.msg}`);
    const trueMessage = this.msg ? this.msg : 'All good, no news';
    this.root.getElementById('message').innerText = trueMessage;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    if (this.connected) {
      this.render();
    }
  }
}

/**
 * Make the class available as a custom element
 */
customElements.define('demo-message', DemoMessage);
