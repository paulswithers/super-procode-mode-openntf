/**
 * (C) 2024, HCL, Apache-2.0 License
 * Shows the dialogue to add a rating
 */

import React from 'react';
import './DemoNewRating.css';
import { useRatingStore } from '../store';

export default function DemoNewRating() {
  const newRating = useRatingStore((state) => state.newRating);
  const saveRating = (event) => {
    event.preventDefault();
    const form = document.getElementById('dialogForRating');
    const data = form.elements;
    const newborn = {
      id: new Date().getTime(),
      stars: data.stars.value,
      score: data.ratingvalue.value,
      size: data.starSize.value,
      title: data.title.value || 'undefined'
    };
    newRating(newborn);
    const dialog = document.getElementById('newRatingDialog');
    dialog.close();
  };

  return (
    <dialog id="newRatingDialog">
      <form method="dialog" id="dialogForRating">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="A witty title"
        />
        <label htmlFor="stars">How many stars</label>
        <input
          type="number"
          id="stars"
          name="ratingValue"
          min="0"
          max="42"
          defaultValue="5"
        />
        <label htmlFor="ratingvalue">Initial rating value</label>
        <input
          type="number"
          id="ratingvalue"
          name="ratingvalue"
          min="0"
          max="42"
          defaultValue="0"
        />
        <label htmlFor="starSize">How big (valid CSS size)</label>
        <input type="text" id="starSize" name="starSize" defaultValue="24px" />
        <div>
          <button id="btnSaveNewRating" onClick={saveRating}>
            Save
          </button>
          <button id="btnCancel">Cancel</button>
        </div>
      </form>
    </dialog>
  );
}
