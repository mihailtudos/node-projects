import request from 'postman-request';
import chalk from 'chalk';

const BASE_URL = "http://api.weatherstack.com/current";
const KEY = "981cc0b6833cb593c577af71e2648dec";
let location = "Chisinau";

const GEO_URL_BASE = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const GEO_KEY = 'pk.eyJ1IjoidHVkb3NtIiwiYSI6ImNsaWY2aWxwczBvYXozZXFqMHB5aWo4a2sifQ.UMdSe0eNCK-VvVNhwyHjwg';

request({
    url: `${BASE_URL}?access_key=${KEY}&query=${location}&units=m`,
    json: true
}, (err, response) => {
    if(err) {
        console.log(chalk.red("Unable to work out the weather, please try again later."));
        return;
    }

   if(response.body.error) {
       console.log(chalk.red("Unable to find location."));
       return;
   }

    const current = response.body.current;
    console.log(chalk.green.inverse(`\n Weather in ${location}:`));
    console.log(`\n
        It is currently ${current.temperature} degrees out and ${current.weather_descriptions[0]}. But if feels like ${current.feelslike} degrees.\n\n`);
});

request({
    url: `${GEO_URL_BASE}${location}.json?limit=1&access_token=${GEO_KEY}`,
    json: true
}, (err, res) => {
    if (err) {
        console.log(chalk.red("Unable to work out the geolocation, please try again later."));
        return;
    }

    if (res.body.features.length) {
        const geoLocation = res.body.features[0];
        console.log(chalk.green.inverse(`\n Geo location for ${location}:\n`));
        console.log(`
         \t longitude: \t${geoLocation.center[0]}
         \t latitude: \t${geoLocation.center[1]}
        `);
    } else {
        console.log(chalk.red.inverse(`
            No Geo location found for ${location}
        `));
    }
})