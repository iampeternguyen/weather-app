const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

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
	if (!req.query.address) {
		return res.send({ error: 'You must specify a location' });
	}

	geocode(req.query.address, (error, { location, longitude, latitude } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, weather) => {
			if (error) {
				return res.send({ error });
			}
			res.send({ location, weather, search: req.query.address });
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Help article not found.',
		name: 'Peter Nguyen',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Page not found.',
		name: 'Peter Nguyen',
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
