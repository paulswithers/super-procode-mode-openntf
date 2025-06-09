/**
 * (C) 2024, HCL, Apache-2.0 License
 * handle counter status upqdates
 */

import { createSlice } from '@reduxjs/toolkit';
import { publish } from '../events';

const initialState = {
  ratings: {
    rating1: {
      id: 'rating1',
      stars: 5,
      score: 3,
      size: '24px',
      title: 'Food'
    }
  }
};

const notify = (id, score, stars) => {
  publish('demoRatingChange', { id: id, score: score, max: stars });
};

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    addRating: (state, action) => {
      if (state.ratings[action.payload.id]) {
        console.error('Rating already exists', action.payload);
      } else {
        state.ratings[action.payload.id] = action.payload;
        if (action.payload.score > action.payload.stars) {
          state.ratings[action.payload.id].score = action.payload.stars;
        }
      }
    },
    updateScore: (state, action) => {
      const toUpdate = action.payload;
      if (Array.isArray(toUpdate)) {
        toUpdate.forEach((rating) => {
          if (state.ratings[rating.id]) {
            const proxyState = state.ratings[rating.id];
            proxyState.score = Math.min(rating.score, proxyState.stars);
            notify(proxyState.id, proxyState.score, proxyState.stars);
          } else {
            console.error('updateScore not found', rating.id);
          }
        });
      } else if (state.ratings[toUpdate?.id]) {
        const proxyState = state.ratings[toUpdate.id];
        proxyState.score = Math.min(toUpdate.score, proxyState.stars);
        notify(proxyState.id, proxyState.score, proxyState.stars);
      } else {
        console.error('Invalid updateScore payload', action.payload);
      }
    },
    updateStars: (state, action) => {
      const toUpdate = action.payload;
      if (Array.isArray(toUpdate)) {
        toUpdate.forEach((rating) => {
          if (state.ratings[rating.id]) {
            const proxyState = state.ratings[rating.id];
            proxyState.stars = rating.stars;
            notify(proxyState.id, proxyState.score, proxyState.stars);
          } else {
            console.error('updateStars not found', rating.id);
          }
        });
      } else if (toUpdate.id) {
        if (state.ratings[toUpdate.id]) {
          state.ratings[toUpdate.id].stars = toUpdate.stars;
        } else {
          console.error('updateStars not found', toUpdate.id);
        }
      } else {
        console.error('Invalid updateStars payload', action.payload);
      }
    },
    updateSize: (state, action) => {
      const toUpdate = action.payload;
      if (Array.isArray(toUpdate)) {
        toUpdate.forEach((rating) => {
          if (state.ratings[rating.id]) {
            state.ratings[rating.id].size = rating.size;
          } else {
            console.error('updateSize not found', rating.id);
          }
        });
      } else if (toUpdate.id) {
        if (state.ratings[toUpdate.id]) {
          state.ratings[toUpdate.id].size = toUpdate.size;
        } else {
          console.error('updateSize not found', toUpdate.id);
        }
      } else {
        console.error('Invalid updateSize payload', action.payload);
      }
    },
    clearRatings: (state) => {
      state.ratings = {};
    }
  }
});

export const { addRating, updateScore, updateStars, clearRatings, updateSize } =
  ratingSlice.actions;
export default ratingSlice.reducer;
