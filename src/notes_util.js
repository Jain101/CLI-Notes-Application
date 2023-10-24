import { readDB, writeDB, updateDB } from './db_util.js'

export const readAllNotes = async () => {
    const db = await readDB()
    return db.notes
}

export const readNote = async (id) => {
    const db = await readDB()
    const note = db.notes.find(note => note.id === id)
    return note
}

export const createNote = async (note, tags) => {
    const data = {
        tags,
        content: note,
        id: Date.now()
    }
    await updateDB(data)
    return data
}

export const searchNotes = async (filter) => {
    const notes = await readAllNotes()
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
}

export const deleteNote = async (id) => {
    const notes = await readAllNotes()
    const matchedNote = notes.find(note => note.id === id)
    if (matchedNote) {
        const newNotes = notes.filter(note => note.id !== id)
        await writeDB({ notes: newNotes })
        return id
    }
    return null
}

export const deleteAllNotes = async () => {
    await writeDB({ notes: [] })
}
