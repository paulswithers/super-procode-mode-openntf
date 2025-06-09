/* (C) 2024, HCL, Apache-2.0 License */

/* Constants for DRY */
const dataUrl = '/data';

/* Cleanup the results table */
const clearResults = () => {
  const table = document.getElementById('mainTableBody');
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
};

/* Display a message */
const message = (msg) => {
  document.getElementById('message').innerText = msg;
};

/* Chops arriving chunks along new lines,
    takes into account that a chunk might end middle of line */
const splitStream = () => {
  const splitOn = '\n';
  let buffer = '';
  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk;
      const parts = buffer.split(splitOn);
      parts.slice(0, -1).forEach((part) => controller.enqueue(part));
      buffer = parts[parts.length - 1];
    },
    flush(controller) {
      if (buffer) controller.enqueue(buffer);
    }
  });
};

/* Parses JSON if row looks like JSON (with eventual comma at end of line) */
const parseJSON = () => {
  return new TransformStream({
    transform(chunk, controller) {
      // IGONRES THE [ and ]
      if (chunk.endsWith(',')) {
        controller.enqueue(JSON.parse(chunk.slice(0, -1)));
      } else if (chunk.endsWith('}')) {
        controller.enqueue(JSON.parse(part));
      }
    }
  });
};

/* Stream Version of json to row */
const jsonToTableRow = (insertPoint) => {
  let firstPaint = true;
  return new WritableStream({
    write(json) {
      addRow(json, insertPoint);
      if (firstPaint) {
        const firstTime = new Date();
        console.log(`First chunk - ${firstTime}`);
        firstPaint = false;
      }
    },
    abort(err) {
      console.error(err);
    }
  });
};

/* Add a row to the table */
const addRow = (json, insertPoint) => {
  const row = document.createElement('tr');
  addColumn(row, json.id);
  addColumnImage(row, json.image);
  addColumn(row, json.color);
  addColumn(row, json.artist);
  addColumn(row, json.price);
  addColumn(row, json.currency);
  insertPoint.appendChild(row);
};

/* Add a column to the table */
const addColumn = (row, value) => {
  const cell = document.createElement('td');
  cell.appendChild(document.createTextNode(value));
  row.appendChild(cell);
};

/* Add a column with an image to the table */
const addColumnImage = (row, value) => {
  const cell = document.createElement('td');
  const img = document.createElement('img');
  img.src = value;
  img.width = 100;
  cell.appendChild(img);
  row.appendChild(cell);
};

/* Populate the table with the data */
const populateTable = (data) => {
  const table = document.getElementById('mainTableBody');
  data.forEach((j) => {
    addRow(j, table);
  });
};

/* Using fetch to get the data in one go*/
const clickBtnFetch = (event) => {
  event.preventDefault();
  clearResults();
  document.body.style.cursor = 'wait';
  const startTime = new Date();
  message(`Fetching data...(${startTime})`);
  fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => populateTable(data))
    .then(() => {
      const endTime = new Date();
      const duration = endTime - startTime;
      message(`Data fetched in ${new Intl.NumberFormat().format(duration)} ms`);
      document.body.style.cursor = 'default';
    })
    .catch((error) => {
      console.error('Error:', error);
      document.body.style.cursor = 'default';
    });
};
const clickBtnFetchChunk = (event) => {
  event.preventDefault();
  clearResults();
  const startTime = new Date();
  const table = document.getElementById('mainTableBody');
  message(`Fetching data (chunks)...(${startTime})`);
  fetch(dataUrl)
    .then((response) => response.body)
    .then((body) =>
      body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(splitStream())
        .pipeThrough(parseJSON())
        .pipeTo(jsonToTableRow(table))
    )
    .then(() => {
      const endTime = new Date();
      const duration = endTime - startTime;
      message(
        `Data fetched chunks in ${new Intl.NumberFormat().format(duration)} ms`
      );
    })
    .catch((error) => console.error('Error:', error));
};
const clickBtnAxios = (event) => {
  event.preventDefault();
  clearResults();
  const startTime = new Date();
  message(`Axios data...(${startTime})`);
  axios
    .get(dataUrl)
    .then((response) => response.data)
    .then((data) => populateTable(data))
    .then(() => {
      const endTime = new Date();
      const duration = endTime - startTime;
      message(`Data axios in ${new Intl.NumberFormat().format(duration)} ms`);
    })
    .catch((error) => console.error('Error:', error));
};

const clickBtnAxiosChunk = (event) => {
  event.preventDefault();
  clearResults();

  message(`Sorry Dave, I'm afraid I can't do that`);
};

/* Function to setup the page */
const setupPage = () => {
  // Wire up the buttons
  document.getElementById('btnFetch').addEventListener('click', clickBtnFetch);

  document
    .getElementById('btnFetchChunk')
    .addEventListener('click', clickBtnFetchChunk);

  document.getElementById('btnAxios').addEventListener('click', clickBtnAxios);

  document
    .getElementById('btnAxiosChunk')
    .addEventListener('click', clickBtnAxiosChunk);

  console.log('Page loaded, ready to go');
};

/* Hook the JS into the loading event */
if (document.readyState != 'loading') {
  setupPage();
} else {
  document.addEventListener('DOMContentLoaded', setupPage);
}
