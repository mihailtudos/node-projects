import chalk from 'chalk';
import { forecast, geocode } from './utils.js';
import yargs from 'yargs';
import {hideBin} from "yargs/helpers";

const yargsClient = yargs(hideBin(process.argv));
const location = yargsClient.argv.location;

if (location.length > 2) {
    geocode(location, (error, data) => {
        if (error) {
            console.log(chalk.red(error));
            return;
        }
    
        forecast(data.longitude, data.latitude, (error, response) => {
            if (error) {
                console.log(chalk.red(error));
                return;
            }
            
            console.log(chalk.green.inverse(`\n Weather in ${data.location}:`));
            console.log(`\nIt is currently ${response.temperature} degrees out and ${response.weather_descriptions[0]}. But if feels like ${response.feelslike} degrees.\n\n`);
            
        })
    })
} else {
    console.log(chalk.red("Please provide a location."));
}

