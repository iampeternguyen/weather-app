const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

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
	res.render('help', { title: 'Help', message: 'How can we help you today?', name: 'Peter Nguyen' });
});
app.get('/weather', (req, res) => {
	res.send({ location: 'Philadelphia', weather: '35 degrees' });
});
app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
