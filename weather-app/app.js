import chalk from 'chalk';
import { forecast, geocode } from './utils.js';
import yargs from 'yargs';
import {hideBin} from "yargs/helpers";

const yargsClient = yargs(hideBin(process.argv));
const { location } = yargsClient.argv;

if (location.length > 2) {
    geocode(location, (error, { longitude, latitude, location } ) => {
        if (error) {
            console.log(chalk.red(error));
            return;
        }
    
        forecast(longitude, latitude, (error, { temperature, weather_descriptions, feelslike }) => {
            if (error) {
                console.log(chalk.red(error));
                return;
            }
            
            console.log(chalk.green.inverse(`\n Weather in ${location}:`));
            console.log(`\nIt is currently ${temperature} degrees out and ${weather_descriptions[0]}. But if feels like ${feelslike} degrees.\n\n`);
            
        })
    })
} else {
    console.log(chalk.red("Please provide a location."));
}

