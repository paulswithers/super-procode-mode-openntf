/*
 * (C) 2024, HCL, Apache-2.0 License
 */

import './App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { subscribe, unsubscribe } from './events';
import {
  updateScore,
  updateStars,
  updateSize,
  clearRatings
} from './components/ratingSlice';
import DemoRating from './components/DemoRating';
import DemoMessage from './components/DemoMessage';
import DemoNewRating from './components/DemoNewRating';

function App() {
  const ratings = useSelector((state) => state.ratingStore.ratings);
  const dispatch = useDispatch();

  const [msg, setMsg] = useState('Press a button');
  const [eventListener, setEventListener] = useState(false);

  /*
   * Clear out all content of the main tag
   */
  const clearResults = () => {
    dispatch(clearRatings());
    message('Ratings cleared');
  };

  /*
   * Display a message on top of the page
   */
  const message = (msg) => {
    setMsg(msg);
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
    const dialog = document.getElementById('newRatingDialog');
    dialog.show();
  };

  /**
   * Grab all ratings and show them on top of the page
   */
  const showCurrenRating = () => {
    let r = [];
    Object.keys(ratings).forEach((key) => {
      const rating = ratings[key];
      r.push(`${rating.score}/${rating.stars}`);
    });
    message(`Current scores are ${r.join(', ')}`);
  };

  /**
   * Set all ratings to their maximum value
   */
  const setCurrentRatingFull = () => {
    const payload = [];
    Object.keys(ratings).forEach((key) => {
      const rating = ratings[key];
      const newRating = { id: rating.id, score: rating.stars };
      payload.push(newRating);
    });
    dispatch(updateScore(payload));
  };

  /**
   * Sey all ratings to zero
   */
  const setCurrentRatingZero = () => {
    const payload = [];
    Object.keys(ratings).forEach((key) => {
      const rating = ratings[key];
      const newRating = { id: rating.id, score: 0 };
      payload.push(newRating);
    });
    dispatch(updateScore(payload));
  };

  /**
   * Make all ratings the same size and toggle between 24px and 36px
   */
  const setCurrentRatingSize = () => {
    const payload = [];
    let oldSize = null;
    Object.keys(ratings).forEach((key) => {
      const rating = ratings[key];
      oldSize = oldSize || rating.size;
      const newSize = oldSize === '24px' ? '36px' : '24px';
      const newRating = { id: rating.id, size: newSize };
      payload.push(newRating);
    });
    dispatch(updateSize(payload));
  };

  const addStars = () => {
    const payload = [];
    Object.keys(ratings).forEach((key) => {
      const rating = ratings[key];
      const actual = Number(rating.stars) + 1;
      const newRating = { id: rating.id, stars: actual };
      payload.push(newRating);
    });
    dispatch(updateStars(payload));
  };

  const incomingChange = (event) => {
    changeMessage(
      `Rating ${event.detail.id} changed to ${event.detail.score}/${event.detail.max}`
    );
  };

  /**
   * Hook listeners to all ratings to listen for changes
   * and display them on top of the page
   */
  const listenForRatingChange = () => {
    if (eventListener) {
      message('Event listener removed');
      setEventListener(false);
      unsubscribe('demoRatingChange', incomingChange);
      return;
    }
    setEventListener(true);
    message('Event listener started');
    subscribe('demoRatingChange', incomingChange);
  };

  const renderRatings = () => {
    const ratingElements = [];
    Object.keys(ratings).forEach((key) => {
      const ratingdef = ratings[key];
      ratingElements.push(<DemoRating key={ratingdef.id} id={ratingdef.id} />);
    });
    return ratingElements;
  };

  /**
   * The actual UI
   */
  return (
    <div className="App">
      <header>
        <DemoMessage id="message" msg={msg}></DemoMessage>
        <h1>React Demo Rating</h1>
        <div className="button-row">
          <button id="btnCreate" onClick={showNewRatingDialogue}>
            Create additional rating
          </button>
          <button id="btnShow" onClick={showCurrenRating}>
            Show ratings values
          </button>
          <button id="btnFull" onClick={setCurrentRatingFull}>
            Set all ratings to max
          </button>
          <button id="btnZero" onClick={setCurrentRatingZero}>
            Set all ratings to 0
          </button>
          <button id="btnSet" onClick={setCurrentRatingSize}>
            Set ratings size
          </button>
          <button id="btnAddStar" onClick={addStars}>
            Extend ratings by one star
          </button>
          <button
            id="btnListen"
            onClick={listenForRatingChange}
            className={eventListener ? 'unfixed' : ''}
          >
            Listen to ratings changes
          </button>
          <button id="btnClearAll" onClick={clearResults}>
            Clear all ratings
          </button>
        </div>
        <ul id="changes"></ul>
      </header>
      <main>{renderRatings()}</main>
      <DemoNewRating></DemoNewRating>
      <footer>
        <p>WebComponent Demo &copy; 2024 HCL, Apache-2.0 licensed</p>
      </footer>
    </div>
  );
}

export default App;
