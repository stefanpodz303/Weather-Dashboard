var searchBtn = document.getElementById('searchBtn');

function getSearchVal(event) {
    event.preventDefault();
    var citySearch = document.getElementById('city-search').value;
    console.log('city search', citySearch)
    oneDayCall(citySearch);
    console.log("getSearchVal is working!");
}


function oneDayCall(city) {
    console.log("oneDayCall is working!");
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=032af0ff95709be09e01f89ce7ab1a46', {
        headers: {
            'Accept': 'application/json'
        }
    })
    
    .then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data)  {
        console.log('RESPONSE ', data)
        console.log('RESPONSE ', data.coord)
        fiveDayCall(city);
        getUVIndex(data.coord.lat, data.coord.lon);
    })
    .catch(function (err)  {
        console.error(err);
    });
    
}

function fiveDayCall(city) {
    console.log("five day forecast");
}
function getUVIndex(lat, lon) {
    console.log("uv index");
}

document.getElementById('searchBtn').addEventListener('click', getSearchVal);
// searchBtn.addEventListener