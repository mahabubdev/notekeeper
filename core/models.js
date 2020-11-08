const mongo = require('mongoose')

/**-------------------------------------*
 * Note Model
 * @Model 
 * @Schema
 *-------------------------------------*/
const noteSchema = new mongo.Schema({
    text: {
        type: String,
        minlength: 5,
        required: true
    }
}, { timestamps: true })
const Note = mongo.model('Note', noteSchema)


// export all models
module.exports = {
    Note
}
