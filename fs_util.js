import fs from 'node:fs/promises'

const readPjson = async () => {
    try {
        const pjson_path = new URL('./package.json', import.meta.url)
        const pjson = await fs.readFile(pjson_path, 'utf8')
        console.log(JSON.parse(pjson))
    } catch (error) {
        console.log(error)
    }
}
const writeFile = async () => {
    try {
        const newfilepath = new URL('./newfile.txt', import.meta.url)
        await fs.writeFile(newfilepath, "Hey Zain, I am a file created by Node.js")
    } catch (error) {
        console.log(error)
    }
}
writeFile()
//readPjson()


// // create a file system db for node js notes cli app
// export const createDB = async (dbPath) => {
//   try {
//     await fs.writeFile(dbPath, JSON.stringify({ notes: [] }))
//   } catch (error) {
//     console.log(error)
//   }
// }

// // read the db file
// export const readDB = async (dbPath) => {
//     try {
//         const db = await fs.readFile(dbPath, 'utf8')
//         return JSON.parse(db)
//     } catch (error) {
//         console.log(error)
//     }
// }

// // write to the db file
// export const writeDB = async (dbPath, data) => {
//     try {
//         await fs.writeFile(dbPath, JSON.stringify(data))
//     } catch (error) {
//         console.log(error)
//     }
// }

// // delete the db file
// export const deleteDB = async (dbPath) => {
//     try {
//         await fs.unlink(dbPath)
//     } catch (error) {
//         console.log(error)
//     }
// }

