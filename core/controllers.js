const models = require('./models')


// create new note
const createNote = async (req, res) => {
    // parsed
    const { text } = req.body 

    // create
    const newNote = new models.Note({ text })
    await newNote.save()
    .then(() => {
        // ok
        res.status(201).json({
            msg: 'New note added!',
            note: newNote
        })
    })
    .catch(err => {
        // error
        res.status(400).json({
            msg: err.message,
            errors: err
        })
    })
}

// edit a note
const editNote = async (req, res) => {
    // parsed
    const note = req.params.id 
    const { text } = req.body

    // check
    const findReqNote = await models.Note.findOne({ _id: note })

    if ( findReqNote ) {
        // ok
        await models.Note.findByIdAndUpdate(note, {
            text
        })
        .then(() => {
            res.status(202).json({
                msg: 'Note updated!'
            })
        })
        .catch(err => {
            console.log(err.message)

            res.status(400).json({
                msg: err.message,
                errors: err
            })
        })
    }
    else {
        // not found 404
        res.status(404).json({
            msg: 'Sorry! This note doesn\'t exist anymore or invaild!'
        })
    }
}


// delete a note
const deleteNote = async (req, res) => {
    // parsed
    const note = req.params.id

    // find check
    const findReqNote = await models.Note.findOne({ _id: note })

    if ( findReqNote ) {
        // ok
        await models.Note.findByIdAndDelete(note)
        .then(() => {
            res.status(200).json({
                msg: 'Note deleted!'
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: err.message,
                errors: err
            })
        })
    } else {
        // not found 404
        res.status(404).json({
            msg: 'Sorry! This note doesn\'t exist anymore or invaild!'
        })
    }
}


// read all notes
const allNotes = async (req, res) => {
    // get all notes
    const notes = await models.Note.find().sort({createdAt: -1})

    // send
    res.status(200).json({ notes })
}

module.exports = {
    createNote,
    editNote,
    allNotes,
    deleteNote
}