/**
 * (C) 2024, HCL, Apache-2.0 License
 * Helper functions for custom events
 */

function subscribe(eventName, callback) {
  document.addEventListener(eventName, callback);
}

function unsubscribe(eventName, callback) {
  document.removeEventListener(eventName, callback);
}

function publish(eventName, detail) {
  const event = new CustomEvent(eventName, { bubbles: true, detail: detail });
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
