import chalk from "chalk";

export const getNote = function () {
    return 'Your notes...';
}

export const addNote = function(title, body) {
    console.log(chalk.green(`
    Adding new note:
        title: ${title}
        body: ${body}
    `))
}

