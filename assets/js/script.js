

fetch('https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=032af0ff95709be09e01f89ce7ab1a46', {
	headers: {
		'Accept': 'application/json'
	}
})
.then(response => {
	console.log(response);
	return response.json();
}).then((data) => {
	console.log('RESPONSE ', data)
})
.catch(err => {
	console.error(err);
});