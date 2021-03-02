// var searchBtn = document.getElementById('searchBtn');

// function getSearchVal() {
//     var citySearch = document.getElementById('city-search').value;
//     console.log('city search', citySearch)
//     oneDayCall(citySearch);
//     console.log("getSearchVal is working!");
// }


function oneDayCall(city) {
    console.log("oneDayCall is working!");
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=032af0ff95709be09e01f89ce7ab1a46' 
    //     headers: {
    //         'Accept': 'application/json'
    //     }
    )
    .then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data)  {
        console.log('RESPONSE ', data)
    })
    .catch(function (err)  {
        console.error(err);
    });
}
oneDayCall("Denver");
// searchBtn.onclick = getSearchVal;