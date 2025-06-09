/*
 * (C) 2024, HCL, Apache-2.0 License
 */

/*
 * Clear out all content of the main tag
 */
const clearResults = () => {
  const main = document.querySelector('main');
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  message('Ratings cleared');
};

/*
 * Display a message on top of the page
 */
const message = (msg) => {
  document.getElementById('message').msg = msg;
};

/**
 * Add a new message to the list
 * @param {string} msg
 */
const changeMessage = (msg) => {
  const change = document.getElementById('changes');
  const li = document.createElement('li');
  li.innerText = msg;
  change.appendChild(li);
};

/*
 * Show the moddal dialog to create a new rating with given values
 */
const showNewRatingDialogue = () => {
  const dialog = document.getElementById('newRating');
  dialog.active = true;
};

/**
 * Extract value from the form and create a new rating component
 */
const createNewRating = (event) => {
  event.preventDefault();

  // Construct the new rating
  const main = document.querySelector('main');
  const rating = document.createElement('demo-rating');
  rating.stars = event.detail.stars;
  rating.score = event.detail.score;
  rating.size = event.detail.size;
  rating.id = new Date().getTime();
  rating.appendChild(document.createTextNode(event.detail.title));
  main.appendChild(rating);
};

/**
 * Grab all ratings and show them on top of the page
 */
const showCurrenRating = () => {
  const ratings = document.querySelectorAll('demo-rating');
  let r = [];
  ratings.forEach((rating) => r.push(`${rating.score}/${rating.stars}`));
  message(`Current scores are ${r.join(', ')}`);
};

/**
 * Set all ratings to their maximum value
 */
const setCurrentRatingFull = () => {
  const ratings = document.querySelectorAll('demo-rating');
  ratings.forEach((rating) => (rating.score = rating.stars));
};

/**
 * Sey all ratings to zero
 */
const setCurrentRatingZero = () => {
  const ratings = document.querySelectorAll('demo-rating');
  ratings.forEach((rating) => (rating.score = 0));
};

/**
 * Make all ratings the same size and toggle between 24px and 36px
 */
const setCurrentRatingSize = () => {
  const ratings = document.querySelectorAll('demo-rating');
  const size = ratings[0].getAttribute('size');
  const newSize = size == '24px' ? '36px' : '24px';
  ratings.forEach((rating) => rating.setAttribute('size', newSize));
};

const addStars = () => {
  const ratings = document.querySelectorAll('demo-rating');
  ratings.forEach((rating) => {
    const actual = rating.stars + 1;
    rating.stars = actual;
  });
};

/**
 * Hook listeners to all ratings to listen for changes
 * and display them on top of the page
 */
const listenForRatingChange = () => {
  const ratings = document.querySelectorAll('demo-rating');
  ratings.forEach((rating) => {
    rating.addEventListener('change', (event) => {
      changeMessage(
        `Rating ${rating.id} changed to ${event.detail.score}/${event.detail.max}`
      );
    });
  });
};

/**
 * Hook a click event to an element
 *
 * @param {string} elementId - what element to capture the click event on
 * @param {function} - function to call when the click event is captured

 }} processFunction
 */
const captureClickEvent = (elementId, processFunction) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      processFunction();
    });
  } else {
    console.error(`Element ${elementId} not found`);
  }
};

/* Function to setup the page, hook in the Button's click event */
const setupPage = () => {
  // Wire up the buttons
  captureClickEvent('btnCreate', showNewRatingDialogue);
  captureClickEvent('btnShow', showCurrenRating);
  captureClickEvent('btnFull', setCurrentRatingFull);
  captureClickEvent('btnZero', setCurrentRatingZero);
  captureClickEvent('btnSet', setCurrentRatingSize);
  captureClickEvent('btnAddStar', addStars);
  captureClickEvent('btnListen', listenForRatingChange);
  captureClickEvent('btnClearAll', clearResults);
  document
    .getElementById('newRating')
    .addEventListener('newRating', createNewRating);

  console.log('Page loaded, ready to go');
};

/* Hook the JS into the loading event */
if (document.readyState != 'loading') {
  setupPage();
} else {
  document.addEventListener('DOMContentLoaded', setupPage);
}
