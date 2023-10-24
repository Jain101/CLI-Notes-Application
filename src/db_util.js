import fs from 'node:fs/promises'

const DB_PATH = new URL('../db.json', import.meta.url)

/**
 * @readDB - read a database file
 * @writeDB - write to a database file
 * @updateDB - update a database file(with notes)
 * @deleteDB - delete a database file
 **/
export const readDB = async () => {
    try {
        const db = await fs.readFile(DB_PATH, 'utf8')
        return JSON.parse(db)
    } catch (error) {
        console.log(error)
    }
}

export const writeDB = async (db) => {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
        return db
    }
    catch (error) {
        console.log(error)
    }
}

export const updateDB = async (data) => {
    const db = await readDB()
    db.notes.push(data)
    await writeDB(db)
    return data
}
