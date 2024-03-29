// OpenWeather API key
var key = `0fd60888fa5456692e37096091f275a9`;
var formEl = document.querySelector(`#searchForm`);
var searchBtn = document.getElementById(`searchBtn`);
var searchCity = document.getElementById(`searchText`);
var currentWeatherEl = document.getElementById(`currentWeather`);
var weatherCards = document.getElementById(`weatherCards`);
// empty array to save search terms for localstorage
const searches = [];
// Grab search term from user form
searchBtn.addEventListener('click', getWeather);

function getWeather(event) {
    event.preventDefault();
    // Store searched city name in variable
    var city = searchCity.value;
    searches.push(city)
    // Clear search form
    searchCity.value = "";
    searchWeather(city);

}

// Fetch search term to OpenWeather API
function searchWeather(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            if (response.status === 200) {
                // Parse response
                response.json()
                    .then(function (weatherData) {
                        renderWeather(weatherData);
                    });
            } else {
                alert('Error: ' + response.statusText);
            }
        });
}
// Display weather conditions in the city for today
function renderWeather(weatherData) {
    console.log(weatherData);
    console.log(currentWeatherEl);
    var icon = weatherIcon(weatherData);
    let date = new Date((weatherData.dt) * 1000);
    console.log(date);
    currentWeatherEl.innerHTML = `
        <h2 class="p-2">${weatherData.name}  ${date.toLocaleDateString()}  <img src="${icon}" alt="weatherIcon"></h2>
        <h3 class="p-2">Temp: ${weatherData.main.temp}\xB0 F</h3>
        <h3 class="p-2">Wind: ${weatherData.wind.speed} MPH</h3
        ><h3 class="p-2">Humidity: ${weatherData.main.humidity} %</h3>`;
    currentWeatherEl.classList.remove(`d-none`);
    forecast(weatherData);
}
// Includes temp, wind, humidity, UV index
// Convert temperature from Kelvins to F
// Convert time (dt) from Uni, UTC to local time
// 

// Icon solution found at https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
function weatherIcon(weatherData) {
    var iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    return iconUrl
}
// UV index is color coded for favorable, moderate, severe
// Display 5 day forecast via 5 cards
function forecast(weatherData) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=imperial&exclude=minutely,hourly&appid=${key}`;
    fetch(forecastUrl)
        .then(function (response) {
            if (response.status === 200) {
                // Parse response
                response.json()
                    .then(function (forecastData) {
                        weatherCards.classList.remove(`d-none`);
                        currentWeatherEl.innerHTML += `
                        <h3 class="p-2">UV Index: ${forecastData.current.uvi}</h3>`;
                        let weeklyForecast = ``;
                        for (let i = 0; i < 5; i++) {
                            console.log(forecastData.daily[i]);
                            let weekDate = new Date((forecastData.daily[i].dt)*1000);
                            let weekIcon = weatherIcon(forecastData.daily[i]);
                            // daily[i].dt for date, .tmp.day for temp, .wind
                            weeklyForecast += `<div class="card row m-1 bg-purple" style="width: 11rem;">
                            <div class="card-body col bg-purple">
                              <h5 class="card-title fw-bold">${weekDate.toLocaleDateString()}</h5>
                              <img class="mb-2" src="${weekIcon}" alt="weatherIcon">
                              <h6 class="card-subtitle mb-2 fw-bold">Temp: ${forecastData.daily[i].temp.day}\xB0 F</h6>
                              <h6 class="card-subtitle mb-2 fw-bold">Wind: ${forecastData.daily[i].wind_speed}</h6>
                              <h6 class="card-subtitle mb-2 fw-bold">Humidity: ${forecastData.daily[i].humidity}</h6>
                            </div>
                        </div>`
                        }
                        weatherCards.innerHTML += weeklyForecast;
                    });
            } else {
                alert('Error: ' + response.statusText);
            }
        });
}
// Save user search term in a new input at end of the form