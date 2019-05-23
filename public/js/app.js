console.log('JS file loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherInfo = document.querySelector('#weather-info');
const locationInfo = document.querySelector('#location');

weatherForm.addEventListener('submit', event => {
	event.preventDefault();

	const location = search.value;
	locationInfo.textContent = '';
	weatherInfo.textContent = 'Loading';

	fetch(`http://localhost:3000/weather?address=${location}`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			if (data.error) {
				return (weatherInfo.textContent = data.error);
			}
			locationInfo.textContent = data.location;
			weatherInfo.textContent = data.weather.summary;
		});
});
