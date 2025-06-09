import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';

const initialRating = {
  id: 'rating1',
  stars: 5,
  score: 3,
  size: '24px',
  title: 'Food'
};

export const useRatingStore = create()(
  subscribeWithSelector(
    immer((set) => ({
      ratings: {
        [initialRating.id]: initialRating
      },

      removeAllRatings: () =>
        set((state) => {
          state.ratings = {};
        }),
      newRating: (payload) =>
        set((state) => {
          if (state.ratings[payload.id]) {
            console.error('Rating already exists', payload);
          } else {
            state.ratings[payload.id] = payload;
            if (payload.score > payload.stars) {
              state.ratings[payload.id].score = payload.stars;
            }
          }
        }),

      updateScore: (payload) =>
        set((state) => {
          const toUpdate = payload;
          if (Array.isArray(toUpdate)) {
            toUpdate.forEach((rating) => {
              if (state.ratings[rating.id]) {
                const proxyState = state.ratings[rating.id];
                proxyState.score = Math.min(rating.score, proxyState.stars);
              } else {
                console.error('updateScore not found', rating.id);
              }
            });
          } else if (state.ratings[toUpdate?.id]) {
            const proxyState = state.ratings[toUpdate.id];
            proxyState.score = Math.min(toUpdate.score, proxyState.stars);
          } else {
            console.error('Invalid updateScore payload', payload);
          }
        }),
      updateStars: (payload) =>
        set((state) => {
          const toUpdate = payload;
          if (Array.isArray(toUpdate)) {
            toUpdate.forEach((rating) => {
              if (state.ratings[rating.id]) {
                const proxyState = state.ratings[rating.id];
                proxyState.stars = rating.stars;
              } else {
                console.error('updateStars not found', rating.id);
              }
            });
          } else if (state.ratings[toUpdate?.id]) {
            const proxyState = state.ratings[toUpdate.id];
            proxyState.stars = toUpdate.stars;
          } else {
            console.error('Invalid updateStars payload', payload);
          }
        }),
      updateSize: (payload) =>
        set((state) => {
          const toUpdate = payload;
          if (Array.isArray(toUpdate)) {
            toUpdate.forEach((rating) => {
              if (state.ratings[rating.id]) {
                state.ratings[rating.id].size = rating.size;
              } else {
                console.error('updateSize not found', rating.id);
              }
            });
          } else if (state.ratings[toUpdate?.id]) {
            state.ratings[toUpdate.id].size = toUpdate.size;
          } else {
            console.error('Invalid updateSize payload', payload);
          }
        })
    }))
  )
);
