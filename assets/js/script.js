var searchBtn = document.getElementById('searchBtn');
var cityH = document.getElementById('city');
var tempP = document.getElementById('temp');
var humP = document.getElementById('hum');
var windP = document.getElementById('wind');
var uvP = document.getElementById('uv');
var savedSearch = document.getElementById('saved-search');
var searches = [];

// localstorage
var localArr = JSON.parse(localStorage.getItem("cities")) || [];
oneDayCall(localArr[localArr.length - 1]);
document.getElementById('searchBtn').addEventListener('click', getSearchVal);

// This function allows the user to enter a city of their choice and click the search button to retrieve forecast APIs
function getSearchVal(event) {
    event.preventDefault();
    var citySearch = document.getElementById('city-search').value;
    oneDayCall(citySearch);
    localArr.push(citySearch)
    localStorage.setItem("cities", JSON.stringify(localArr));

}

// This function returns a current forecast API
function oneDayCall(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=032af0ff95709be09e01f89ce7ab1a46&units=imperial', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            fiveDayCall(city);
            getUVIndex(data.coord.lat, data.coord.lon);

            cityH.textContent = `City: ${data.name}`
            tempP.textContent = `Temperature: ${data.main.temp}`;
            humP.textContent = `Humidity: ${data.main.humidity}`;
            windP.textContent = `Wind Speed: ${data.wind.speed}`;

            searches.push(city);
            renderSearch();
        })
        .catch(function (err) {
            console.error(err);
        });

}

function fiveDayCall(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=032af0ff95709be09e01f89ce7ab1a46&units=imperial', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Five Day ', data)
            $("#five-day").html("");

            for (var i = 0; i < 40; i += 8) {
                console.log(data.list[i]);
                var elements = $(`
                <div class="col forecast mt-4">
                    <p>Date: ${data.list[i].dt_txt}</p>
                    <p>Temperature: ${data.list[i].main.temp}</p>
                    <p>Humidity: ${data.list[i].main.humidity}</p>
                    <p>Wind Speed: ${data.list[i].wind.speed}</p>
                   
                </div>
            `);

                $("#five-day").append(elements);


            }

        })

        .catch(function (err) {
            console.error(err);
        });
}

function getUVIndex(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=032af0ff95709be09e01f89ce7ab1a46`, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('RESPONSE ------------------------ ', data)
            uvP.textContent = `UV Index: ${data.value}`;
        })
        .catch(function (err) {
            console.error(err);
        });
}

// The following function renders previous searched items 
function renderSearch() {
    // Clear search 
    savedSearch.innerHTML = "";
    // Render a new li for each search
    for (var i = 0; i < localArr.length; i++) {
        var search = localArr[i];


        var val = $(`
        <button class="row w-100">${search}</button>
        `)

        val.on("click", function () {

            oneDayCall($(this).text())
        })

        $("#saved-search").append(val);

    }
}