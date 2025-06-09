/**
 * (C) 2024, HCL, Apache-2.0 License
 * A simple web component to display a rating
 */

const template = document.createElement('template');
template.innerHTML = `
             <style>
                .star-container {
                    display: inline-block;
                }
                .star {
                    color: gray;
                    cursor: pointer;
                    padding: 5px;
                }
                .brightstar {
                    color: gold;
                }
            </style>
            <h3>Rating for <slot>unspecified</slot></h3>
            <div id="star-container" class="star-container"></div>
`;
export default class DemoRating extends HTMLElement {
  /**
   * Construct & render Render the component to be visible in the DOM
   */
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    let clone = template.content.cloneNode(true);
    this.root.append(clone);
    this.connected = false; // Fire events only after connected
  }

  /** Define the attributes to observe */
  static get observedAttributes() {
    return ['score', 'size', 'stars'];
  }

  /* Define the properties of the component
     and keep them in sync with the attributes */
  get score() {
    const actual = Number(this.getAttribute('score') || '0');
    return Math.min(actual, this.stars);
  }

  set score(value) {
    const actual = Math.min(value, this.stars);
    this.setAttribute('score', actual);
  }

  get size() {
    return this.getAttribute('size') || '12px';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get stars() {
    return Number(this.getAttribute('stars') || '5');
  }

  set stars(value) {
    const actual = Math.max(Math.min(99, parseInt(value) || 5), 0);
    this.setAttribute('stars', actual);
  }

  /**
   * called when the element is inserted into the DOM
   */
  connectedCallback() {
    console.log('connected');
    this.render();
    this.addEventListeners();
    this.connected = true;
  }

  /**
   * Render the component to be visible in the DOM
   * Update values from component properties/attributes
   * logic to re-render on changes not included
   */
  render() {
    console.log(
      `Render ${this.stars} stars with score ${this.score} and size ${this.size}`
    );

    const starContainer = this.root.getElementById('star-container');
    while (starContainer.firstChild) {
      starContainer.removeChild(starContainer.firstChild);
    }

    for (let i = 0; i < this.stars; i++) {
      const star = document.createElement('span');
      star.textContent = '★';
      star.style.fontSize = this.size;
      star.classList.add('star');
      if (i < this.score) {
        star.classList.add('brightstar');
      }

      star.addEventListener('click', () => {
        console.log(`Clicked on star ${i}`);
        this.score = i + 1;
      });
      starContainer.appendChild(star);
    }
  }

  addEventListeners() {
    this.addEventListener('change', () => {
      console.log('change inside the demo-rating component');
    });
  }

  /**
   * Fires when an attribute listed in observedAttributes
   * was added, removed, or updated
   *
   * @param {string} name
   * @param {*} oldValue
   * @param {*} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    if (oldValue !== newValue && this.connected) {
      this[name] = newValue;
      if (name === 'score') {
        this.fireChangeEvent();
      }
      this.render();
    }
  }

  fireChangeEvent = () => {
    const eventDetails = {
      score: this.score,
      id: this.id,
      max: this.stars
    };
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: eventDetails
    });
    this.dispatchEvent(event);
  };
}

/**
 * Make the class available as a custom element
 */
customElements.define('demo-rating', DemoRating);
