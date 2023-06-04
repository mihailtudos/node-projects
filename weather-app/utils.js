import request from 'postman-request';
import 'dotenv/config'; 

const GEO_URL_BASE = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const GEO_API_KEY = process.env.GEO_API_KEY;

const BASE_URL = "http://api.weatherstack.com/current";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


export const geocode = (address, callback) => {
    const url = `${GEO_URL_BASE}${encodeURIComponent(address)}.json?limit=1&access_token=${GEO_API_KEY}`;
    request({
        url: url,
        json: true
    }, (err, res) => {
        if (err) {
            callback("Unable to work out the geolocation, please try again later.");
        } else if (res.body.features.length === 0) {
            callback(`No Geo location found for ${address}`)
        } else {
            const geoLocation = res.body.features[0];

            callback(undefined, {
                longitude: geoLocation.center[0],
                latitude: geoLocation.center[1],
                location: geoLocation['place_name']
            })
        }
    })
}

export const forecast = (lon, lat, callback) => {
    request({
        url: `${BASE_URL}?access_key=${WEATHER_API_KEY}&query=${lat},${lon}&units=m`,
        json: true
    }, (err, response) => {
        if(err) {
            callback("Unable to work out the weather, please try again later.");
        } else if(response.body.error) {
            callback("Unable to find location.");
        } else {
            const current = response.body.current;
            callback(undefined, current);
        }
    })
};