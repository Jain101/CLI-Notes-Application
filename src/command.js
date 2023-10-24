import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createNote, deleteNote, deleteAllNotes, readAllNotes, searchNotes } from './notes_util.js';

const listNotes = (notes) => {
    notes.forEach(({ id, tags, content }) => {
        console.log('ID: ', id)
        console.log(`Tags: ${tags}`)
        console.log(`Content: ${content}`)
        console.log('-------------------')
    })
}
yargs(hideBin(process.argv))
    .command('add <note>', 'Add a new note', (yargs) => {
        return yargs.positional('note', {
            describe: 'Note body',
            type: 'string',
        })
    }, async (argv) => {
        const tags = argv.tags ? argv.tags.split(',') : []
        const note = await createNote(argv.note, tags)
        console.log('Note added successfully!', note)
    })
    .option('tags', {
        alias: 't',
        type: 'string',
        description: 'note tags'
    })
    .command('all', 'get all notes', () => { }, async (argv) => {
        const notes = await readAllNotes()
        listNotes(notes)
    })
    .command('find <filter>', 'get matching notes', yargs => {
        return yargs.positional('filter', {
            describe: 'The search term to filter notes by, will be applied to note.content',
            type: 'string'
        })
    }, async (argv) => {
        const filteredNotes = await searchNotes(argv.filter)
        console.log(`Found ${filteredNotes.length} matching notes!!!`)
        console.log(filteredNotes)
        console.log('-------------------')
    })
    .command('remove <id>', 'remove a note by id', yargs => {
        return yargs.positional('id', {
            type: 'number',
            description: 'The id of the note you want to remove'
        })
    }, async (argv) => {
        const id = await deleteNote(argv.id)
        if (id) {
            console.log(`Note with id ${id} removed successfully!`)
        }
        else {
            console.log(`Note with id ${argv.id} not found!`)
        }
    })
    .command('web [port]', 'launch website to see notes', yargs => {
        return yargs
            .positional('port', {
                describe: 'port to bind on',
                default: 5000,
                type: 'number'
            })
    }, async (argv) => {

    })
    .command('clean', 'remove all notes', (yargs) => {
        return yargs.positional('note', {
            describe: 'Note body',
            type: 'string',
        })
    }, async (argv) => {
        await deleteAllNotes()
        console.log('All notes removed successfully!')
    })
    .demandCommand(1)
    .parse()

