const fs = require('fs');
const express = require('express');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();
const notesData = require('./db/db.json');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

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
            './db/db.json'
            ),
        JSON.stringify(notesData, null, 2)
    )
    return data;
}
// filter
function deleteNotes (id, notesData) {
    let newData = notesData.filter(item => {
        return item.id !== id})
    console.log(newData)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(newData, null, 2)
    )
    return newData;
}
// find and splice
function deleteNote (id, notesData) {
    const item = notesData.findIndex(index => {index.id == id})
    notesData.splice(item, 1);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesData, null, 2)
    )
    return notesData
}

app.get('/api/notes', (req, res) => {
    return res.json(notesData);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4()
    const notes = createNotes(req.body, notesData);
    res.json(notes);
})

app.delete('/api/notes/:id', (req, res) => {
    let data = deleteNote(req.params.id, notesData);
    res.json(data)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`api server now on ${PORT}!`);
})
