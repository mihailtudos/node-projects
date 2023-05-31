import chalk from 'chalk';
import yargs from 'yargs';
import {hideBin} from "yargs/helpers";
import { addNote, getNote } from './notes.js';


yargs(hideBin(process.argv))
    .command('add', 'List all commands', {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    }, (argv) => {
        console.log(argv);
        addNote(argv.title, argv.body)
    })
    .parse();