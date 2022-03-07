// OpenWeather API key
var key = '0fd60888fa5456692e37096091f275a9';
var formEl = document.querySelector(`#searchForm`);
var searchBtn = document.getElementById(`searchBtn`);

console.log(formEl);

// Grab search term from user form
searchBtn.addEventListener('click', getWeather);

function getWeather(event) {
    event.preventDefault();
    console.log("Searched");
    var searchCity = document.getElementById(`searchText`).value;
    searchWeather(searchCity);
}

// Fetch search term to OpenWeather API
function searchWeather(city) {
    console.log(city);
    // Grab lat and longitude first?
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=` + city + `&limit=1&appid=` + key;
    fetch(geoUrl)
        .then(function (response) {
            if (response.status === 200) {
                // Parse response
                return response.json().then(renderWeather(response));;
            } else {
                alert('Error: ' + response.statusText);
            }
        });
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=` + key;
    console.log(geoUrl);
    fetch(apiUrl)
        .then(function (response) {
            if (response.status === 200) {
                // Parse response
                return response.json().then(renderWeather(response));;
            } else {
                alert('Error: ' + response.statusText);
            }
        })
}
// Display weather conditions in the city for today
function renderWeather(response) {
    console.log(response);
}
// Includes temp, wind, humidity, UV index
// UV index is color coded for favorable, moderate, severe
// Display 5 day forecast via 5 cards
// Save user search term in a new input at end of the form