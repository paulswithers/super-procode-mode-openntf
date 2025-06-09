# Create Component

```js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateScore } from './ratingSlice';

export default function DemoRating({ id }) {
  const rating = useSelector((state) => state.ratingStore.ratings[id]);
  const dispatch = useDispatch();
  return (
    <div className="demorating">
      <h3>{rating.title}</h3>
      {renderStars()}
    </div>
  );
}
```

---

## Update state

```js
const handleStarClick = (star) => {
  console.log('handleStarClick', star);
  if (star !== rating.score) {
    const newRating = { id, score: star };
    dispatch(updateScore(newRating));
  }
};
```

---

## Add to page

```js
return (
  <div className="App">
    <header>
      <DemoMessage id="message" msg={msg}></DemoMessage>
    </header>
    <main>{renderRatings()}</main>
    <DemoNewRating></DemoNewRating>
  </div>
);
```
