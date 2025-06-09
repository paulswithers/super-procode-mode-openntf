function populateTable() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://petstore.swagger.io/v2/pet/findByStatus?status=available",
    headers: {
      Accept: "application/json",
    },
  };
  axios
    .request(config)
    .then((response) => {
      let table = document.querySelector("#pets");
      response.data.forEach((pet) => {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.textContent = pet.id;
        cell2.textContent = pet.name;
        cell3.textContent = pet.status;
      });
    })
    .catch((error) => console.error(error));
}

if (window.addEventListener) {
  window.addEventListener("load", populateTable());
} else {
  window.attachEvent("onload", populateTable());
}
