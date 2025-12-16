
// Geolocation script (DELETE LATER)-----------------------------
const button = document.getElementById("getLocationBtn");
const output = document.getElementById("output");
const placeholder = document.getElementById("placeholder");
let latitude
let longitude

button.addEventListener("click", () => {
    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
        output.textContent = "Geolocation is not supported by your browser.";
        return;
    }

    output.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            output.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
            placeholder.innerText = "We got your location, check the console log to see an API.call for your weather"

            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2b57bc1f521b636a4b9bc646449dbdf8`) // Replace with your API endpoint
                .then(response => {
                    if (!response.ok) {
                        throw new Error('No API fond');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })

        },

        // Error callback
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    output.textContent = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    output.textContent = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    output.textContent = "The request to get user location timed out.";
                    break;
                default:
                    output.textContent = "An unknown error occurred.";
            }
        }
    );



});
// END of geolocation script----------------------------------------
