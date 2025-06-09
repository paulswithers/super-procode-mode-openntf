# Fetch

## <a target="_blank" href="http://localhost:3002/">Demo</a>

(localhost link)

---

## Fetching chunked responses

```js
fetch(dataUrl)
  .then((response) => response.body)
  .then((body) =>
    body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(splitStream())
      .pipeThrough(parseJSON())
      .pipeTo(jsonToTableRow(table))
  )
  .catch((error) => console.error('Error:', error));
```
