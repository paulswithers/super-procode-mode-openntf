const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  let html;
  html = `
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
  <h1>Axios Example</h1>
  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Status</th>
    </tr>`;
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://petstore.swagger.io/v2/pet/findByStatus?status=available",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await axios.request(config);
    response.data.forEach((pet) => {
      html += `<tr><td>${pet.id}</td><td>${pet.name}</td><td>${pet.status}</td></tr>`;
    });
    html += "</table>";
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data");
  }
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});