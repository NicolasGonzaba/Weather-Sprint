
const currentTemp = document.getElementById("currentTemp")

// Geolocation script (DELETE LATER)-----------------------------
const button = document.getElementById("getLocationBtn");
const output = document.getElementById("output");
const placeholder = document.getElementById("placeholder");
let latitude
let longitude
let time=" AM"

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

            fetchAPI()

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


// Clock----------
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();


    // Add a leading zero to numbers less than 10 (e.g., 01, 05)
    m = checkTime(m);
    h = amPM(h)

    // Update the content of the 'clock' element
    document.getElementById('clock').innerHTML = h + ":" + m + time;

    // Call the function again after 500 milliseconds (half a second)
    const t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function amPM(i){
    if (i>12){
        i=i-12
        time=" PM"
        return i
    }
    else if(i=0){
        i=12
        return i
    }
}
//END of clock------------------------------------

function fetchAPI() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`) // Replace with your API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('No API fond');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.main.temp);
        currentTemp.innerText=data.main.temp + "°F";
        console.log(data.main.humidity);
        humidity.innerText="Humidity: "+data.main.humidity+ "%";
        console.log(data.main.pressure);
        pressure.innerText="Pressure: "+data.main.pressure+ "hPa";

        })
        

}



