const router = require('express').Router();
const {createNotes, deleteNote} = require('../../lib/notes');
const notesData = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    return res.json(notesData);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4()
    const notes = createNotes(req.body, notesData);
    res.json(notes);
})

router.delete('/notes/:id', (req, res) => {
    let data = deleteNote(req.params.id, notesData);
    console.log(req.params.id)
    res.json(data)
})

module.exports = router