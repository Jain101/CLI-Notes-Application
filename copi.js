
// // create a server in node js
// // Path: server.js
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.end('Hello from the server!');
// }
// );
// server.listen(8000, 'hey', () => {
//     console.log('Listening to requests on port 8000');
// });

// //create a firebase code to fetch data from firebase
// // Path: firebase.js
// const firebase = require('firebase');
// const firebaseConfig = {
//     apiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
//     authDomain: "fir-1-1b1a8.firebaseapp.com",
//     databaseURL: "https://fir-1-1b1a8.firebaseio.com",
//     projectId: "fir-1-1b1a8",
//     storageBucket: "fir-1-1b1a8.appspot.com",
//     messagingSenderId: "100921873929",
//     appId: "1:100921873929:web:2e1b8b0b0b0b0b0b0b0b0b",
//     measurementId: "G-2ZQZQZQZQZQ"
// };
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// db.collection('users').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data())
//     })
// }).catch(err => {
//     console.log(err)
// })

console.log(process.argv)
//how to create a cli for note taking app in nodejs
// Path: app.js
const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');
yargs.version('1.1.0');
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title', demandOption: true, type: 'string'
        },
        body: {
            describe: 'Note body', demandOption: true, type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title', demandOption: true, type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title', demandOption: true, type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})
yargs.parse()
// Path: notes.js
const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
    return 'Your notes...'
}
const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title)
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title, body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}
const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}
module.exports = {
    getNotes: getNotes, addNotes: addNotes, removeNotes: removeNotes, listNotes: listNotes, readNotes: readNotes
}
// Path: notes.json
[{ "title": "title", "body": "body" }, { "title": "title", "body": "body" }]
// Path: package.json
{
    "name": "notes-app",
        "version": "1.0.0",
            "description": "",
                "main": "app.js",
                    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
        "author": "",
            "license": "ISC",
                "dependencies": {
        "chalk": "^4.0.0",
            "yargs": "^15.3.1"
    }
}
// Path: package-lock.json