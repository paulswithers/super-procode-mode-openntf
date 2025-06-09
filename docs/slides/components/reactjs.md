# ReactJS

<iframe width="100%" height="600" src="https://react.dev/"></iframe>

---

## The nature of reactJS applications<!-- .element: class="r-fit-text" -->

- HTML for scaffolding only
- reactJS handles complete UI
- state is managed in JavaScript
- unidirectional flow top down
- components are functions
- automatic update when variables change
- JSX for UI (= HTML produced by JS)

---

## Start

```bash
npx create-react-app react-component-demo
cd react-component-demo
# DO this now or learn the hard way
npm install -s @reduxjs/toolkit react-redux
npm start
```

Pro tip: [Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

---

## Package

```json
{
  "name": "react-component-demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.2",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-redux": "^9.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

## Prepare state management

```js
import { configureStore } from '@reduxjs/toolkit';
import ratingReducer from './components/ratingSlice';

export const store = configureStore({
  reducer: {
    ratings: ratingReducer
  }
});
```

---

## Starter code

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

## Initial app

```js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```
