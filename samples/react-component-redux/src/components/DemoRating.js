/**
 * (C) 2024, HCL, Apache-2.0 License
 * A simple web component to display rating stars
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateScore } from './ratingSlice';

export default function DemoRating({ id }) {
  const rating = useSelector((state) => state.ratingStore.ratings[id]);
  const dispatch = useDispatch();

  const handleStarClick = (star) => {
    console.log('handleStarClick', star);
    if (star !== rating.score) {
      const newRating = { id, score: star };
      dispatch(updateScore(newRating));
    }
  };

  const renderStars = () => {
    console.log('renderStars', rating.score);
    const starElements = [];
    for (let i = 1; i <= rating.stars; i++) {
      const isHighlighted = i <= rating.score;
      starElements.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          style={{
            fontSize: rating.size,
            color: isHighlighted ? 'gold' : 'gray'
          }}
        >
          ★
        </span>
      );
    }
    return starElements;
  };

  return (
    <div className="demorating">
      <h3>{rating.title}</h3>
      {renderStars()}
    </div>
  );
}
