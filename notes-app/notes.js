import chalk from "chalk";
import fs from 'fs';

const FILE_PATH = './notes.json';

export const getNote = () => {
    return 'Your notes...';
}

export const addNote = function(title, body) {
    const notes = loadNotes();

    if (!isNoteInNotes(notes, title)) {
        console.log(chalk.green(`
        Adding new note:
            title: ${title}
            body: ${body}
        `));

        notes.push({ title, body });
        saveFile(notes);
        console.log(chalk.green('\nNote added.'));
    } else {
        console.log(chalk.red('This note already exists.'));
    }
}

export const removeNote = function(title) {
    const notes = loadNotes();

    console.log(chalk.green(`
    Removing note:
        title: ${title}
    `));

    const newNotesList = notes.filter(note => note.title !== title);
    saveFile(newNotesList);
    if (newNotesList.length < notes.length) {
        console.log(chalk.green.inverse('\nNote removed.'));
    } else {
        console.log(chalk.red.inverse('\nNote not removed.'));
    }
}

export const listNotes = function() {
    const notes = loadNotes();
    if(notes.length) {
        console.log(chalk.bold.green.inverse('\nYour notes:\n'));
        notes.forEach((note, index) => console.log(`\t ${index}. ${note.title}`));
    } else {
        console.log(chalk.bold.green.inverse('\nThere are no notes.\n'));
    }
}

function isNoteInNotes(notes, title) {
    return notes.some(note => note.title.toLowerCase() === title.toLowerCase());
}

function loadNotes() {
    if (makeFile(FILE_PATH)) {
        return JSON.parse(fs.readFileSync(FILE_PATH));
    } else {
        return [];
    }
}

function saveFile(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data));
}

function makeFile(path) {
    try {
        if (fs.existsSync(path)) {
            return true;
        } else {
            fs.writeFileSync(path, JSON.stringify([]));
            return true;
        }
    } catch(err) {
        console.error(err);
        return [];
    }
}
