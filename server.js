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
}



app.get('/api/notes', (req, res) => {
    res.json(notesData);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4()
    // console.log(req.body.id)
    console.log(req.body);

    const notes = createNotes(req.body, notesData);
    res.json(notes);
})

app.listen(PORT, () => {
    console.log(`api server now on ${PORT}!`);
})

