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
    console.log(searchCity)
    searchWeather(searchCity);
}

// Fetch search term to OpenWeather API
function searchWeather(city) {
    console.log(city);
}
// Parse response
// Display weather conditions in the city for today
// Includes temp, wind, humidity, UV index
// UV index is color coded for favorable, moderate, severe
// Display 5 day forecast via 5 cards
// Save user search term in a new input at end of the form