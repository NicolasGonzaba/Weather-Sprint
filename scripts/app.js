
const currentTemp = document.getElementById("currentTemp")
const searchInput = document.getElementById("searchInput")
const clouds=document.getElementById("clouds")
const headerIcon=document.getElementById("headerIcon")
let city
let lowTemp1 = 10000000
let highTemp1 = -10000000
let lowTemp2 = 10000000
let highTemp2 = -10000000
let lowTemp3 = 10000000
let highTemp3 = -10000000
let lowTemp4 = 10000000
let highTemp4 = -10000000
let lowTemp5 = 10000000
let highTemp5 = -10000000

let latitude
let longitude = 0.1
let longTime
let timezone = -480

// Geolocation script (DELETE LATER)-----------------------------
const output = document.getElementById("output");
const placeholder = document.getElementById("placeholder");


function geoData() {
    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
        output.textContent = "Geolocation is not supported by your browser.";
        return;
    }


    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            

            longTime = longitude
            if (-120 > longTime) {
                if (longTime > -125) {
                    longTime = -119
                }

            }
            timezone = (Math.floor(longTime / 15)) * 60
            console.log(timezone)
            fetchAPI()
            fetchForecast()
            displayFavs()

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

};

function startTime() {
    const today = new Date();
    let timezoneOffset = today.getTimezoneOffset();
    let hourMinute = {
        hour: 'numeric',
        minute: 'numeric',
    };
    let adjustedTime = new Date(today.getTime() + (timezone + timezoneOffset) * 60 * 1000);
    let DateTime = adjustedTime.toLocaleString('en-US', hourMinute);
    document.getElementById('clock').innerHTML = DateTime

    const t = setTimeout(startTime, 500);
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
            currentTemp.innerText = data.main.temp + "°F";
            console.log(data.main.humidity);
            humidity.innerText = "Humidity: " + data.main.humidity + "%";
            console.log(data.main.pressure);
            pressure.innerText = "Pressure: " + data.main.pressure + "hPa";
            console.log(data.wind.speed);
            windSpeed.innerText = "Wind Speed: " + data.wind.speed + "mph";
            console.log(data.main.temp_max);
            highTemp.innerText = "Daily high: " + data.main.temp_max + "°F";
            console.log(data.main.temp_min);
            lowTemp.innerText = "Daily low: " + data.main.temp_min + "°F";
            currentCity.innerText = data.name + ", " + data.sys.country;
            console.log(data.clouds.all)
            clouds.innerText="Cloudiness: "+ data.clouds.all+"%" ;

            
            if (!data.snow) {
                if(!data.rain){
                    percipitaion.innerText = "No rain or snow"
                }else{
                    console.log(data.rain)
                percipitaion.innerText = "Rain: "+data.rain["1h"]+"mm/h"
                }
            } else {
                console.log(data.snow)
                percipitaion.innerText = "Snow: "+data.snow["1h"]+"mm/h"
            }

            if(data.weather[0].description==="overcast clouds"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/overcastClouds.png" width="310px" alt="overcastClouds"></img>`
            }else if(data.weather[0].description==="scattered clouds"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/scatteredClouds.png" width="310px" alt="scattered clouds"></img>`
            }else if(data.weather[0].description==="light rain"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/moderateRain.png" width="310px" alt="moderate rain"></img>`
            }else if(data.weather[0].description==="moderate rain"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/moderateRain.png" width="310px" alt="moderate rain"></img>`
            }else if(data.weather[0].description==="heavy intensity rain"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/moderateRain.png" width="310px" alt="moderate rain"></img>`
            }else if(data.weather[0].description==="snow"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/rainAndSnow.png" width="310px" alt="snow"></img>`
            }
            else if(data.weather[0].description==="rain and snow"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/rainAndSnow.png" width="310px" alt="snow"></img>`
            }else if(data.weather[0].description==="light snow"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/rainAndSnow.png" width="310px" alt="snow"></img>`
            }else if(data.weather[0].description==="mist"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/mist.png" width="310px" alt="mist"></img>`
            }
            else if(data.weather[0].description==="misty"){
                console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/mist.png" width="310px" alt="mist"></img>`
            }
            else {
               console.log(data.weather[0].description) 
               headerIcon.innerHTML=`<img src="images/clear skies.png" width="310px" alt="clear skies"></img>`
            }
            
            

        })


}
// --------------------------Date-------------------
const currentDate = new Date()
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const dayName = { weekday: 'long' };
const dayShort = { weekday: 'short' }
const forecast1 = new Date();
const forecast2 = new Date();
const forecast3 = new Date();
const forecast4 = new Date();
const forecast5 = new Date();

console.log(currentDate.toLocaleDateString('en-US', dateOptions));
currentDay.innerText = currentDate.toLocaleDateString('en-US', dateOptions)
console.log(currentDate.toLocaleDateString('en-US', dayName));
weekDay.innerText = currentDate.toLocaleDateString('en-US', dayName) + " (Today)"

forecast1.setDate(currentDate.getDate() + 1)
forecastDate1.innerText = forecast1.toLocaleDateString('en-US', dayShort)
forecast1.setDate(currentDate.getDate() + 2)
forecastDate2.innerText = forecast1.toLocaleDateString('en-US', dayShort)
forecast1.setDate(currentDate.getDate() + 3)
forecastDate3.innerText = forecast1.toLocaleDateString('en-US', dayShort)
forecast1.setDate(currentDate.getDate() + 4)
forecastDate4.innerText = forecast1.toLocaleDateString('en-US', dayShort)
forecast1.setDate(currentDate.getDate() + 5)
forecastDate5.innerText = forecast1.toLocaleDateString('en-US', dayShort)
// ------------------------END of Date----------------

// -----------------City Search----------------
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        city = searchInput.value;
        findLocation()
        // searchInput.value = ""
    }
})

//---------------END of City Search------------------


function findLocation() {
    city = searchInput.value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`) // Replace with your API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('No API fond');

            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            latitude = data[0].lat
            longitude = data[0].lon

            longTime = longitude
            if (-120 > longTime) {
                if (longTime > -125) {
                    longTime = -119
                }

            }
            timezone = (Math.floor(longTime / 15)) * 60
            console.log(timezone)

            fetchAPI()
            fetchForecast()
            searchInput.value = ""
        })



}

function fetchForecast() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No API fond');

            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            for (let i = 0; i < 8; i++) {
                if (lowTemp1 > data.list[i].main.temp_min) {
                    lowTemp1 = data.list[i].main.temp_min
                }
                if (highTemp1 < data.list[i].main.temp_max) {
                    highTemp1 = data.list[i].main.temp_max
                }

            }
            highTempFore1.innerText = highTemp1 + "°F"
            lowTempFore1.innerText = lowTemp1 + "°F"
            for (let i = 8; i < 16; i++) {
                if (lowTemp2 > data.list[i].main.temp_min) {
                    lowTemp2 = data.list[i].main.temp_min
                }
                if (highTemp2 < data.list[i].main.temp_max) {
                    highTemp2 = data.list[i].main.temp_max
                }

            }
            highTempFore2.innerText = highTemp2 + "°F"
            lowTempFore2.innerText = lowTemp2 + "°F"

            for (let i = 16; i < 24; i++) {
                if (lowTemp3 > data.list[i].main.temp_min) {
                    lowTemp3 = data.list[i].main.temp_min
                }
                if (highTemp3 < data.list[i].main.temp_max) {
                    highTemp3 = data.list[i].main.temp_max
                }

            }
            highTempFore3.innerText = highTemp3 + "°F"
            lowTempFore3.innerText = lowTemp3 + "°F"

            for (let i = 24; i < 32; i++) {
                if (lowTemp4 > data.list[i].main.temp_min) {
                    lowTemp4 = data.list[i].main.temp_min
                }
                if (highTemp4 < data.list[i].main.temp_max) {
                    highTemp4 = data.list[i].main.temp_max
                }

            }
            highTempFore4.innerText = highTemp4 + "°F"
            lowTempFore4.innerText = lowTemp4 + "°F"

            for (let i = 32; i < 40; i++) {
                if (lowTemp5 > data.list[i].main.temp_min) {
                    lowTemp5 = data.list[i].main.temp_min
                }
                if (highTemp5 < data.list[i].main.temp_max) {
                    highTemp5 = data.list[i].main.temp_max
                }

            }
            highTempFore5.innerText = highTemp5 + "°F"
            lowTempFore5.innerText = lowTemp5 + "°F"


            forecastHumidity1.innerText = data.list[4].main.humidity + "%"
            forecastHumidity2.innerText = data.list[12].main.humidity + "%"
            forecastHumidity3.innerText = data.list[20].main.humidity + "%"
            forecastHumidity4.innerText = data.list[28].main.humidity + "%"
            forecastHumidity5.innerText = data.list[36].main.humidity + "%"

            if(data.list[4].weather[0].description==="overcast clouds"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/overcastClouds.png" width="60px" alt="overcastClouds"></img>`
            }else if(data.list[4].weather[0].description==="scattered clouds"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/scatteredClouds.png" width="60px" alt="scattered clouds"></img>`
            }else if(data.list[4].weather[0].description==="light rain"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[4].weather[0].description==="moderate rain"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[4].weather[0].description==="heavy intensity rain"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[4].weather[0].description==="snow"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }
            else if(data.list[4].weather[0].description==="rain and snow"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[4].weather[0].description==="light snow"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[4].weather[0].description==="mist"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else if(data.list[4].weather[0].description==="misty"){
                console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else {
               console.log(data.list[4].weather[0].description) 
               forecastIcon1.innerHTML=`<img src="images/clear skies.png" width="60px" alt="clear skies"></img>`
            }

            if(data.list[12].weather[0].description==="overcast clouds"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/overcastClouds.png" width="60px" alt="overcastClouds"></img>`
            }else if(data.list[12].weather[0].description==="scattered clouds"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/scatteredClouds.png" width="60px" alt="scattered clouds"></img>`
            }else if(data.list[12].weather[0].description==="light rain"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[12].weather[0].description==="moderate rain"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[12].weather[0].description==="heavy intensity rain"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[12].weather[0].description==="snow"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }
            else if(data.list[12].weather[0].description==="rain and snow"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[12].weather[0].description==="light snow"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[12].weather[0].description==="mist"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else if(data.list[12].weather[0].description==="misty"){
                console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else {
               console.log(data.list[12].weather[0].description) 
               forecastIcon2.innerHTML=`<img src="images/clear skies.png" width="60px" alt="clear skies"></img>`
            }

            if(data.list[20].weather[0].description==="overcast clouds"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/overcastClouds.png" width="60px" alt="overcastClouds"></img>`
            }else if(data.list[20].weather[0].description==="scattered clouds"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/scatteredClouds.png" width="60px" alt="scattered clouds"></img>`
            }else if(data.list[20].weather[0].description==="light rain"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[20].weather[0].description==="moderate rain"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[20].weather[0].description==="heavy intensity rain"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[20].weather[0].description==="snow"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }
            else if(data.list[20].weather[0].description==="rain and snow"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[20].weather[0].description==="light snow"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[20].weather[0].description==="mist"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else if(data.list[20].weather[0].description==="misty"){
                console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else {
               console.log(data.list[20].weather[0].description) 
               forecastIcon3.innerHTML=`<img src="images/clear skies.png" width="60px" alt="clear skies"></img>`
            }

            if(data.list[28].weather[0].description==="overcast clouds"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/overcastClouds.png" width="60px" alt="overcastClouds"></img>`
            }else if(data.list[28].weather[0].description==="scattered clouds"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/scatteredClouds.png" width="60px" alt="scattered clouds"></img>`
            }else if(data.list[28].weather[0].description==="light rain"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[28].weather[0].description==="moderate rain"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[28].weather[0].description==="heavy intensity rain"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[28].weather[0].description==="snow"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }
            else if(data.list[28].weather[0].description==="rain and snow"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[28].weather[0].description==="light snow"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[28].weather[0].description==="mist"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else if(data.list[28].weather[0].description==="misty"){
                console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else {
               console.log(data.list[28].weather[0].description) 
               forecastIcon4.innerHTML=`<img src="images/clear skies.png" width="60px" alt="clear skies"></img>`
            }
        
            if(data.list[36].weather[0].description==="overcast clouds"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/overcastClouds.png" width="60px" alt="overcastClouds"></img>`
            }else if(data.list[36].weather[0].description==="scattered clouds"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/scatteredClouds.png" width="60px" alt="scattered clouds"></img>`
            }else if(data.list[36].weather[0].description==="light rain"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[36].weather[0].description==="moderate rain"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[36].weather[0].description==="heavy intensity rain"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/moderateRain.png" width="60px" alt="moderate rain"></img>`
            }else if(data.list[36].weather[0].description==="snow"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }
            else if(data.list[36].weather[0].description==="rain and snow"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[36].weather[0].description==="light snow"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/rainAndSnow.png" width="60px" alt="snow"></img>`
            }else if(data.list[36].weather[0].description==="mist"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else if(data.list[36].weather[0].description==="misty"){
                console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/mist.png" width="60px" alt="mist"></img>`
            }
            else {
               console.log(data.list[36].weather[0].description) 
               forecastIcon5.innerHTML=`<img src="images/clear skies.png" width="60px" alt="clear skies"></img>`
            }
        })
}




//-----------Local storage-------------------------------------------------------
const addToStorageBtn = document.getElementById("addToStorageBtn")
const getFromStorageBtn = document.getElementById("getFromStorageBtn")
const storedValue = document.getElementById("storedValue")
const favBtn = document.getElementById("favBtn")




favBtn.addEventListener('click', () => {
    let nameInput = currentCity.innerText
    saveToStorage(nameInput)
    displayFavs()
})




const displayFavs = () => {
    let favoriteList = getLocalStorage()
    storedValue.innerHTML = ""
    console.log(favoriteList)

    favoriteList.forEach(city => {
        console.log(city)


        let p = document.createElement('p')
        p.className = "m-2 bg-grey"

        p.textContent = city


        const deleteBtn = document.createElement('button')
        deleteBtn.type = 'button'
        deleteBtn.className = 'btn btn-danger mx-2'
        deleteBtn.textContent = "Delete from Favs"

        deleteBtn.addEventListener('click', () => {
            removeFromStorage(city)
            p.remove() //remove the Paragraph tag fromn the DOM
        })
        p.appendChild(deleteBtn)

        const goBtn = document.createElement('button')
        goBtn.type = 'button'
        goBtn.className = 'btn btn-warning mx-2'
        goBtn.textContent = "Go to City"

        goBtn.addEventListener('click', () => {
            searchInput.value = city
            findLocation()
        })
        p.appendChild(goBtn)


        storedValue.appendChild(p)
    })
}



const saveToStorage = (city) => {
    //creating an array of value to store into local storage
    let cityArr = getLocalStorage();


    //add a new name into our array
    if (!cityArr.includes(city)) {
        cityArr.push(city);
    }

    localStorage.setItem('Cities', JSON.stringify(cityArr))

}

//---------------------local Storage js-------------------
//Retriving data from our local storage

const getLocalStorage = () => {
    //the data we're is an array

    let value = localStorage.getItem('Cities')

    //we check if null because we will be using a forEach and if we don't return the array our code will break
    if (value === null) {
        return [];
    }
    //JSON.parse coverts the string back into an array (or Original Form)
    return JSON.parse(value)
}


//removing data from our local srorage *without the removeItem method

const removeFromStorage = (city) => {
    //name=Jesus
    // nameIndex=1

    let cityArr = getLocalStorage()

    //find the index of the name in local storage
    let cityIndex = cityArr.indexOf(city)

    cityArr.splice(cityIndex, 1)

    localStorage.setItem('Cities', JSON.stringify(cityArr))
}