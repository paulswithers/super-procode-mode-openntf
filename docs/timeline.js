/**
 * (C) 2024, HCL, Apache-2.0 License
 */

const setupPage = () => {
  fetch('timeline.json')
    .then((response) => response.json())
    .then((myData) => {
      renderFirst(myData, 'timeline');
    })
    .catch((error) => console.error('Error loading the data', error));
};

const renderFirst = (myData, elementId) => {
  const timelineDiv = document.getElementById('timeline');
  TimelinesChart()(timelineDiv)
    .maxLineHeight(60)
    .maxHeight(800)
    .zScaleLabel('My Scale Units')
    .zQualitative(true)
    .data(myData);
};

/* Hook the JS into the loading event */
if (document.readyState != 'loading') {
  setupPage();
} else {
  document.addEventListener('DOMContentLoaded', setupPage);
}
