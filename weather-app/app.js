const request = require('postman-request');

const BASE_URL = "http://api.weatherstack.com/current";
const KEY = "981cc0b6833cb593c577af71e2648dec";

request({
    url: `${BASE_URL}?access_key=${KEY}&query=Chisinau&units=m`,
    json: true
}, (err, response) => {
    const current = response.body.current;
    console.log(`\n\nIt is currently ${current.temperature} degrees out and ${current.weather_descriptions[0]}. But if feels like ${current.feelslike} degrees.`);
});