const request = require('request');
const MAPBOXAPIKEY = process.env.MAPBOX || require('./configvars').MAPBOX || undefined;

if (!MAPBOXAPIKEY) {
	return console.log('API key for mapbox not found!');
}
const geocode = (location, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		location
	)}.json?access_token=${MAPBOXAPIKEY}&limit=1`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Cannot connect to location services!', undefined);
		} else if (body.features.length == 0) {
			callback('Unable to find location. Please search again.', undefined);
		} else {
			const location = body.features[0].place_name;
			const [longitude, latitude] = body.features[0].center;
			callback(undefined, {
				location,
				latitude,
				longitude,
			});
		}
	});
};

module.exports = geocode;
