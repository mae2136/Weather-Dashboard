// OpenWeather API key
var key = `0fd60888fa5456692e37096091f275a9`;
var formEl = document.querySelector(`#searchForm`);
var searchBtn = document.getElementById(`searchBtn`);
var searchCity = document.getElementById(`searchText`)
// Grab search term from user form
searchBtn.addEventListener('click', getWeather);

function getWeather(event) {
    event.preventDefault();
    // Store searched city name in variable
    var city = searchCity.value;
    // Clear search form
    searchCity.value = "";
    searchWeather(city);

}

// Fetch search term to OpenWeather API
function searchWeather(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
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
}
// Includes temp, wind, humidity, UV index
// UV index is color coded for favorable, moderate, severe
// Display 5 day forecast via 5 cards
// Save user search term in a new input at end of the form