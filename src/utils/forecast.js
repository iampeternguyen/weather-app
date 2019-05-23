const request = require('request');
const SECRET_KEYS = require('./configvars') || undefined;

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/${SECRET_KEYS.DARKSKY}/${latitude},${longitude}`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			const summary = body.daily.summary;
			const currently = body.currently;
			callback(undefined, { summary, currently });
		}
	});
};

module.exports = forecast;
