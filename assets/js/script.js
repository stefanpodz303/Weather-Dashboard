var searchBtn = document.getElementById('searchBtn');
var cityH = document.getElementById('city');
var tempP = document.getElementById('temp');
var humP = document.getElementById('hum');
var windP = document.getElementById('wind');
var uvP = document.getElementById('uv');

// This function allows the user to enter a city of their choice and click the search button to retrieve forecast APIs
function getSearchVal(event) {
    event.preventDefault();
    var citySearch = document.getElementById('city-search').value;
    console.log('city search', citySearch)
    oneDayCall(citySearch);
    console.log("getSearchVal is working!");
}

// This function returns a current forecast API
function oneDayCall(city) {
    console.log("oneDayCall is working!");
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=032af0ff95709be09e01f89ce7ab1a46&units=imperial', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            console.log('City -----', data)
            fiveDayCall(city);
            getUVIndex(data.coord.lat, data.coord.lon);

            cityH.textContent = `City: ${data.name}`
            tempP.textContent = `Temperature: ${data.main.temp}`;
            humP.textContent = `Humidity: ${data.main.humidity}`;
            windP.textContent = `Wind Speed: ${data.wind.speed}`;


        })
        .catch(function (err) {
            console.error(err);
        });

}

// localstorage
var localArr = JSON.parse(localStorage.getItem("cities")) || [];

function fiveDayCall(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=032af0ff95709be09e01f89ce7ab1a46', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            console.log('RESPONSE ', data)
        })
        .catch(function (err) {
            console.error(err);
        });
    console.log("five day forecast");
}

function getUVIndex(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=032af0ff95709be09e01f89ce7ab1a46`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            console.log('RESPONSE ------------------------ ', data)
        })
        .catch(function (err) {
            console.error(err);
        });
    console.log("uv index");
}

document.getElementById('searchBtn').addEventListener('click', getSearchVal);
