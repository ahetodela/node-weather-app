console.log("loaded");

const weatherForm = document.querySelector("form");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const loc = document.getElementById("searchLocation");
    message1.textContent = "Loading...";
    message2.textContent = "";

    fetch(`http://localhost:3000/weather?address=${loc.value}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    message2.textContent = data.error;
                } else {
                    message1.textContent = data.location;
                    message2.textContent = data.forecast;

                    loc.value = "";
                }
            });
        }
    );
});