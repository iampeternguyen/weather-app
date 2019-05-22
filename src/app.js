const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Peter Nguyen',
	});
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About', name: 'Peter Nguyen' });
});

app.get('/help', (req, res) => {
	res.render('help', { title: 'Help', message: 'How can we help you today?' });
});
app.get('/weather', (req, res) => {
	res.send({ location: 'Philadelphia', weather: '35 degrees' });
});
app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
