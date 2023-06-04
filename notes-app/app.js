import yargs from 'yargs';
import {hideBin} from "yargs/helpers";
import { addNote, listNotes, readNote, removeNote } from './notes.js';

const yargsClient = yargs(hideBin(process.argv))

yargsClient.command('add', 'List all commands', {
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
        addNote(argv.title, argv.body)
});

yargsClient.command('remove', 'Remove note from the notes', {
    title: {
        describe: "Note title",
        demandOption: true,
        type: 'string'
    }
}, (argv) => {
    removeNote(argv.title)
});

yargsClient.command('list', 'List all your notes.', {}, () => {
    listNotes()
});

yargsClient.command('read', 'Reads and displays note by title', {
    title: {
        describe: "Note title",
        demandOption: true,
        type: 'string'
    }
}, (argv) => {
    readNote(argv.title)
});

yargsClient.parse()