function populateTable() {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch("https://petstore.swagger.io/v2/pet/findByStatus?status=available", requestOptions)
    .then((result) => {
        let tbody = document.querySelector("#pets");
        if (result.ok) {
        data = result.json();
            data.then((pets) => {
                pets.forEach((pet) => {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${pet.id}</td><td>${pet.name}</td><td>${pet.status}</td>`;
                tbody.appendChild(row);
                });
            });
        } else {
        console.error(result.statusText);
        }
    })
    .catch((error) => console.error(error));
}

if(window.addEventListener){
    window.addEventListener('load', populateTable())
  }else{
    window.attachEvent('onload', populateTable())
  }