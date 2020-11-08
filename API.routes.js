const router = require('express').Router()
const controllers = require('./core/controllers')


// get all notes
router.get('/all', controllers.allNotes)

// create new note
router.post('/create', controllers.createNote)

// edit a note
router.put('/edit/:id', controllers.editNote)


// delete a note
router.delete('/del/:id', controllers.deleteNote)

router.get('/', (req, res) => {
    res.json({
        message: 'Server is working!'
    })
})


module.exports = router