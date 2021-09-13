const weatherForm = document.querySelector("form");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = document.getElementById("searchLocation");
    message1.textContent = "Loading...";
    message2.textContent = "";

    fetch(`/weather?address=${location.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message2.textContent = data.error;
                message1.textContent = "";
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;

                location.value = "";
            }
        });
    });
});
