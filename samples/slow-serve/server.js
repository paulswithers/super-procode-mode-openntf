const express = require('express');
const ReadLine = require('n-readlines');
const fs = require('fs');
const port = 3002;
const app = express();

app.use(express.static('public'));
app.get('/data', (_req, res) => {
  const lineSource = new ReadLine('./sampleData.txt');
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked'
  });
  handleOneLine(lineSource, res, false);
});

app.get('/big', (_req, res) => {
  const lineSource = new ReadLine('./sampleDataBig.txt');
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked'
  });
  handleOneLine(lineSource, res, false);
});

const handleOneLine = (lineSource, res, started) => {
  let line = lineSource.next();
  if (line) {
    if (!started) {
      res.write('[\n');
    } else {
      res.write(',\n');
    }
    res.write(line);
    setTimeout(() => {
      handleOneLine(lineSource, res, true);
    }, 100 /* 0.1 seconds delay */);
  } else {
    res.write(']\n');
    res.end();
  }
};

app.get('/fast', (_req, res) => {
  fs.readFile('./sampleData.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to fetch sampleData.txt');
    } else {
      data = data.replace(/\n/g, ',\n');
      res.json(JSON.parse(`[${data}]`));
    }
  });
});

app.get('/fastbig', (_req, res) => {
  fs.readFile('./sampleDataBig.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to fetch sampleData.txt');
    } else {
      data = data.replace(/\n/g, ',\n');
      res.json(JSON.parse(`[${data}]`));
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
