/**
 * (C) 2024, HCL, Apache-2.0 License
 * A simple web component to display the dialog
 */

const template = document.createElement('template');
template.innerHTML = `
          <style>
          dialog {
            width: 380px;
            padding: 20px;
            border: 2px solid darkgray;
            border-radius: 4px;
            background-color: white;
            box-shadow: 3px 3px 5px 6px #ccc;
          }
          label {
            color: darkgreen;
            margin-top: 10px;
            padding: 5px;
            display: block;
          }
         </style>
         <!-- Dialog for new ratings -->
         <dialog id="newRatingDialog">
           <form method="dialog" id="dialogForRating">
             <label for="title">Title</label>
             <input type="text" id="title" name="title" placeholder="A witty title" />
             <label for="stars">How many stars</label>
             <input type="number" id="stars" name="ratingValue" min="0" max="42" value="5"/>
             <label for="ratingvalue">Initial rating value</label>
             <input type="number" id="ratingvalue" name="ratingvalue" min="0" max="42" value="0" />
             <label for="starSize">How big (valid CSS size)</label>
             <input type="text" id="starSize" name="starSize" value="24px" />
             <div>
             <button id="btnSave">Save</button>
             <button id="btnCancel">Cancel</button>
           </div>
          </form>
        </dialog>
`;
export default class DemoNewRating extends HTMLElement {
  /**
   * Construct & render Render the component to be visible in the DOM
   */
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'closed' });
    let clone = template.content.cloneNode(true);
    this.root.append(clone);
    this.connected = false;
    this.root.getElementById('btnSave').addEventListener('click', (event) => {
      event.preventDefault();
      this.sendNewRating();
    });
  }

  /** Define the attributes to observe */
  static get observedAttributes() {
    return ['active'];
  }

  get active() {
    return this.getAttribute('active') === 'true';
  }

  set active(value) {
    this.setAttribute('active', value === true ? 'true' : 'false');
  }

  /**
   * called when the element is inserted into the DOM
   */
  connectedCallback() {
    console.log('new rating connected');
    this.connected = true;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    if (name === 'active' && newValue === 'true' && this.connected) {
      this.root.getElementById('newRatingDialog').showModal();
    }
  }

  sendNewRating() {
    // Collect values to use
    const form = this.root.getElementById('dialogForRating');
    const data = form.elements;
    const eventDetails = {
      score: data.ratingvalue.value,
      size: data.starSize.value,
      stars: data.stars.value,
      title: data.title.value || 'undefined'
    };

    const event = new CustomEvent('newRating', {
      bubbles: true,
      detail: eventDetails
    });
    this.dispatchEvent(event);

    // Close the dialog
    this.active = false;
    const dialog = this.root.getElementById('newRatingDialog');
    dialog.close();
  }
}

/**
 * Make the class available as a custom element
 */
customElements.define('demo-new-rating', DemoNewRating);
