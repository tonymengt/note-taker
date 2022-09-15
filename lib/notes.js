const fs = require('fs');
const path = require('path');


function createNotes (input, notesData) {
    const {title, text, id} = input;
    const data = {
        title,
        text,
        id
    }
    notesData.push(data);
    fs.writeFileSync(
        path.join(__dirname, 
            '../db/db.json'
            ),
        JSON.stringify(notesData, null, 2)
    )
    return data;
}

// find and splice
function deleteNote (id, notesData) {
    console.log(typeof id)
    console.log(typeof notesData.id)
    const item = notesData.findIndex(index => {index.id == id})
    console.log(typeof item)
    notesData.splice(item, 1);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesData, null, 2)
    )
    return notesData
}

module.exports = {
    createNotes,
    deleteNote
}